import tmpl from './button.tmpl.hbs';
import Handlebars from 'handlebars';
import './button.styles.css';

export const registerButton = () => {
  Handlebars.registerPartial('LWButton', tmpl);
};
