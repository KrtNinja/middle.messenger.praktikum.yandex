import Handlebars from 'handlebars';

const template = `{{#>Layout}}
  <div class='paper'>
    <div class='password'>
      <h2>Изменение пароля</h2>
      <form id='password-form' action='' method='post' class='password__form'>
        <div class='password__form_inputs'>
          {{{ prev_password }}}
          {{{ password }}}
          {{{ repeat_password }}}
        </div>
        {{{ save_button }}}
      </form>
      <div class='password__actions'>
        {{{ back_button }}}
      </div>
    </div>
  </div>
{{/Layout}}`;

export default Handlebars.compile(template);
