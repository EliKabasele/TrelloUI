import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TrelloAuthService} from '../trello-auth/trello-auth.service';
import {Observable} from 'rxjs/Observable';
import {_throw} from 'rxjs/observable/throw';


/**
 * This interceptor get the token from locale storage
 * and add it to every http request made to Trello api to authenticate the user
 * It should be registered into the module!
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: TrelloAuthService) {}

  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.auth.getToken();
    if (!token) {
      return _throw ('COULD NOT CONNECT TO TRELLO API DUE TO AN UNPROVIDED TOKEN!');
    }

    request = request.clone( {
      setParams: {
        token: this.auth.getToken(),
        key:   this.auth.apiKey,
      }
    });

    return next.handle(request);
  }
}
