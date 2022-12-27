import Handlebars from 'handlebars';

const template = `{{#>Layout}}
  <div class='paper'>
    <div class='login'>
      <h2>Вход</h2>
      <form id='login-form' action='' method='post' class='login__form'>
        <div class='login__form_inputs'>
          {{{ login }}}
          {{{ password }}}
        </div>
        {{{ login_button }}}
      </form>
      <div class='login__actions'>
        {{{ open_signin_button }}}
      </div>
    </div>
  </div>
{{/Layout}}`;

export default Handlebars.compile(template);
