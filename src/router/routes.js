import { Chats } from '../pages/chats/Chats';
import { Error } from '../pages/error/Error';
import { Login } from '../pages/login/Login.js';

export const routes = {
  '/': Chats,
  '/login': Login,
  '/404': Error,
  '/500': () => Error({ code: '500', message: 'Мы уже фиксим' })
};
