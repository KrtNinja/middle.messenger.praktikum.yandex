import template from './chats.tmpl';
import Block from '../../services/block';
import { LWButton } from '../../components/Button/Button';
import { LWInput } from '../../components/Input/Input';
import ChatItem from '../../components/ChatItem/chat.item';

const data = {
  chats: []
};

class Chats extends Block {
  constructor() {
    super('div', data);

    const chats = [
      new ChatItem({
        text: 'ХАЙ ХАЙ ХАЙ'
      }),
      new ChatItem({
        text: 'ПОКА :) йоу'
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
        onClick: () => (document.location.href = './profile')
      })
    });
  }

  public render() {
    return template;
  }
}

export default Chats;
