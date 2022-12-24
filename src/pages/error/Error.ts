import template from './error.tmpl';
import './error.styles.css';
import Block from '../../services/block';
import { LWButton } from '../../components/Button/Button';

const data = {
  code: '404',
  message: 'Не туда попали',
  backUrl: '/chats',
  linkText: 'Назад к чатам',
  onClick: ''
};

class ErrorPage extends Block {
  constructor(props = {}) {
    const finalProps = Object.assign(data, props);

    super('div', {
      back_button: new LWButton({
        buttonText: finalProps.linkText,
        variant: 'text',
        color: 'primary',
        size: 'small',
        onClick: () => document.location.href = `${finalProps.backUrl}`
      }),
      ...finalProps
    });
  }

  render() {
    return template;
  }
}

export default ErrorPage;
