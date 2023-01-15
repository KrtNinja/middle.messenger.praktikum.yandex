import template from './login.tmpl';
import './login.styles.css';
import Block from '../../services/block';
import { LWInput } from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';
import validator from '../../services/validator';
import router from '../../router';
import authController from '../../core/controllers/auth/Auth.controller';

type TChangeableKeys = 'login' | 'password';

class Login extends Block {
  public login = '';
  public password = '';

  constructor() {
    super('div', { events: { submit: (e: Event) => this.submitData(e) } });

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
        events: { click: () => router.go('/sign-up') }
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

  public async submitData(event: Event) {
    event.preventDefault();

    const dto = {
      login: this.login,
      password: this.password
    };

    if (!this.validateAll()) {
      return;
    }

    const data = await authController.signIn(dto);
    if (!data) {
      return;
    }

    router.go('/messenger');
  }
}

export default Login;
