import template from './login.tmpl';
import './login.styles.css';
import Block from '../../services/block';
import { LWInput } from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';
import validator from '../../services/validator';

type TChangeableKeys = 'login' | 'password';

class Login extends Block {
  public login = 'ivanovivan';
  public password = 'Admin1234';

  constructor() {
    super('div', { events: { submit: (e: Event) => this.submitData(e)} });

    this.setChildren({
      login: new LWInput({
        type: 'text',
        name: 'login',
        label: 'Логин',
        required: true,
        value: this.login,
        validateRule: validator.rules.login,
        events: { onChange: event => this.onChangeValue('login', event.target.value) }
      }),
      password: new LWInput({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        required: true,
        value: this.password,
        validateRule: validator.rules.password,
        events: { onChange: event => this.onChangeValue('password', event.target.value) }
      }),
      login_button: new LWButton({
        buttonText: 'Войти'
      }),
      open_signin_button: new LWButton({
        buttonText: 'Нет аккаунта?',
        variant: 'text',
        color: 'primary',
        size: 'small',
        events: { click: () => (document.location.href = '/signin')}
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

  private onChangeValue(prop: TChangeableKeys, value: string) {
    this[prop] = value;
  }

  public submitData(event: Event) {
    event.preventDefault();

    const dto = {
      login: this.login,
      password: this.password
    };

    if (!this.validateAll()) {
      return;
    }

    console.log(dto);
  }
}

export default Login;
