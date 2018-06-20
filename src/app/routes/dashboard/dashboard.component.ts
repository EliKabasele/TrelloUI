import { Component, OnInit } from '@angular/core';
import {TrelloAuthService} from '../../common/trello-auth/trello-auth.service';
import {TrelloService} from '../../common/trello-api/trello.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  trelloUser;
  boards;
  comments;
  cards;

  constructor(
    private trelloAuthService: TrelloAuthService,
    private trelloService: TrelloService,
  ) { }

  async ngOnInit() {
    const user = await this.trelloService.getMemberMe();
    this.trelloUser = user;
    // Todo
  }

  logout() {
    this.trelloAuthService.logout();
  }

}
