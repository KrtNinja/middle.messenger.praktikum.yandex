import tmpl from './backpanel.tmpl.hbs';
import './backpanel.styles.css';
import Handlebars from 'handlebars';

export const registerBackPanel = () => {
  Handlebars.registerPartial('LWBackPanel', tmpl);
};
