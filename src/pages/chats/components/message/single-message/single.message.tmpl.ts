import Handlebars from 'handlebars';

const template = `
  <div class='single-message {{orientation}}'>
    <div class='single-message__content'>
      <div class='single-message__content-text'>{{ content }}</div>
      <div class='single-message__content-time'>{{ time }}</div>
    </div>   
  </div>
`;

export default Handlebars.compile(template);
