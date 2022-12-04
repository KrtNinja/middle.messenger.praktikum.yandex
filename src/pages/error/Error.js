import template from './error.tmpl.hbs';
import './error.styles.css';

const data = {
  code: '404',
  message: 'Не туда попали',
  backUrl: '/',
  linkText: 'Назад к чатам'
};

export const Error = (props = {}) => {
  const finalProps = Object.assign(data, props);
  finalProps.onClick = `location.href = "${finalProps.backUrl}"`;

  return template(finalProps);
};
