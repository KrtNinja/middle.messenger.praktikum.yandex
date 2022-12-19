import Handlebars from 'handlebars';

const template = `
{{#>Layout}}
  <div class='paper'>
    <div class='signin'>
      <h2>Регистрация</h2>
      <form id='signin-form' action='' method='post' class='signin__form'>
        {{{ email }}}
        {{{ login }}}
        {{{ first_name }}}
        {{{ second_name }}}
        {{{ phone }}}
        {{{ password }}}
        {{{ repeat_password }}}
      </form>
      <div class='signin__actions'>
        {{>LWButton buttonText='Зарегистрироваться'}}
        {{>LWButton
          variant='text'
          color='primary'
          size='small'
          buttonText='Войти'
          onClick='location.href = "/login"'
        }}
      </div>
    </div>
  </div>
{{/Layout}}
`;

export default Handlebars.compile(template);
