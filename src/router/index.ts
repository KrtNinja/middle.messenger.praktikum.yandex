import { routes } from './routes';

const renderDOM = (page: () => string) => {
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element not found');
  }
  root.innerHTML = page();
};

const router = () => {
  const { pathname } = document.location;
  const page = routes[pathname];

  if (!page) {
    console.error(`Unknown pathname: ${pathname}`);
    renderDOM(routes['/404']);
    return;
  }

  renderDOM(page);
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

window.removeEventListener('unload', router);
