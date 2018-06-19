import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TrelloAuthService} from '../common/trello-auth/trello-auth.service';

@Injectable()
export class PrivateGuard implements CanActivate {

  constructor(private trello_auth_service: TrelloAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.trello_auth_service.getToken()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
