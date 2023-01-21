import Block from '../../../../services/block';
import template from './chat.tmpl';
import './chat.item.css';
import formatDate from '../../../../utils/formatDate';
import ava from '../../../../../public/images/avatar.png';
import { globalStore } from '../../../../store/global.store';

export interface IChatItemProps {
  chatId: string;
  name: string;
  msg: string;
  date: string;
  srcImg?: string;
  events?: {
    click?: (e: Event) => void;
  };
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
      srcImg: props.srcImg || ava,
      classes: ''
    });
  }

  render() {
    return template;
  }

  dispatchMountComponent() {
    super.dispatchMountComponent();

    globalStore.subscribe(({ chatId }) => {
      this.updatePropValue('classes', chatId == this.getProps().chatId ? 'chat-item--selected' : '');
    });
  }
}

export default ChatItem;
