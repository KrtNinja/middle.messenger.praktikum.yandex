import template from './edit.profile.tmpl';
import './edit.profile.styles.css';
import Block from '../../services/block';
import { LWInput } from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';
import validator from '../../services/validator';
import router from '../../router';
import userController from '../../core/controllers/user/User.controller';
import { globalStore } from '../../store/global.store';
import { snackbar } from '../../services/snackbar';

type TChangeableKeys = 'email' | 'login' | 'first_name' | 'second_name' | 'nickname' | 'phone';

class EditProfile extends Block {
  constructor() {
    super('div', { events: { submit: (e: Event) => this.submitData(e) } });

    this.setChildren({
      email: new LWInput({
        type: 'text',
        name: 'email',
        label: 'Почта',
        value: '',
        validateRule: validator.rules.email
      }),
      login: new LWInput({
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: '',
        validateRule: validator.rules.login
      }),
      first_name: new LWInput({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: '',
        validateRule: validator.rules.name
      }),
      second_name: new LWInput({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: '',
        validateRule: validator.rules.name
      }),
      nickname: new LWInput({
        type: 'text',
        name: 'nickname',
        label: 'Никнейм',
        value: '',
        validateRule: {
          pattern: '',
          required: true,
          msg: 'Не может быть пустым'
        }
      }),
      phone: new LWInput({
        type: 'phone',
        name: 'phone',
        label: 'Телефон',
        required: true,
        value: '',
        validateRule: validator.rules.phone
      }),
      save_button: new LWButton({
        buttonText: 'Сохранить'
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

  dispatchMountComponent() {
    super.dispatchMountComponent();

    globalStore.subscribe(({ user }) => {
      this.updateChildValue('email', user?.email);
      this.updateChildValue('login', user?.login);
      this.updateChildValue('first_name', user?.first_name);
      this.updateChildValue('second_name', user?.second_name);
      this.updateChildValue('nickname', user?.display_name);
      this.updateChildValue('phone', user?.phone);
    });
  }

  private validateAll(): boolean {
    return Object.values(this.children).every(child => {
      if (child instanceof LWInput) {
        return child.validate();
      }

      return true;
    });
  }

  private updateChildValue(prop: TChangeableKeys, value: string) {
    this.children[prop]?.updatePropValue('value', value);
  }

  private getChildValue(prop: TChangeableKeys) {
    return this.children[prop]?.getProps().value;
  }

  public async submitData(event: Event) {
    event.preventDefault();

    const dto = {
      email: this.getChildValue('email'),
      login: this.getChildValue('login'),
      first_name: this.getChildValue('first_name'),
      second_name: this.getChildValue('second_name'),
      display_name: this.getChildValue('nickname'),
      phone: this.getChildValue('phone')
    };

    if (!this.validateAll()) {
      return;
    }

    const data = await userController.changeUserProfile(dto);

    if (!data) {
      return;
    }

    snackbar.open('Данные успешно изменены', 'success');
    router.go('/profile');
  }
}

export default EditProfile;
