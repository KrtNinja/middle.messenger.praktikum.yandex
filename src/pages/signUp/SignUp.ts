import template from './signUp.tmpl';
import './signUp.styles.css';
import Block from '../../services/block';
import { LWInput } from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';
import validator from '../../services/validator';
import router from '../../router';
import authController from '../../core/controllers/auth/Auth.controller';

type TChangeableKeys =
  | 'email'
  | 'login'
  | 'first_name'
  | 'second_name'
  | 'phone'
  | 'password'
  | 'repeat_password';

class SignUp extends Block {
  public email = 'Test@ya.ru';
  public login = 'LWTest';
  public first_name = 'Тест';
  public second_name = 'Тестов';
  public phone = '+79990020101';
  public password = 'LWTest1234';
  public repeat_password = 'LWTest1234';

  constructor() {
    super('div', { events: { submit: (e: Event) => this.submitData(e) } });

    this.setChildren({
      email: new LWInput({
        type: 'text',
        name: 'email',
        label: 'Почта',
        required: true,
        value: this.email,
        validateRule: validator.rules.email,
        events: { onChange: event => this.onChangeValue('email', event.target.value) }
      }),
      login: new LWInput({
        type: 'text',
        name: 'login',
        label: 'Логин',
        required: true,
        value: this.login,
        validateRule: validator.rules.login,
        events: { onChange: event => this.onChangeValue('login', event.target.value) }
      }),
      first_name: new LWInput({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        required: true,
        value: this.first_name,
        validateRule: validator.rules.name,
        events: { onChange: event => this.onChangeValue('first_name', event.target.value) }
      }),
      second_name: new LWInput({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        required: true,
        value: this.second_name,
        validateRule: validator.rules.name,
        events: { onChange: event => this.onChangeValue('second_name', event.target.value) }
      }),
      phone: new LWInput({
        type: 'phone',
        name: 'phone',
        label: 'Телефон',
        required: true,
        value: this.phone,
        validateRule: validator.rules.phone,
        events: { onChange: event => this.onChangeValue('phone', event.target.value) }
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
      registration_button: new LWButton({
        buttonText: 'Зарегистрироваться'
      }),
      open_login_button: new LWButton({
        buttonText: 'Войти',
        variant: 'text',
        color: 'primary',
        size: 'small',
        events: { click: () => router.go('/login') }
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

  private getRepeatPasswordPattern = () => {
    return `^${this.password}$`;
  };

  private validateAll(): boolean {
    return Object.values(this.children).every(child => {
      if (child instanceof LWInput) {
        return child.validate();
      }

      return true;
    });
  }

  public async submitData(event: Event) {
    event.preventDefault();

    const dto = {
      email: this.email,
      login: this.login,
      first_name: this.first_name,
      second_name: this.second_name,
      phone: this.phone,
      password: this.password
    };

    if (!this.validateAll()) {
      return;
    }

    const data = await authController.signUp(dto);
    if (!data) {
      return;
    }

    router.go('/login');
  }
}

export default SignUp;
