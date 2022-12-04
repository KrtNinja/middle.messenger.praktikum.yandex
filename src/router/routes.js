import { Chats } from '../pages/chats/Chats';
import { Error } from '../pages/error/Error';
import { Login } from '../pages/login/Login.js';
import { SignIn } from '../pages/signin/Signin.js';
import { Profile } from '../pages/profile/Profile.js';

export const routes = {
  '/': Chats,
  '/login': Login,
  '/signin': SignIn,
  '/profile': Profile,
  '/404': Error,
  '/500': () => Error({ code: '500', message: 'Мы уже фиксим' })
};
