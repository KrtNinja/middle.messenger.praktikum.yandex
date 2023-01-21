import Handlebars from 'handlebars';

const template = `<div class="snackbar {{ classes }}">
    {{ message }}
</div>`;

export default Handlebars.compile(template);