import Block from '../../services/block';
import template from './chat.tmpl';
import './chat.item.css';

export interface IChatItemProps {
  text: string;
}

class ChatItem extends Block {
  constructor(props: IChatItemProps) {
    super('div', props);
  }

  render() {
    return template;
  }
}

export default ChatItem;
