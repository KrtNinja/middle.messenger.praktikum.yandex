import Handlebars from 'handlebars';

const template = `
  <div class='chat-item'>
    <h4>{{text}}</h4>
  </div>
`;

export default Handlebars.compile(template);
