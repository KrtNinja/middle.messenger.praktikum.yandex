import template from './profile.tmpl';
import './profile.styles.css';
import Block from '../../services/block';

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
    super('div', props);
  }

  render() {
    return template;
  }
}

export default Profile;
