import Block from '../../../../services/block';
import template from './chat.tmpl';
import './chat.item.css';
import formatDate from '../../../../utils/formatDate';

export interface IChatItemProps {
  name: string;
  msg: string;
  date: string;
}

function cutMessage(msg: string): string {
  return msg.slice(0, 55) + (msg.length > 50 ? '...' : '');
}

class ChatItem extends Block {
  constructor(props: IChatItemProps) {
    super('div', {
      ...props,
      date: formatDate(props.date),
      msg: cutMessage(props.msg)
    });
  }

  render() {
    return template;
  }
}

export default ChatItem;
