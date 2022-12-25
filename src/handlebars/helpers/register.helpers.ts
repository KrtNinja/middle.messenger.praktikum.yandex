import Handlebars from 'handlebars';

Handlebars.registerHelper('components', (data: Array<string>) => {
  return data.reduce((str, id) => `${ str }<div data-id=${id}></div>`, '');
});