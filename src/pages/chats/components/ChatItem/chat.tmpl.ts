import Handlebars from 'handlebars';

const template = `
  <div class='chat-item'>
    <div class='chat-item__avatar'>
      <img src='{{srcImg}}' alt='ava' width='60' height='60'>
    </div>
    <div class='chat-item__info'>
      <div class='chat-item__info-title'>
        {{name}}
      </div>
      <div class='chat-item__info-msg'>
        {{msg}}
      </div>
    </div>
    <div class='chat-item__update'>
      {{date}}
    </div>
  </div>
`;

export default Handlebars.compile(template);
