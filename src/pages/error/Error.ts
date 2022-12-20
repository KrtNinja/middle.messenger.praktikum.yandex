import template from './error.tmpl';
import './error.styles.css';
import Block from '../../services/block';

const data = {
  code: '404',
  message: 'Не туда попали',
  backUrl: '/chats',
  linkText: 'Назад к чатам',
  onClick: ''
};

class ErrorPage extends Block {
  constructor(public props = {}) {
    const finalProps = Object.assign(data, props);
    finalProps.onClick = `location.href = "${finalProps.backUrl}"`;

    super('div', finalProps);
  }

  render() {
    return template;
  }
}

export default ErrorPage;
