import template from './profile.tmpl';
import './profile.styles.css';
import Block from '../../services/block';
import { LWButton } from '../../components/Button/Button';

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
        events: { click: () => (document.location.href = '/profile/edit') }
      }),
      change_password_button: new LWButton({
        buttonText: 'Изменить пароль',
        variant: 'text',
        color: 'primary'
      }),
      exit_button: new LWButton({
        buttonText: 'Выйти',
        variant: 'text',
        color: 'error',
        events: { click: () => (document.location.href = '/login') }
      }),
      ...props
    });
  }

  render() {
    return template;
  }
}

export default Profile;
