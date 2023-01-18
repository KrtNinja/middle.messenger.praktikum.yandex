import http, { Http } from '../../services/http';
import { errorHandler } from './errorHandler';
import { responseHandler } from './reponseHandler';

const defaultOptions: Record<string, any> = {
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': true
  }
};

export class HttpClient {
  constructor(private http: Http) {}

  public get<T>(url: string): Promise<T | null> {
    return this.http
      .get(url, { ...defaultOptions })
      .then(responseHandler)
      .catch(errorHandler);
  }

  public post<T>(url: string, data: T): Promise<T | null> {
    return this.http
      .post(url, { ...defaultOptions, data })
      .then(responseHandler)
      .catch(errorHandler);
  }

  public put<T, R>(url: string, data: T, options = {}): Promise<R | null> {
    return this.http
      .put(url, { ...defaultOptions, data, ...options })
      .then(responseHandler)
      .catch(errorHandler);
  }

  public patch<T>(url: string, data: T): Promise<T | null> {
    return this.http
      .patch(url, { ...defaultOptions, data })
      .then(responseHandler)
      .catch(errorHandler);
  }

  public delete(url: string) {
    return this.http
      .delete(url, { ...defaultOptions })
      .then(responseHandler)
      .catch(errorHandler);
  }
}

export default new HttpClient(http);
