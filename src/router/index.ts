import { routes } from './routes';
import Block from '../services/block';

const renderDOM = (page: () => string) => {
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element not found');
  }
  root.innerHTML = page();
};

const renderComponent = (block: Block) => {
  const root = document.getElementById('root') as HTMLElement;
  root.appendChild(block.getElement());

  block.dispatchMountComponent();
};

const router = () => {
  const { pathname } = document.location;
  const page = routes[pathname];

  if (page instanceof Block) {
    renderComponent(page);
    return;
  }
  if (!page) {
    console.error(`Unknown pathname: ${pathname}`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    renderDOM(routes['/404']);
    return;
  }

  renderDOM(page);
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

window.removeEventListener('unload', router);
