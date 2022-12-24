import template from './login.tmpl';
import './login.styles.css';
import Block from '../../services/block';
import { LWInput } from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';

type TChangeableKeys = 'login' | 'password';

class Login extends Block {
  public login = 'ivanovivan';
  public password = 'admin1234';

  constructor() {
    super();

    this.setChildren({
      login: new LWInput({
        type: 'text',
        name: 'login',
        label: 'Логин',
        required: true,
        value: this.login,
        events: { onChange: event => this.onChangeValue('login', event.target.value) }
      }),
      password: new LWInput({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        required: true,
        value: this.password,
        events: { onChange: event => this.onChangeValue('password', event.target.value) }
      }),
      login_button: new LWButton({
        buttonText: 'Войти',
        onClick: () => this.submitData()
      }),
      open_signin_button: new LWButton({
        buttonText: 'Нет аккаунта?',
        variant: 'text',
        color: 'primary',
        size: 'small',
        onClick: () => (document.location.href = '/signin')
      })
    });
  }

  render() {
    return template;
  }

  private onChangeValue(prop: TChangeableKeys, value: string) {
    this[prop] = value;
  }

  public submitData() {
    const dto = {
      login: this.login,
      password: this.password
    };

    console.log(dto);
  }
}

export default Login;
