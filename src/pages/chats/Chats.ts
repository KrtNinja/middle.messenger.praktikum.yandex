import template from './chats.tmpl';
import Block from '../../services/block';
import { LWButton } from '../../components/Button/Button';
import { LWInput } from '../../components/Input/Input';
import ChatItem from './components/ChatItem/chat.item';
import { Message } from './components/message/Message';
import router from '../../router';
import chatsController from '../../core/controllers/chats/Chats.controller';
import ChatDto from '../../core/dto/Chat.dto';
import { apiConfig } from '../../core/contants/Api';
import { globalStore } from '../../store/global.store';

const props = {
  chats: []
};

class Chats extends Block {
  constructor() {
    super('div', props);

    this.setChildren({
      add_new_chat: new LWInput({
        label: '',
        type: 'text',
        name: 'new-chat',
        value: '',
        variant: 'contained',
        placeholder: 'Имя нового чата',
        events: {
          keydown: (e: KeyboardEvent & { target: { value: string } }) => this.addNewChat(e)
        }
      }),
      input_search: new LWInput({
        label: '',
        type: 'text',
        name: 'search',
        value: '',
        variant: 'contained',
        placeholder: 'Поиск',
        required: false,
        events: { onChange: e => console.log(e.target.value) }
      }),
      profile_button: new LWButton({
        buttonText: 'Профиль',
        variant: 'text',
        color: 'primary',
        padding: 'small',
        size: 'large',
        events: { click: () => router.go('/profile') }
      }),
      message: new Message({
        name: ''
      })
    });
  }

  private createChatItem(chatInfo: ChatDto): Block {
    const img = chatInfo.avatar ? `${apiConfig.RESOURCES}${chatInfo.avatar}` : '';
    const block = new ChatItem({
      chatId: chatInfo.id.toString(),
      name: chatInfo.title,
      msg: chatInfo.last_message?.content || '',
      date: chatInfo.last_message?.time,
      srcImg: img,
      events: {
        click: () => {
          globalStore.setState({ chatId: chatInfo.id });
          localStorage.setItem('chatId', chatInfo.id.toString());
        }
      }
    });
    block.id = chatInfo.id.toString();
    return block;
  }

  private setChatIds(chats: ChatItem[]) {
    this.updatePropValue(
      'chats',
      chats.map(block => block.id)
    );
  }

  private addChats(chats: ChatItem[]) {
    this.setChildren({
      ...chats.reduce((acc: Record<string, ChatItem>, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {})
    });
  }

  private async completeChats(chats: ChatDto[]) {
    const chatBlocks = chats.map(chatInfo => this.createChatItem(chatInfo));

    this.setChatIds(chatBlocks);
    this.addChats(chatBlocks);
  }

  public async addNewChat(event: KeyboardEvent & { target: { value: string } }) {
    if (event.key === 'Enter') {
      const data = await chatsController.createChat(event.target?.value);

      if (!data) {
        return;
      }

      const chats = (await chatsController.getChats()) || [];
      globalStore.setState({ chats });

      await this.completeChats(chats);
      this.children.add_new_chat.updatePropValue('value', ' ');
      this.children.add_new_chat.updatePropValue('value', '');
    }
  }

  public render() {
    return template;
  }

  async dispatchMountComponent() {
    super.dispatchMountComponent();

    const chats = (await chatsController.getChats()) || [];
    globalStore.setState({ chats });

    if (localStorage.getItem('chatId')) {
      globalStore.setState({ chatId: localStorage.getItem('chatId') });
    }

    globalStore.subscribe(({chats}) => {
      this.completeChats(chats);
    });
  }
}

export default Chats;
