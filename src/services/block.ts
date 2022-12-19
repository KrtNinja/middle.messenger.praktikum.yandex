import { v4 as uuid } from 'uuid';
import EventBus from './event.bus';

export type TProps = Record<string, any>;

abstract class Block {
  private EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private element: HTMLElement | undefined;

  protected eventBus: EventBus;
  protected props: TProps;
  protected children: Record<string, Block>;
  protected id: string;

  protected constructor(private readonly tagName = 'div', propsAndChildren: TProps = {}) {
    this.id = uuid();

    const { children, props } = this.getChildren(propsAndChildren);
    this.children = children;
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
    this.eventBus.emit(this.EVENTS.FLOW_RENDER);
  }

  private createResources(): void {
    this.element = this.createDocumentElement(this.tagName);
  }

  private createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  private _componentDidMount(): void {
    Object.values(this.children).forEach(child => {
      child.dispatchMountComponent();
    });
  }

  public dispatchMountComponent(): void {
    this.eventBus.emit(this.EVENTS.FLOW_CDM);
  }

  public componentDidUpdate(oldProps?: TProps, newProps?: TProps) {
    return oldProps !== newProps;
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
    const isUpdate = this.componentDidUpdate(oldProps, newProps);

    if (isUpdate) {
      this.removeEvents();
      this.eventBus.emit(this.EVENTS.FLOW_RENDER);
    }
  }

  private _renderComponent(): void {
    const fragment = this.getFragment(this.render(), this.props);
    const element = fragment.firstElementChild as HTMLElement;

    if (this.element) {
      this.element.replaceWith(element);
      this.element = element;
    }

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

  public abstract render(): HandlebarsTemplateDelegate;

  public setProps(newProps: TProps): void {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  }

  public getElement(): HTMLElement {
    return <HTMLElement>this.element;
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

  protected getFragment(template: (...args: unknown[]) => string, props: TProps) {
    const propsAndStubs = { ...props };

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
}

export default Block;
