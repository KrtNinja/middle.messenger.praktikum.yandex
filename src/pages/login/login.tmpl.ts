import Handlebars from 'handlebars';

const template = `{{#>Layout}}
  <div class='paper'>
    <div class='login'>
      <h2>Вход</h2>
      <form id='login-form' action='' method='post' class='login__form'>
        {{{ login }}}
        {{{ password }}}
      </form>
      <div class='login__actions'>
        {{>LWButton buttonText='Авторизоваться'}}
        {{>LWButton
          variant='text'
          color='primary'
          size='small'
          buttonText='Нет аккаунта?'
          onClick='location.href = "/signin"'
        }}
      </div>
    </div>
  </div>
{{/Layout}}`;

export default Handlebars.compile(template);
