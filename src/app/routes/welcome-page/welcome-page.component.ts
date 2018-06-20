import { Component, OnInit } from '@angular/core';
import {TrelloAuthService} from '../../common/trello-auth/trello-auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private trelloAuthService: TrelloAuthService) { }

  ngOnInit() {
  }

  login() {
    this.trelloAuthService.login();
  }

}
