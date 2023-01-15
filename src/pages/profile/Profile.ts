import template from './profile.tmpl';
import './profile.styles.css';
import Block from '../../services/block';
import { LWButton } from '../../components/Button/Button';
import router from '../../router';
import authController from '../../core/controllers/auth/Auth.controller';

const props = {
  first_name: 'Иван',
  infoList: [
    { name: 'Почта', value: 'pochta@yandex.ru' },
    { name: 'Логин', value: 'ivanovivan' },
    { name: 'Имя', value: 'Иван' },
    { name: 'Фамилия', value: 'Иванов' },
    { name: 'Никнейм', value: 'BigVano' },
    { name: 'Телефон', value: '+7 (903) 622 70 01' }
  ]
};

class Profile extends Block {
  constructor() {
    super('div', {
      change_data_button: new LWButton({
        buttonText: 'Изменить данные',
        variant: 'text',
        color: 'primary',
        events: { click: () => router.go('/profile/edit') }
      }),
      change_password_button: new LWButton({
        buttonText: 'Изменить пароль',
        variant: 'text',
        color: 'primary',
        events: { click: () => router.go('/profile/password') }
      }),
      exit_button: new LWButton({
        buttonText: 'Выйти',
        variant: 'text',
        color: 'error',
        events: { click: () => this.logout() }
      }),
      ...props
    });
  }

  render() {
    return template;
  }

  private async logout() {
    const data = await authController.logout();

    if (!data) {
      return;
    }

    router.go('/login');
  }
}

export default Profile;
