import { v4 as uuid } from 'uuid';
import EventBus from './event.bus';
import Handlebars from 'handlebars';

export type TProps = Record<string, any>;

class Block {
  private EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private element: HTMLElement | undefined;

  protected eventBus: EventBus;
  protected props: TProps = {};
  protected children: Record<string, Block>;
  public id: string = uuid();

  constructor(private readonly tagName = 'div', propsAndChildren: TProps = {}) {
    const { children, props } = this.getChildren(propsAndChildren);
    this.children = this.makePropsProxy(children);
    this.props = this.makePropsProxy({ ...props, id: this.id });

    this.eventBus = new EventBus();
    this.registerEvent();
    this.eventBus.emit(this.EVENTS.INIT);
  }

  private registerEvent(): void {
    this.eventBus.on(this.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(this.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(this.EVENTS.FLOW_RENDER, this._renderComponent.bind(this));
  }

  private _init(): void {
    this.createResources();
    this.eventBus.emit(this.EVENTS.FLOW_CDM);
  }

  private createResources(): void {
    this.element = this.createDocumentElement(this.tagName);
  }

  private createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  private _componentDidMount(): void {
    this.dispatchMountComponent();
    Object.values(this.children).forEach(child => {
      child.dispatchMountComponent();
    });
  }

  public dispatchMountComponent(): void {
    this.eventBus.emit(this.EVENTS.FLOW_RENDER);
  }

  public componentDidUpdate(oldProps?: TProps, newProps?: TProps) {
    return oldProps !== newProps;
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
    const isUpdate = this.componentDidUpdate(oldProps, newProps);

    if (!isUpdate) {
      return;
    }

    this._renderComponent();
  }

  private _renderComponent(): void {
    const fragment = this.getFragment();
    this.removeEvents();
    const element = fragment.firstElementChild as HTMLElement;

    this.element!.replaceWith(element);
    this.element = element;

    this.addEvents();
  }

  private addEvents(): void {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach(eventName => {
        if (this.element) {
          this.element.addEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  private removeEvents(): void {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach(eventName => {
        if (this.element) {
          this.element.removeEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  public render(): HandlebarsTemplateDelegate {
    return Handlebars.compile('');
  }

  public setChildren(newChildren: TProps): void {
    if (!newChildren) {
      return;
    }

    Object.assign(this.children, newChildren);
  }

  public setProps(newProps: TProps): void {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  }

  public getProps(): TProps {
    return this.props;
  }

  public getElement(): HTMLElement {
    return <HTMLElement>this.element;
  }

  public updatePropValue(name: string, newValue: any): void {
    this.props[name] = newValue;
  }

  private makePropsProxy(props: TProps): TProps {
    const proxySetting = {
      get: (target: TProps, prop: string): unknown => {
        return target[prop];
      },

      set: (target: TProps, prop: string, value: unknown): boolean => {
        const oldProps = target[prop];
        target[prop] = value;

        this.eventBus.emit(this.EVENTS.FLOW_CDU, oldProps, target[prop]);
        return true;
      },

      deleteProperty: (target: TProps, prop: string): boolean => {
        const oldProps = target[prop];
        delete target[prop];

        this.eventBus.emit(this.EVENTS.FLOW_CDU, oldProps, target[prop]);
        return true;
      }
    };

    return new Proxy(props, proxySetting);
  }

  private getChildren(propsAndChildren: TProps) {
    const children: Record<string, Block> | any = {};
    const props: TProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      value instanceof Block ? (children[key] = value) : (props[key] = value);
    });

    return { children, props };
  }

  protected getFragment() {
    const template = this.render();

    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id='${child.id}'></div>`;
    });

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      (stub as HTMLElement).replaceWith(child.getElement());
    });

    return fragment.content;
  }

  public show() {
    this.getElement().style.display = 'block';
  }

  public hide() {
    this.getElement().style.display = 'none';
  }

  public destroy() {
    this.element?.remove();
    this.onDestroy();
  }

  public onDestroy(): void {
    return;
  }
}

export default Block;
