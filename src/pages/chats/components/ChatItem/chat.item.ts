import Block from '../../../../services/block';
import template from './chat.tmpl';
import './chat.item.css';
import formatDate from '../../../../utils/formatDate';
import ava from '../../../../../public/images/avatar.png';

export interface IChatItemProps {
  name: string;
  msg: string;
  date: string;
  srcImg?: string;
}

function cutMessage(msg: string): string {
  return msg.slice(0, 55) + (msg.length > 50 ? '...' : '');
}

class ChatItem extends Block {
  constructor(props: IChatItemProps) {
    super('div', {
      ...props,
      date: props.date ? formatDate(props.date) : '',
      msg: cutMessage(props.msg),
      srcImg: props.srcImg || ava
    });
  }

  render() {
    return template;
  }
}

export default ChatItem;
