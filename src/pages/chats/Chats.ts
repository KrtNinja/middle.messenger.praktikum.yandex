import template from './chats.tmpl';
import Block from '../../services/block';

const data = {
  text: 'Главная страница с чатами'
};

class Chats extends Block {
  constructor() {
    super('div', data);
  }

  public render() {
    return template;
  }
}

export default Chats;
