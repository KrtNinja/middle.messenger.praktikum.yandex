import template from './chats.tmpl';
import Block from '../../services/block';
import { LWButton } from '../../components/Button/Button';
import { LWInput } from '../../components/Input/Input';
import ChatItem from './components/ChatItem/chat.item';
import { Message } from './components/message/Message';

const data = {
  chats: []
};

class Chats extends Block {
  constructor() {
    super('div', data);

    const chats = [
      new ChatItem({
        name: 'Кирилл',
        msg: 'Доброе утро. Завтра поедешь на работу?',
        date: '2022-12-26T10:36:23.291Z'
      }),
      new ChatItem({
        name: 'Петр Иванович',
        msg: 'Послдений раз я видел его около моста с зеленым текстом наверху',
        date: '2022-12-25T10:36:23.291Z'
      }),
      new ChatItem({
        name: 'Светлана',
        msg: 'Да, вчера был',
        date: '2022-12-20T10:36:23.291Z'
      })
    ];

    this.setProps({
      chats: chats.map(block => block.id)
    });

    this.setChildren({
      ...chats.reduce((acc: Record<string, Block>, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {}),
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
        events: { click: () => (document.location.href = './profile') }
      }),
      message: new Message({
        name: 'Вадми'
      })
    });
  }

  public render() {
    return template;
  }
}

export default Chats;
