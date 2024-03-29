import Block, { TProps } from '../block';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.append(block.getElement());
    return root;
  }
  return false;
}

class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: TProps;

  constructor(pathname: string, view: typeof Block, props: TProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  get pathname() {
    return this._pathname;
  }

  public leave() {
    if (this._block) {
      this._block.destroy();
    }
  }

  public match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  public render() {
    // window._componentStore = {};
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
  }
}

export default Route;
