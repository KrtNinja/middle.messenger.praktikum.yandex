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
        {{{ login_button }}}
        {{{ open_signin_button }}}
      </div>
    </div>
  </div>
{{/Layout}}`;

export default Handlebars.compile(template);
