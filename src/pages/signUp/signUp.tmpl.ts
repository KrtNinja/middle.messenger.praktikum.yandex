import Handlebars from 'handlebars';

const template = `
{{#>Layout}}
  <div class='paper'>
    <div class='signUp'>
      <h2>Регистрация</h2>
      <form id='signUp-form' action='' method='post' class='signUp__form'>
        <div class='signUp__form_button_inputs'>
          {{{ email }}}
          {{{ login }}}
          {{{ first_name }}}
          {{{ second_name }}}
          {{{ phone }}}
          {{{ password }}}
          {{{ repeat_password }}}
        </div>
        <div class='signUp__form_button'>
          {{{ registration_button }}}
        </div>
      </form>
      <div class='signUp__actions'>
        {{{ open_login_button }}}
      </div>
    </div>
  </div>
{{/Layout}}
`;

export default Handlebars.compile(template);
