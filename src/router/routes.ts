import { Chats } from '../pages/chats/Chats';
import { Error }  from '../pages/error/Error';
import { Login }   from '../pages/login/Login.ts';
import { SignIn }  from '../pages/signin/Signin.ts';
import { Profile } from '../pages/profile/Profile.ts';

export const routes = {
  '/': Chats,
  '/login': Login,
  '/signin': SignIn,
  '/profile': Profile,
  '/404': Error,
  '/500': () => Error({ code: '500', message: 'Мы уже фиксим' })
};
