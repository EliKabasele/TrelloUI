import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {TRELLO_SECRET_KEY} from './trello-secret-key';

@Injectable()
export class TrelloAuthService {

  public token: string;

  /**
   * the user api-key assigned by Trello, to identify the application when talking to Trello.
   * @type {string}
   */
  public apiKey = '827fb4984f305a7aff600e7087d1934d';

  public loginBaseUrl1 = `https://api.trello.com/1/authorize?response_type=token&key=${this.apiKey}&return_url=`;
  public loginBaseUrl2 = '&callback_method=fragment&scope=read%2Cwrite%2Caccount&expiration=never&name=Calendar+for+Trello';

  constructor(private router: Router) {
    this.token = localStorage.getItem(TRELLO_SECRET_KEY);
  }

  getToken(): string | undefined {
    return localStorage.getItem(TRELLO_SECRET_KEY);
  }

  setToken(token: string): void {
    return localStorage.setItem(TRELLO_SECRET_KEY, token);
  }

  login() {

    const returnUrl = encodeURI(window.location.href + 'set-token');
    window.location.href = this.loginBaseUrl1 + returnUrl + this.loginBaseUrl2;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(TRELLO_SECRET_KEY);
    await this.router.navigate(['/']);
  }

}
