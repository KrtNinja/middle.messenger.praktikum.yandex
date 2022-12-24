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
        {{{ registration_button }}}
        {{{ open_login_button }}}
      </div>
    </div>
  </div>
{{/Layout}}
`;

export default Handlebars.compile(template);
