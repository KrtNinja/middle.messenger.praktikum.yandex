import Store from '../services/lw-store/Store';

export const globalStore = new Store({
  user: null,
  chatId: null
});