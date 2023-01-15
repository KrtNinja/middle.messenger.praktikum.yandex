import template from './error.tmpl';
import './error.styles.css';
import Block from '../../../services/block';
import { LWButton } from '../../../components/Button/Button';
import router from '../../../router';

const defaultData = {
  code: '404',
  message: 'Не туда попали',
  backUrl: '/messenger',
  linkText: 'Назад к чатам',
  onClick: ''
};

class ErrorBase extends Block {
  constructor(props = {}) {
    const finalProps = Object.assign(defaultData, props);

    super('div', {
      back_button: new LWButton({
        buttonText: finalProps.linkText,
        variant: 'text',
        color: 'primary',
        size: 'small',
        events: { click: () => router.go(finalProps.backUrl) }
      }),
      ...finalProps
    });
  }

  render() {
    return template;
  }
}

export default ErrorBase;
