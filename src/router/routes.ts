import Chats from '../pages/chats/Chats';
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';
import SignIn from '../pages/signin/Signin';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/Home';
import Block from '../services/block';

export const routes: Record<string, Block> = {
  '/': new Home(),
  '/chats': new Chats(),
  '/login': new Login(),
  '/signin': new SignIn(),
  '/profile': new Profile(),
  '/404': new Error(),
  '/500': new Error({ code: '500', message: 'Мы уже фиксим' })
};
