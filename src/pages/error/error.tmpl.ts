import Handlebars from 'handlebars';

const template = `{{#>Layout }}
  <div class='error-page'>
    <h1>{{code}}</h1>
    <h2>{{message}}</h2>
    {{{ back_button }}}
  </div>
{{/Layout}}`;

export default Handlebars.compile(template);
