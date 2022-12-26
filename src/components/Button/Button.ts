import tmpl from './button.tmpl';
import './button.styles.css';
import Block from '../../services/block';

type TVariant = 'contained' | 'text';
type TColor = 'white' | 'primary' | 'error';
type TSize = 'small' | 'default' | 'large';
type TPadding = 'none' | 'small' | 'default';

const classByPadding: Record<TPadding, string> = {
  none: 'LWButton__padding--none',
  small: 'LWButton__padding--small',
  default: 'LWButton__padding--default'
};

const classByVariant: Record<TVariant, string> = {
  contained: 'LWButton--contained',
  text: 'LWButton--text'
};

const classByColor: Record<TColor, string> = {
  white: 'LWButton--white',
  primary: 'LWButton--primary',
  error: 'LWButton--error'
};

const classBySize: Record<TSize, string> = {
  small: 'subtitle',
  default: '',
  large: 'large'
};

export interface ILWButton {
  buttonText: string;
  classes?: string;
  variant?: TVariant;
  color?: TColor;
  size?: TSize;
  padding?: TPadding;
  onClick?: (event: MouseEvent) => void;
}

const defaultProps = {
  classes: '',
  buttonText: '',
  variant: 'contained' as TVariant,
  color: 'white' as TColor,
  size: 'default' as TSize,
  padding: 'default' as TPadding,
  onClick: () => void 0
};

export class LWButton extends Block {
  public props: ILWButton;

  constructor(props: ILWButton) {
    super('div', props);

    this.setProps({ classes: this.getClasses() });
  }

  render() {
    return tmpl;
  }

  public dispatchMountComponent() {
    this.getElement().addEventListener('click', this.onClickHandler);
  }

  private onClickHandler: EventListener = (event: MouseEvent) => {
    if (!this.props.onClick) {
      return;
    }

    this.props.onClick(event);
  };

  private getClasses(): string {
    const variant = this.props.variant || defaultProps.variant;
    const color = this.props.color || defaultProps.color;
    const size = this.props.size || defaultProps.size;
    const padding = this.props.padding || defaultProps.padding;

    return `${classByVariant[variant]} ${classByColor[color]} ${classBySize[size]} ${classByPadding[padding]}`;
  }
}
