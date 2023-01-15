import Chats from '../pages/chats/Chats';
import Login from '../pages/login/Login';
import SignIn from '../pages/signin/Signin';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/Home';
import EditProfile from '../pages/edit-profile/Edit.profile';
import ChangePassword from '../pages/change-password/Password';
import Error500Page from '../pages/error500/Error500';
import Error400Page from '../pages/error400/error400';
import Block from '../services/block';

export interface Route {
  path: string;
  block: typeof Block;
}

export const routes: Route[] = [
  { path: '/', block: Home },
  { path: '/messenger', block: Chats },
  { path: '/sign-in', block: SignIn },
  { path: '/login', block: Login },
  { path: '/profile', block: Profile },
  { path: '/profile/edit', block: EditProfile },
  { path: '/profile/password', block: ChangePassword },
  { path: '/500', block: Error500Page },
  { path: '*', block: Error400Page },
];
