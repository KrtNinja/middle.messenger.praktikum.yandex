import ErrorBase from '../common/error/ErrorBase';

const data = {
  code: '404',
  message: 'Не туда попали',
  backUrl: '/messenger',
  linkText: 'Назад к чатам',
  onClick: ''
};

class Error400Page extends ErrorBase {
  constructor() {
    super(data);
  }
}

export default Error400Page;
