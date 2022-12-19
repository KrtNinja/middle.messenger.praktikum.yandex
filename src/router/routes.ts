import { Chats } from '../pages/chats/Chats';
import { Error } from '../pages/error/Error';
import { Login } from '../pages/login/Login';
import { SignIn } from '../pages/signin/Signin';
import { Profile } from '../pages/profile/Profile';
import { Home } from '../pages/home/Home';

export const routes: Record<string, () => string> = {
  '/': Home,
  '/chats': Chats,
  '/login': Login,
  '/signin': SignIn,
  '/profile': Profile,
  '/404': Error,
  '/500': () => Error({ code: '500', message: 'Мы уже фиксим' })
};
