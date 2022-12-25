import Handlebars from 'handlebars';
import './chats.css';

const template = `{{#>Layout}}
<div class='chats'>
  <div class='chats__panel'>
    <div class='chats__panel_search'>
      {{{ input_search }}}
    </div>
    <div class='chats__panel_list'>
    {{#components chats}} {{/components}}
    </div>
    <div class='chats__panel_footer'>
      {{{ profile_button }}}
    </div>
  </div>
  <div class='chats__message-area'>
    {{{ messages }}}
  </div>
</div>
{{/Layout}}`;

export default Handlebars.compile(template);
