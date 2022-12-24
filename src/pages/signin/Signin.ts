import template from './signin.tmpl';
import './signin.styles.css';
import Block from '../../services/block';
import { LWInput } from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';

type TChangeableKeys =
  | 'email'
  | 'login'
  | 'first_name'
  | 'second_name'
  | 'phone'
  | 'password'
  | 'repeat_password';

class SignIn extends Block {
  // Временно заполнено тестовыми
  public email = 'pochta@yandex.ru';
  public login = 'ivanovivan';
  public first_name = 'Иван';
  public second_name = 'Иванов';
  public phone = '+79991234455';
  public password = 'admin1234';
  public repeat_password = 'admin1234';

  constructor() {
    super();

    this.setChildren({
      email: new LWInput({
        type: 'text',
        name: 'email',
        label: 'Почта',
        required: true,
        value: this.email,
        events: { onChange: event => this.onChangeValue('email', event.target.value) }
      }),
      login: new LWInput({
        type: 'text',
        name: 'login',
        label: 'Логин',
        required: true,
        value: this.login,
        events: { onChange: event => this.onChangeValue('login', event.target.value) }
      }),
      first_name: new LWInput({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        required: true,
        value: this.first_name,
        events: { onChange: event => this.onChangeValue('first_name', event.target.value) }
      }),
      second_name: new LWInput({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        required: true,
        value: this.second_name,
        events: { onChange: event => this.onChangeValue('second_name', event.target.value) }
      }),
      phone: new LWInput({
        type: 'phone',
        name: 'phone',
        label: 'Телефон',
        required: true,
        value: this.phone,
        events: { onChange: event => this.onChangeValue('phone', event.target.value) }
      }),
      password: new LWInput({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        required: true,
        value: this.password,
        events: { onChange: event => this.onChangeValue('password', event.target.value) }
      }),
      repeat_password: new LWInput({
        type: 'password',
        name: 'repeat_password',
        label: 'Повторите пароль',
        required: true,
        value: this.repeat_password,
        events: { onChange: event => this.onChangeValue('repeat_password', event.target.value) }
      }),
      registration_button: new LWButton({
        buttonText: 'Зарегистрироваться',
        onClick: () => this.submitData()
      }),
      open_login_button: new LWButton({
        buttonText: 'Войти',
        variant: 'text',
        color: 'primary',
        size: 'small',
        onClick: () => (document.location.href = '/login')
      })
    });
  }

  render() {
    return template;
  }

  dispatchMountComponent() {
    super.dispatchMountComponent();
  }

  private onChangeValue(prop: TChangeableKeys, value: string) {
    this[prop] = value;
  }

  public submitData() {
    const dto = {
      email: this.email,
      login: this.login,
      first_name: this.first_name,
      second_name: this.second_name,
      phone: this.phone,
      password: this.password,
      repeat_password: this.repeat_password
    };

    console.log(dto);
  }
}

export default SignIn;
