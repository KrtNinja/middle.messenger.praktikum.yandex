import template from './signin.tmpl';
import './signin.styles.css';
import Block, { TProps } from '../../services/block';
import Input from '../../components/Input/Input';

class SignIn extends Block {
  constructor(public props: TProps = {}) {
    super('div', {
      email: new Input({
        id: 'email',
        type: 'text',
        name: 'email',
        label: 'Почта',
        required: true,
        value: 'pochta@yandex.ru'
      }),
      login: new Input({
        id: 'login',
        type: 'text',
        name: 'login',
        label: 'Логин',
        required: true,
        value: 'ivanovivan'
      }),
      first_name: new Input({
        id: 'first_name',
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        required: true,
        value: 'Иван'
      }),
      second_name: new Input({
        id: 'second_name',
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        required: true,
        value: 'Иванов'
      }),
      phone: new Input({
        id: 'phone',
        type: 'phone',
        name: 'phone',
        label: 'Телефон',
        required: true,
        value: '+79031112233'
      }),
      password: new Input({
        id: 'password',
        type: 'password',
        name: 'password',
        label: 'Пароль',
        required: true,
        value: 'admin1234'
      }),
      repeat_password: new Input({
        id: 'repeat_password',
        type: 'password',
        name: 'repeat_password',
        label: 'Повторите пароль',
        required: true,
        value: 'admin1234'
      }),
      ...props
    });
  }

  render() {
    return template;
  }
}

export default SignIn;
