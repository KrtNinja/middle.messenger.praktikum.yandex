import template from './message.tmpl';
import './message.css';
import Block from '../../../../services/block';
import { LWButton } from '../../../../components/Button/Button';
import { LWInput } from '../../../../components/Input/Input';

interface IMessage {
  name: string;
}

export class Message extends Block {
  public messageToSend = '';

  constructor(props: IMessage) {
    super('div', props);

    this.setChildren({
      more_button: new LWButton({
        buttonText: '⋮',
        variant: 'contained',
        padding: 'none'
      }),
      message_input: new LWInput({
        label: '',
        type: 'text',
        name: 'search',
        value: '',
        variant: 'contained',
        placeholder: 'Сообщение',
        validateRule: {
          pattern: '',
          msg: '',
          required: true
        },
        events: {
          onChange: e => (this.messageToSend = e.target.value),
          keydown: this.onKeyDown
        }
      }),
      send_button: new LWButton({
        buttonText: '→',
        variant: 'contained',
        padding: 'none',
        onClick: () => this.submit()
      })
    });
  }

  render() {
    return template;
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    this.submit();
  };

  private validateAll(): boolean {
    return Object.values(this.children).every(child => {
      if (child instanceof LWInput) {
        return child.validate();
      }

      return true;
    });
  }

  public submit() {
    const dto = {
      message: this.messageToSend
    };

    if (!this.validateAll()) {
      return;
    }

    console.log(dto);
    this.messageToSend = '';
    this.children.message_input.updatePropValue('value', '');
  }
}
