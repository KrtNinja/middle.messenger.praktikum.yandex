import tmpl from './input.tmpl';
import './input.styles.css';
import Block from '../../services/block';

interface IInput {
  id: string;
  type: string;
  name: string;
  label: string;
  required: boolean;
  value?: any;
  className?: string;
  events?: { focus: (e: Event) => void; blur: (e: Event) => void };
}

class Input extends Block {
  constructor(props: IInput) {
    super('div', props);
  }

  render() {
    return this.setTemplate(tmpl, this.props);
  }
}

export default Input;
