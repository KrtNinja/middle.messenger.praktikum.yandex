import Handlebars from 'handlebars';

const template = `<div class='home'>
  <ul class style='display: flex; gap: 10px; padding: 1rem'>
    <li>
      <a href='/messenger'>Чаты</a>
    </li>
    <li>
      <a href='/login'>Авторизация</a>
    </li>
    <li>
      <a href='/sign-up'>Регистрация</a>
    </li>
    <li>
      <a href='/profile'>Профиль</a>
    </li>
    <li>
      <a href='/profile/edit'>Редактирование профиля</a>
    </li>
    <li>
      <a href='/profile/password'>Изменение пароля</a>
    </li>
    <li>
      <a href='/404'>Ошибка 404</a>
    </li>
    <li>
      <a href='/500'>Ошибка 500</a>
    </li>
  </ul>
</div>
`;

export default Handlebars.compile(template);
