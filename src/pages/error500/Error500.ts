import ErrorBase from '../common/error/ErrorBase';

const data = {
  code: '500',
  message: 'Мы уже фиксим',
  backUrl: '/messenger',
  linkText: 'Назад к чатам',
  onClick: ''
};

class Error500Page extends ErrorBase {
  constructor() {
    super(data);
  }
}

export default Error500Page;
