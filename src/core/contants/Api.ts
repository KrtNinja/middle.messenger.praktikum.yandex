const HOST = 'https://ya-praktikum.tech/api/v2';

interface API_INFO {
  title: string;
  path: string;
}

const API: Record<string, API_INFO> = {
  AUTH: {
    title: 'Авторизация',
    path: 'auth'
  },
  CHATS: {
    title: 'Чаты',
    path: 'chats'
  },
  USER: {
    title: 'Пользователи',
    path: 'user'
  },
  RESOURCES: {
    title: 'Ресуры',
    path: 'resources'
  }
} as const;

type APIConfig = Record<string, string>;

export const apiConfig: APIConfig = Object.keys(API).reduce((acc, curr) => {
  acc[curr] = `${HOST}/${API[curr].path}`;
  return acc;
}, {} as APIConfig);
