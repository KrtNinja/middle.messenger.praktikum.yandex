import template from './chats.tmpl.hbs';

const data = {
  text: 'Главная страница с чатами'
};

export const Chats = () => {
  return template(data);
};
