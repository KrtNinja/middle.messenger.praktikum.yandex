import template from './login.tmpl';
import './login.styles.css';
import Block from '../../services/block';
import Input from '../../components/Input/Input';

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
      })
    });
  }

  render() {
    return template;
  }
}

export default Login;
