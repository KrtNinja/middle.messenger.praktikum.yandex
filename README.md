# Loud Whisper

## Ссылки
* [Макет в Figma](https://www.figma.com/file/19wDMl4QNTAFHu6Q1mZcr5/Yandex.Practicum-Chats?node-id=0%3A1&t=OwJO1e9oSTv8b3WW-0)
* [Приложение в Netlify](https://sunny-muffin-404bd7.netlify.app)

## Описание
Месседжер для общения.
Обучающий проект в рамках курса Яндекс.Практикум

## Установка

- `npm run dev` — запуск версии для разработки (порт 3000),
- `npm start` — запуск версии для разработчика,
- `npm run build` — сборка стабильной версии.

## Маршруты страниц

- `/` — Главная страница с роутами
- `/chats` — Чаты
- `/login` — Авторизация
- `/signin` — Регистрация
- `/profile` — Профиль
- `/profile/edit` — Изменение данных профиля
- `/profile/password` — Изменение пароля
- `/404` — Ошибка 404
- `/500` — Ошибка 500


## Использование `Block` с `Handlebars`

Для начала следует указать разметку
#### Корневой файл с разметкой `./home.tmpl.ts`
```ts
import Handlebars from 'handlebars';

const template = `
<div class='home'>
  <h1> Я домашняя страница с динамическим текстом {{{ text }}}</h1>
  <p>После меня будет компонент кнопка!</p>
  {{{ button_name }}}
</div>
`;

export default Handlebars.compile(template);

```

#### Корневой компонент (Страница) `./Home.ts`

```ts
import Block from './services/Block';
// Импорт шаблона
import { template } from './home.tmpl';
// Импорт вложенного компонента
import LWButton from './components/LWButton/LWButton';
// Стили корневого компонента
import './home.scss';
// Наследуем класс от Block.ts
class Home extends Block {
  constructor() {
    // 'div' обёртка компонента (корневой элемент) 
    super('div', {
      // Описывает props для Home
      text: 'Текст из props',
      // Указываем ключ кнопки из верстки и саму кнопку
      button_name: new LWButton({
        buttonText: 'Моя кнопка',
        // Данная функция будет вызвана событием внутри Button
        events: { click: () => console.log('Произошел клик по кнопке') },
      }),
    });
  }
  render() {
    // Возвращаем шаблон верстки которую Block будет использовать
    return template;
  }
}