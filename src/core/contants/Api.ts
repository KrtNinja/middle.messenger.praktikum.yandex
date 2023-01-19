const HOST = 'https://ya-praktikum.tech/api/v2';
const HOST_WS = 'wss://ya-praktikum.tech/ws';

interface API_INFO {
  title: string;
  path: string;
}

const WS: Record<string, API_INFO> = {
  CHATS: {
    title: 'Чаты',
    path: 'chats'
  }
};

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

export const wsConfig: Record<string, string> = Object.keys(WS).reduce((acc, curr) => {
  acc[curr] = `${HOST_WS}/${API[curr].path}`;
  return acc;
}, {} as Record<string, string>);
