import template from './edit.profile.tmpl';
import './edit.profile.styles.css';
import Block from '../../services/block';
import { LWInput } from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';
import validator from '../../services/validator';

type TChangeableKeys =
  | 'email'
  | 'login'
  | 'first_name'
  | 'second_name'
  | 'nickname'
  | 'phone'

class EditProfile extends Block {
  public email = 'pochta@yandex.ru';
  public login = 'ivanovivan';
  public first_name = 'Иван';
  public second_name = 'Иванов';
  public nickname = 'BigVano';
  public phone = '+79991234455';

  constructor() {
    super('div', { events: { submit: (e: Event) => this.submitData(e)} });

    this.setChildren({
      email: new LWInput({
        type: 'text',
        name: 'email',
        label: 'Почта',
        value: this.email,
        validateRule: validator.rules.email,
        events: { onChange: event => this.onChangeValue('email', event.target.value) }
      }),
      login: new LWInput({
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: this.login,
        validateRule: validator.rules.login,
        events: { onChange: event => this.onChangeValue('login', event.target.value) }
      }),
      first_name: new LWInput({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: this.first_name,
        validateRule: validator.rules.name,
        events: { onChange: event => this.onChangeValue('first_name', event.target.value) }
      }),
      second_name: new LWInput({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: this.second_name,
        validateRule: validator.rules.name,
        events: { onChange: event => this.onChangeValue('second_name', event.target.value) }
      }),
      nickname: new LWInput({
        type: 'text',
        name: 'nickname',
        label: 'Никнейм',
        value: this.nickname,
        validateRule: {
          pattern: '',
          required: true,
          msg: 'Не может быть пустым'
        },
        events: { onChange: event => this.onChangeValue('nickname', event.target.value) }
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
      save_button: new LWButton({
        buttonText: 'Сохранить'
      }),
      back_button: new LWButton({
        buttonText: 'Вернуться',
        variant: 'text',
        color: 'primary',
        size: 'small',
        events: { click: () => (document.location.href = '/profile')}
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
      email: this.email,
      login: this.login,
      first_name: this.first_name,
      second_name: this.second_name,
      nickname: this.nickname,
      phone: this.phone
    };

    if (!this.validateAll()) {
      return;
    }

    console.log(dto);
  }
}

export default EditProfile;
