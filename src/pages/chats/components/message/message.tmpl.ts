import Handlebars from 'handlebars';

const template = `
<div class='message'>
  <div class='message__header'>
    <div class='message__header-person'>
      <div class='message__header-person_avatar'>
        <img src='{{srcImg}}' alt='ava' width='60' height='60'>
      </div>
      <div class='message__header-person_name'>{{ name }}</div>
    </div>
    <div class='message__header-action'>
      {{{ add_user }}}
      {{{ remove_user }}}
      {{{ delete_chat }}}
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
