import tmpl from './input.tmpl';
import './input.styles.css';
import Block from '../../services/block';

interface IEvent extends Event {
  target: HTMLInputElement;
}

type TValueCallback = () => any;

interface IInput {
  type: string;
  name: string;
  label: string;
  required: boolean;
  value?: any | TValueCallback;
  className?: string;
  events?: {
    focus?: (e: IEvent) => void;
    blur?: (e: IEvent) => void;
    onChange?: (e: IEvent) => void;
  };
}

export class LWInput extends Block {
  public value = '';

  constructor(public props: IInput) {
    super('div', props);

    this.setProps({
      value: typeof this.props.value === 'string' ? this.props.value : this.props.value()
    });


  }

  render() {
    return tmpl;
  }

  dispatchMountComponent() {
    super.dispatchMountComponent();

    this.value = this.props.value;
    this.getElement().addEventListener('change', this.onChange);
  }

  private onChange = (event: IEvent) => {
    this.value = event.target.value;

    if (this.props.events?.onChange) {
      this.props.events.onChange(event);
    }
  };
}
