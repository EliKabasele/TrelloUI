import { Injectable } from '@angular/core';
import {TrelloService} from '../common/trello-api/trello.service';
import {Observable} from 'rxjs/Observable';
import {Trello} from '../../trello';
import Boards = Trello.Boards;
import {map, tap} from 'rxjs/operators';
import Cards = Trello.Cards;
import {isNull} from 'util';
import moment = require('moment');

@Injectable()
export class TrelloBoardService {

  trelloUser;
  overdueCards: Array<any> = [];
  overdueTodayCards: Array<any> = [];
  stillOpenCards: Array<any> = [];

  cardsDone = false;

  constructor(private trello_api_service: TrelloService) { }


  /**
   * This method fetches the trello User
   * @param user
   */
  fetchTrUser(user) {
    this.trelloUser = user;
  }


  /**
   * This method fetches all the boards of the user
   * @returns {Observable<Trello.Boards[]>}
   */
  getBoardList() {
    return this.trello_api_service.getBoards();
  }

  changeBoard(event) {
    this.cardsDone = false;
    this.overdueCards = [];
    this.overdueTodayCards = [];
    this.stillOpenCards = [];
  }


  /**
   * This method fetches the first board from the list of board
   * @returns {Observable<Trello.Boards>}
   */
  firstBoard(): Observable<Boards> {
    return this.getBoardList().pipe( map(res => res[0]));
  }


  /**
   * this method fetches a card and then uses the moment-module to check the card's due
   * @param {string} id
   * @returns {Observable<any>}
   */
  getCard(id: string) {
    return this.trello_api_service.getBoardCards(id).pipe(
      map( (res: Cards[]) => {
        const inspectedCard = res.filter( actual => !isNull(actual.due) && !actual.dueComplete);

        const overdueToday = inspectedCard.filter( a => moment(a.due).isSame(moment(), 'day'));
        const overdue = inspectedCard.filter( a => moment(a.due).isBefore(moment().hours(0).minutes(0).seconds(0)));
        const stillOpen = inspectedCard.filter( a => moment(a.due).isAfter(moment(), 'day'));

        return { overdue: overdue, overdueToday: overdueToday, stillOpen: stillOpen};
      }),
      tap(res => console.log(`Fetched Cards from Board with Id: ${id}`, res))
    );
  }

  getListFromBoard(boardId: string) {
    return this.trello_api_service.getBoardLists(boardId);
  }

}
