import tmpl from './input.tmpl';
import './input.styles.css';
import Block from '../../services/block';
import validator, { IRule } from '../../services/validator';

interface IEvent extends Event {
  target: HTMLInputElement;
}

type TValueCallback = () => any;
type TVariant = 'default' | 'contained';

const variants: Record<TVariant, string> = {
  default: 'LWInput__input--default',
  contained: 'LWInput__input--contained'
};

interface IInput {
  type: string;
  name: string;
  label: string;
  required: boolean;
  variant?: TVariant;
  value?: any | TValueCallback;
  placeholder?: string;
  className?: string;
  validateRule?: IRule;
  errorMessage?: string;
  events?: {
    focus?: (e: IEvent) => void;
    blur?: (e: IEvent) => void;
    onChange?: (e: IEvent) => void;
  };
}

export class LWInput extends Block {
  public value = '';

  constructor(props: IInput) {
    super('div', props);
    this.value = props.value;
    this.setProps({
      inputClasses: this.getInputClasses(),
      events: {
        ...props.events,
        input: this.onChange,
        focusin: this.validate,
        focusout: this.validate
      }
    });
  }

  render() {
    return tmpl;
  }

  public validate = () => {
    if (!this.props.validateRule) {
      return true;
    }

    const validatorData = validator.validate(this.props.validateRule, this.value);

    if (validatorData.valid) {
      this.setProps({ errorMessage: '', value: this.value });
      this.getElement().querySelector('input')?.classList.remove('input--error');
      return true;
    }

    this.setProps({ errorMessage: validatorData.msg, value: this.value });
    this.getElement().querySelector('input')?.classList.add('input--error');
    return false;
  };

  private onChange = (event: IEvent) => {
    this.value = event.target.value;

    if (this.props.events?.onChange) {
      this.props.events.onChange(event);
    }
  };

  private getInputClasses(): string {
    const variant: TVariant = this.props.variant || 'default';

    return `${variants[variant]}`;
  }
}
