import tmpl from './layout.tmpl.hbs';
import Handlebars from 'handlebars';
import './layout.styles.css';

export const LayoutRegister = () => {
  Handlebars.registerPartial('Layout', tmpl);
};