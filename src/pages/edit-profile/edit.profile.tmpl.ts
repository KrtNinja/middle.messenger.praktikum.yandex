import Handlebars from 'handlebars';

const template = `{{#>Layout}}
  <div class='paper'>
    <div class='edit'>
      <h2>Изменение данных</h2>
      <form id='edit-form' action='' method='post' class='edit__form'>
        <div class='edit__form_inputs'>
          {{{ email }}}
          {{{ login }}}
          {{{ first_name }}}
          {{{ second_name }}}
          {{{ nickname }}}
          {{{ phone }}}
        </div>
        {{{ save_button }}}
      </form>
      <div class='edit__actions'>
        {{{ back_button }}}
      </div>
    </div>
  </div>
{{/Layout}}`;

export default Handlebars.compile(template);
