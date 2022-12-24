import tmpl from './layout.tmpl.hbs';
import Handlebars from 'handlebars';
import './layout.styles.css';

export const registerLayout = () => {
  Handlebars.registerPartial('Layout', tmpl);
};