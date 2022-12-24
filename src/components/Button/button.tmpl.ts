import Handlebars from 'handlebars';

const template = `<button class='LWButton pointer {{classes}}'>
    <p class='LWButton__text'>{{buttonText}}</p>
</button>`;

export default Handlebars.compile(template);
