import template from './home.tmpl';
import Block from '../../services/block';

class Home extends Block {
  constructor() {
    super();
  }

  render() {
    return template;
  }
}

export default Home;
