import { Component, OnInit } from '@angular/core';
import {TrelloAuthService} from '../../common/trello-auth/trello-auth.service';
import {TrelloService} from '../../common/trello-api/trello.service';
import {Trello} from '../../../trello';
import Cards = Trello.Cards;
import {TrelloBoardService} from '../../services/trello-board.service';
import {CalculateDateService} from '../../services/calculate-date.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  trelloUser;
  boards;
  cards: { overdue: Cards[], overdueToday: Cards[], stillOpen: Cards[]};
  // cardArray: Cards[];

  constructor(
    private trelloAuthService: TrelloAuthService,
    private trelloService: TrelloService,
    private boardService: TrelloBoardService,
    private calculateService: CalculateDateService
  ) { }

  async ngOnInit() {

    const user = await this.trelloService.getMemberMe();
    this.trelloUser = user;
    this.boardService.fetchTrUser(user);

    this.boardService.getBoardList().subscribe(res => {
      this.boards = res;
    });

    this.boardService.firstBoard().subscribe( res => {
      this.Cards(res[0]);
    });


  }


  Cards(id) {
    this.boardService.getCard(id).subscribe( res => {
      this.cards = { overdue: res.overdue, overdueToday: res.overdueToday, stillOpen: res.stillOpen};
    });
  }


  changeBoard(event) {
    this.boardService.changeBoard(event);
    this.Cards(event.target.value);
  }


  logout() {
    this.trelloAuthService.logout();
  }


  getDateDiff(date) {
    const diff = this.calculateService.getTimeDiff(date);

    if (diff === 1) {
      return ' 1 Day ago';
    }

    return diff + ' Days ago';
  }


  getDateFutur(date) {
    const futur = this.calculateService.getTimeFutur(date);

    if (futur === 1) {
      return '1 Day remaining';
    }

    return futur + ' Days remaining';
  }
}
