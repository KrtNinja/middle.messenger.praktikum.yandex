import tmpl from './button.tmpl.hbs';
import Handlebars from 'handlebars';
import './button.styles.css';

const classByVariant = {
  contained: 'LWButton--contained',
  text: 'LWButton--text'
};

const classByColor = {
  white: 'LWButton--white',
  primary: 'LWButton--primary',
  error: 'LWButton--error'
};

const classBySize = {
  small: 'subtitle'
};

export const registerButton = () => {
  Handlebars.registerPartial('LWButton', props => {
    props.classes = `${classByVariant[props?.variant ?? 'contained']} ${
      classByColor[props?.color ?? 'white']
    } ${classBySize[props?.size] ?? ''}`;

    return tmpl(props);
  });
};