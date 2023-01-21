import template from './password.tmpl';
import './password.styles.css';
import Block from '../../services/block';
import { LWInput } from '../../components/Input/Input';
import { LWButton } from '../../components/Button/Button';
import validator from '../../services/validator';
import router from '../../router';
import userController from '../../core/controllers/user/User.controller';
import { snackbar } from '../../services/snackbar';

type TChangeableKeys = 'prev_password' | 'password' | 'repeat_password';

class Password extends Block {
  constructor() {
    super('div', { events: { submit: (e: Event) => this.submitData(e) } });

    this.setChildren({
      prev_password: new LWInput({
        type: 'password',
        name: 'prev_password',
        label: 'Старый пароль',
        value: '',
        validateRule: validator.rules.password
      }),
      password: new LWInput({
        type: 'password',
        name: 'password',
        label: 'Новый пароль',
        required: true,
        value: '',
        validateRule: validator.rules.password
      }),
      repeat_password: new LWInput({
        type: 'password',
        name: 'repeat_password',
        label: 'Повторите пароль',
        required: true,
        value: '',
        validateRule: {
          pattern: this.getRepeatPasswordPattern,
          required: true,
          msg: 'Обязательное поле. Должно совпадать с паролем'
        }
      }),
      save_button: new LWButton({
        buttonText: 'Изменить'
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

  private getChildValue(prop: TChangeableKeys) {
    return this.children[prop]?.getProps().value;
  }

  private validateAll(): boolean {
    return Object.values(this.children).every(child => {
      if (child instanceof LWInput) {
        return child.validate();
      }

      return true;
    });
  }

  private getRepeatPasswordPattern = () => {
    return `^${this.getChildValue('password')}$`;
  };

  public async submitData(event: Event) {
    event.preventDefault();

    const dto = {
      oldPassword: this.getChildValue('prev_password'),
      newPassword: this.getChildValue('password')
    };

    if (!this.validateAll()) {
      return;
    }

    const data = await userController.changePassword(dto);

    if (!data) {
      return;
    }

    snackbar.open('Пароль успешно изменен', 'success');
    router.go('/profile');
  }
}

export default Password;
