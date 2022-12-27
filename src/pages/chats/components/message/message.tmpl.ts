import Handlebars from 'handlebars';

const template = `
<div class='message'>
  <div class='message__header'>
    <div class='message__header-person'>
      <div class='message__header-person_avatar'></div>
      <div class='message__header-person_name'>{{ name }}</div>
    </div>
    <div class='message__header-action'>
      {{{ more_button }}}
     </div>
  </div>
  <div class='message__content'>
  ...
  </div>
  <div class='message__input'>
    {{{ message_input }}}
    {{{ send_button }}}
  </div>
</div>
`;

export default Handlebars.compile(template);
