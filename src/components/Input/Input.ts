import tmpl from './input.tmpl.hbs';
import Handlebars from 'handlebars';
import './input.styles.css';

const defaultProps = {
  type: 'string',
  name: 'lw-input',
  value: '',
  label: 'Label',
  errorMessage: ''
};

export const registerInput = () => {
  Handlebars.registerPartial('LWInput', props => tmpl({ ...defaultProps, ...props }));
};
