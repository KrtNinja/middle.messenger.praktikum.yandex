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

interface IMessage {
  name: string;
}

export class Message extends Block {
  public messageToSend = '';

  constructor(props: IMessage) {
    super('div', props);

    this.setChildren({
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
        name: 'search',
        value: '',
        variant: 'contained',
        placeholder: 'Сообщение',
        validateRule: {
          pattern: '',
          msg: '',
          required: true
        },
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

    globalStore.subscribe(({ chats, chatId }) => {
      const currentChat = chats.find((chat: ChatDto) => chat.id == chatId);
      const img = currentChat?.avatar ? `${apiConfig.RESOURCES}${currentChat.avatar}` : ava;

      if (chatId) {
        this.children.delete_chat?.show();
      } else {
        this.children.delete_chat?.hide();
      }

      this.setProps({
        srcImg: img,
        name: currentChat?.title || 'Выберите чат из списка'
      });
    });
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    this.submit();
  };

  private validateAll(): boolean {
    return Object.values(this.children).every(child => {
      if (child instanceof LWInput) {
        return child.validate();
      }

      return true;
    });
  }

  public submit() {
    const dto = {
      message: this.messageToSend
    };

    if (!this.validateAll()) {
      return;
    }

    console.log(dto);
    this.messageToSend = '';
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
