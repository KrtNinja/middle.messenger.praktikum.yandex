import template from './profile.tmpl.hbs';
import './profile.styles.css';

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

export const Profile = () => template(props);
