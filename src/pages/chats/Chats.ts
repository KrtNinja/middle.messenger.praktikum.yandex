import template from './chats.tmpl';
import Block from '../../services/block';
import { LWButton } from '../../components/Button/Button';
import { LWInput } from '../../components/Input/Input';

const data = {
  text: 'Главная страница с чатами'
};

class Chats extends Block {
  constructor() {
    super('div', data);

    this.setChildren({
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
