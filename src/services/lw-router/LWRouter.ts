import Route from './Route';
import Block from '../block';

class LWRouter {
  public routes: Route[];
  public history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;
  private _pathnames: string[];
  private _onProtectRouteCallback: () => void;
  private _onRouteCallback: () => void;
  private _unprotectedPaths: string[];
  static __instance: LWRouter;

  constructor(rootQuery: string) {
    if (LWRouter.__instance) {
      return LWRouter.__instance;
    }

    this.routes = [];
    this._pathnames = [];
    this._unprotectedPaths = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._onRouteCallback = () => void 0;
    this._onProtectRouteCallback = () => void 0;

    LWRouter.__instance = this;
  }

  get currentRoute() {
    return this._currentRoute;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);
    this._pathnames.push(pathname);
    return this;
  }

  private _hasRoute(pathname: string) {
    if (!this._pathnames.includes(pathname)) {
      return '*';
    }
    return pathname;
  }

  public start() {
    window.onpopstate = () => {
      const pathname = this._hasRoute(window.location.pathname);
      this._onRoute(pathname);
    };

    const pathname = this._hasRoute(window.location.pathname);
    this._onRoute(pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();

    this._onRouteCallback();

    if (!this._unprotectedPaths.includes(pathname)) {
      this._onProtectRouteCallback();
    }
  }

  public onProtectRoute(callback: () => void) {
    this._onProtectRouteCallback = callback;
    return this;
  }

  public onRoute(callback: () => void) {
    this._onRouteCallback = callback;
    return this;
  }

  public setUnprotectedPaths(paths: string[]) {
    this._unprotectedPaths = paths;
    return this;
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  public getLocationPathname() {
    return window.location.pathname;
  }
}

export default LWRouter;
