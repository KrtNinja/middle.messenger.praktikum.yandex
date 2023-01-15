import tmpl from './snackbar.tmpl';
import './snackbar.styles.css';
import Block from '../../services/block';

const variants: Record<string, string> = {
  success: 'snackbar--success',
  primary: 'snackbar--primary',
  error: 'snackbar--error'
};

interface LWSnackbarProps {
  message: '';
  variant: 'primary';
}

export class LWSnackbar extends Block {
  constructor(props: LWSnackbarProps = { message: '', variant: 'primary' }) {
    super('div', props);
  }

  render() {
    return tmpl;
  }

  public open(message: string, variant = 'primary') {
    this.setProps({message, classes: this.getClasses(variant)});

    document.body.append(this.getElement());

    setTimeout(() => {
      this.destroy();
    }, 5000);
  }

  public close() {
    this.destroy();
  }

  private getClasses(variant: string): string {
    return `${variants[variant]}`;
  }
}
