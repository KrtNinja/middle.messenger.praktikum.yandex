import template from './error.tmpl.hbs';

const data = {
  code: '404',
  message: 'Не туда попали',
  backUrl: '/',
  linkText: 'Назад к чатам'
};

export const Error = (props = {}) => {
  return template(Object.assign(data, props));
};
