import template from './password.tmpl';
import './password.styles.css';
import Block from '../../services/block';
import { LWInput } from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';
import validator from '../../services/validator';
import router from '../../router';

type TChangeableKeys = 'prev_password' | 'password' | 'repeat_password';

class Password extends Block {
  public prev_password = 'QWERTY1234';
  public password = 'Admin1234';
  public repeat_password = 'Admin1234';

  constructor() {
    super('div', { events: { submit: (e: Event) => this.submitData(e) } });

    this.setChildren({
      prev_password: new LWInput({
        type: 'password',
        name: 'prev_password',
        label: 'Старый пароль',
        required: true,
        value: this.prev_password,
        // validateRule: ,
        events: { onChange: event => this.onChangeValue('prev_password', event.target.value) }
      }),
      password: new LWInput({
        type: 'password',
        name: 'password',
        label: 'Новый пароль',
        required: true,
        value: this.password,
        validateRule: validator.rules.password,
        events: { onChange: event => this.onChangeValue('password', event.target.value) }
      }),
      repeat_password: new LWInput({
        type: 'password',
        name: 'repeat_password',
        label: 'Повторите пароль',
        required: true,
        value: this.repeat_password,
        validateRule: {
          pattern: this.getRepeatPasswordPattern,
          required: true,
          msg: 'Обязательное поле. Должно совпадать с паролем'
        },
        events: { onChange: event => this.onChangeValue('repeat_password', event.target.value) }
      }),
      save_button: new LWButton({
        buttonText: 'Изменить'
      }),
      back_button: new LWButton({
        buttonText: 'Вернуться',
        variant: 'text',
        color: 'primary',
        size: 'small',
        events: { click: () => router.go('/profile') }
      })
    });
  }

  render() {
    return template;
  }

  private validateAll(): boolean {
    return Object.values(this.children).every(child => {
      if (child instanceof LWInput) {
        return child.validate();
      }

      return true;
    });
  }

  private getRepeatPasswordPattern = () => {
    return `^${this.password}$`;
  };

  private onChangeValue(prop: TChangeableKeys, value: string) {
    this[prop] = value;
  }

  public submitData(event: Event) {
    event.preventDefault();

    const dto = {
      prev_password: this.prev_password,
      password: this.password,
      repeat_password: this.repeat_password
    };

    if (!this.validateAll()) {
      return;
    }

    console.log(dto);
  }
}

export default Password;
