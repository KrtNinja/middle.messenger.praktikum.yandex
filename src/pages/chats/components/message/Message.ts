import template from './message.tmpl';
import './message.css';
import Block from '../../../../services/block';
import { LWButton } from '../../../../components/Button/Button';
import { LWInput } from '../../../../components/Input/Input';
import { globalStore } from '../../../../store/global.store';
import ChatDto from '../../../../core/dto/Chat.dto';
import { apiConfig } from '../../../../core/contants/Api';
import ava from '../../../../../public/images/avatar.png';
import chatsController from '../../../../core/controllers/chats/Chats.controller';
import { snackbar } from '../../../../services/snackbar';
import userController from '../../../../core/controllers/user/User.controller';
import UserDto from '../../../../core/dto/User.dto';
import messagesWs from '../../../../core/controllers/ws/Messages.ws';
import MessageDto from '../../../../core/dto/Message.dto';
import { SingleMessage } from './single-message/Single.message';

interface IMessage {
  name: string;
}

export class Message extends Block {
  public messageToSend = '';
  public user: UserDto | null = null;
  public chatId = null;
  public chats = [];
  public messages: MessageDto[] = [];

  constructor(props: IMessage) {
    super('div', { ...props, messages: [] });

    this.setChildren({
      add_user: new LWInput({
        label: '',
        type: 'text',
        name: 'add-user',
        value: '',
        variant: 'contained',
        placeholder: 'Логин для добавления',
        events: {
          keydown: (e: KeyboardEvent & { target: { value: string } }) => this.addUserToChat(e)
        }
      }),
      remove_user: new LWInput({
        label: '',
        type: 'text',
        name: 'remove-user',
        value: '',
        variant: 'contained',
        placeholder: 'Логин для удаления',
        events: {
          keydown: (e: KeyboardEvent & { target: { value: string } }) => this.removeUserFromChat(e)
        }
      }),
      delete_chat: new LWButton({
        buttonText: 'Удалить чат',
        variant: 'text',
        color: 'error',
        padding: 'none',
        events: { click: () => this.deleteChat() }
      }),
      message_input: new LWInput({
        label: '',
        type: 'text',
        name: 'message_input',
        value: '',
        variant: 'contained',
        placeholder: 'Сообщение',
        events: {
          onChange: e => (this.messageToSend = e.target.value),
          keydown: this.onKeyDown
        }
      }),
      send_button: new LWButton({
        buttonText: '→',
        variant: 'contained',
        padding: 'none',
        events: { click: () => this.submit() }
      })
    });
  }

  render() {
    return template;
  }

  dispatchMountComponent() {
    super.dispatchMountComponent();

    globalStore.subscribe(async ({ messages }) => {
      if (this.messages?.length === messages.length) {
        return;
      }

      this.messages = messages;
      this.completeMessages(messages);

      const chats = (await chatsController.getChats()) || [];
      globalStore.setState({ chats });

      document.getElementsByName('message_input')[0].focus();
    });

    globalStore.subscribe(async ({ chatId, user }) => {
      const userId = user?.id;
      if (userId == null || chatId === this.chatId) {
        return;
      }
      this.chatId = chatId;

      const token = (await chatsController.getToken(chatId))?.token;
      if (token) {
        messagesWs.connect({
          userId,
          chatId,
          token
        });
      }
    });

    globalStore.subscribe(async ({ chats, chatId }) => {
      const currentChat = chats.find((chat: ChatDto) => chat.id == chatId);

      const img = currentChat?.avatar ? `${apiConfig.RESOURCES}${currentChat.avatar}` : ava;

      if (chatId) {
        this.children.delete_chat?.show();
        this.children.add_user?.show();
        this.children.remove_user?.show();
      } else {
        this.children.delete_chat?.hide();
        this.children.add_user?.hide();
        this.children.remove_user?.hide();
      }

      this.setProps({
        srcImg: img,
        name: currentChat?.title || 'Выберите чат из списка'
      });
    });
  }

  private setMessageIds(messages: SingleMessage[]) {
    this.updatePropValue(
      'messages',
      messages.map(block => block.id)
    );
  }

  private createSingleMessage(messageInfo: MessageDto): Block {
    const block = new SingleMessage({
      content: messageInfo.content,
      mine: messageInfo.user_id === globalStore.state.user.id,
      time: messageInfo.time
    });
    block.id = messageInfo.id.toString();
    return block;
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    this.submit();
  };

  private addMessages(messages: SingleMessage[]) {
    this.setChildren({
      ...messages.reduce((acc: Record<string, SingleMessage>, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {})
    });
  }

  private completeMessages(messages: MessageDto[]) {
    const messageBlocks = messages.map(messageInfo => this.createSingleMessage(messageInfo));

    this.setMessageIds(messageBlocks);
    this.addMessages(messageBlocks);
  }

  private async searchUser(login: string): Promise<UserDto | null> {
    const users = (await userController.searchUser(login)) || [];

    if (users.length === 0) {
      snackbar.open(`Пользователь с логином ${login} не найден`);
      return null;
    }
    if (users.length > 1) {
      snackbar.open('Укажите логин полностью');
      return null;
    }

    return users[0];
  }

  public async addUserToChat(e: KeyboardEvent & { target: { value: string } }) {
    if (e.key === 'Enter') {
      const { chatId } = globalStore.state;
      const user = await this.searchUser(e.target.value);

      if (!user) {
        return;
      }

      const data = await chatsController.addUserToChat(chatId, user.id);

      if (!data) {
        return;
      }

      snackbar.open(`Пользователь ${e.target.value} добавлен в чат`, 'success');
      this.children.add_user.updatePropValue('value', ' ');
      this.children.add_user.updatePropValue('value', '');
    }
  }

  public async removeUserFromChat(e: KeyboardEvent & { target: { value: string } }) {
    if (e.key === 'Enter') {
      const { chatId } = globalStore.state;
      const user = await this.searchUser(e.target.value);

      if (!user) {
        return;
      }

      const data = await chatsController.deleteUserFromChat(chatId, user.id);

      if (!data) {
        return;
      }

      snackbar.open(`Пользователь ${e.target.value} удален из чата`, 'success');
      this.children.remove_user.updatePropValue('value', ' ');
      this.children.remove_user.updatePropValue('value', '');
    }
  }

  public submit() {
    if (this.messageToSend === '') {
      return;
    }

    messagesWs.sendMessage(this.messageToSend);
    this.messageToSend = '';
    this.children.message_input.updatePropValue('value', ' ');
    this.children.message_input.updatePropValue('value', '');
  }

  public async deleteChat() {
    const data = await chatsController.deleteChat(globalStore.state.chatId);

    if (!data) {
      return;
    }

    localStorage.removeItem('chatId');
    globalStore.setState({ chatId: null });

    const chats = (await chatsController.getChats()) || [];
    globalStore.setState({ chats });
  }
}
