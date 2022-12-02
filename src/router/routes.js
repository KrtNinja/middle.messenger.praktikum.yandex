import { Chats } from '../pages/chats/Chats';
import { Error } from '../pages/error/Error';

export const routes = {
  '/': Chats,
  '/404': Error,
  '/500': () => Error({code: '500', message: 'Мы уже фиксим'})
};