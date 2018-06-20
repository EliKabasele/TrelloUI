import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TrelloAuthService} from './common/trello-auth/trello-auth.service';

@Injectable()
export class PrivateGuard implements CanActivate {

  constructor(private trelloAuthService: TrelloAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.trelloAuthService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
