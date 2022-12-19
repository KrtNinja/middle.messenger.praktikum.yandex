import Handlebars from 'handlebars';

const template = `<div class='LWInput' id='{{id}}'>
  <label class='subtitle grey--text'>
    {{label}}
    <input type='{{type}}' value='{{value}}' name='{{name}}' />
  </label>
  <p class='subtitle error--text'>{{errorMessage}}</p>
</div>`;

export default Handlebars.compile(template);
