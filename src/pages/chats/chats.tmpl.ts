import Handlebars from 'handlebars';

const template = `
<div class='chats'>
  <h3>{{text}}</h3>
</div>
`;

export default Handlebars.compile(template);
