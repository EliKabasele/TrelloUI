import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TrelloAuthService} from '../common/trello-auth/trello-auth.service';


@Injectable()
export class PublicGuard implements CanActivate {

  constructor( private router: Router, private trelloAuthService: TrelloAuthService) {}

  /**
   * User with valid Token are NOT allowed to visit welcome-page and Login
   * @returns {boolean}
   */
  canActivate(): boolean {
    if (this.trelloAuthService.getToken()) {
      this.router.navigate(['/app']);

      return false;
    } else {
      return true;
    }
  }
}
