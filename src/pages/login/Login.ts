import template from './login.tmpl';
import './login.styles.css';
import Block from '../../services/block';
import Input from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';

class Login extends Block {
  constructor() {
    super('div', {
      login: new Input({
        id: 'login',
        type: 'text',
        name: 'login',
        label: 'Логин',
        required: true,
        value: 'ivanovivan'
      }),
      password: new Input({
        id: 'password',
        type: 'password',
        name: 'password',
        label: 'Пароль',
        required: true,
        value: 'admin1234'
      }),
      login_button: new LWButton({
        buttonText: 'Войти'
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
}

export default Login;
