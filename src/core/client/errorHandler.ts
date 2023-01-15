import router from '../../router';
import { snackbar } from '../../services/snackbar';

const errors: Record<string, string> = {
  'User already in system': 'Пользователь уже в системе',
  'Not found': 'Не найдено',
  'login is empty, but required': 'Логин не введён, обязательное поле',
  'Email already exists': 'Пользователь с таким email уже существует',
  'Cookie is not valid': 'Вы не авторизованы. Войдите или зарегистрируйтесь',
  'phone is not valid': 'Неверный формат телефона',
  'No chat': 'Не выбран чат',
  'Login or password is incorrect': 'Неправильный логин или пароль'
};

export function errorHandler(error: XMLHttpRequest) {
  if (!error.response) {
    return router.go('/500');
  }
  const { reason } = JSON.parse(error.response);
  snackbar.open(errors[reason] || reason, 'error');
  return null;
}
