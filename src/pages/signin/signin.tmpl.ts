import Handlebars from 'handlebars';

const template = `
{{#>Layout}}
  <div class='paper'>
    <div class='signin'>
      <h2>Регистрация</h2>
      <form id='signin-form' action='' method='post' class='signin__form'>
        <div class='signin__form_button_inputs'>
          {{{ email }}}
          {{{ login }}}
          {{{ first_name }}}
          {{{ second_name }}}
          {{{ phone }}}
          {{{ password }}}
          {{{ repeat_password }}}
        </div>
        <div class='signin__form_button'>
          {{{ registration_button }}}
        </div>
      </form>
      <div class='signin__actions'>
        {{{ open_login_button }}}
      </div>
    </div>
  </div>
{{/Layout}}
`;

export default Handlebars.compile(template);
