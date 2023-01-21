import Block from '../../../../../services/block';
import template from './single.message.tmpl';
import './single.message.styles.css';
import formatDate from '../../../../../utils/formatDate';

interface SingleMessageProps {
  content: string;
  mine: boolean;
  time: string;
}

const orientations = {
  left: 'single-message--other',
  right: 'single-message--mine'
};

export class SingleMessage extends Block {
  constructor(props: SingleMessageProps) {
    super('div', {
      ...props,
      time: formatDate(props.time),
      orientation: props.mine ? orientations.right : orientations.left
    });
  }

  render() {
    return template;
  }
}
