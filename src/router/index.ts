import { routes } from './routes';
import Block from '../services/block';
import Error from '../pages/error/Error';

const renderComponent = (block: Block) => {
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element not found');
  }

  root.appendChild(block.getElement());
  block.dispatchMountComponent();
};

const router = () => {
  const { pathname } = document.location;
  const page = routes[pathname];

  if (!page) {
    console.error(`Unknown pathname: ${pathname}`);
    renderComponent(routes['/404']);
    return;
  }

  renderComponent(page);
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

window.removeEventListener('unload', router);
