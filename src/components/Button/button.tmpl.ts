import Handlebars from 'handlebars';

const template = `<button class='LWButton pointer {{classes}}'>
    <p>{{buttonText}}</p>
</button>`;

export default Handlebars.compile(template);
