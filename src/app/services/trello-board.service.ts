import { Injectable } from '@angular/core';
import {TrelloService} from '../common/trello-api/trello.service';
import {Observable} from 'rxjs/Observable';
import {Trello} from '../../trello';
import Boards = Trello.Boards;
import {catchError, map, tap} from 'rxjs/operators';
import Cards = Trello.Cards;
import {isNull} from 'util';
import moment = require('moment');
import {of} from 'rxjs/observable/of';

@Injectable()
export class TrelloBoardService {

  trelloUser;
  overdueCards: Array<any> = [];
  overdueTodayCards: Array<any> = [];
  stillOpenCards: Array<any> = [];
  SourceData = {};
  ids = [];


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
   * retrieves all board Ids,
   * then, call cardsArray-method, that return ALL contained cards ( to be used as data Source for the calender)
   */
  getAllBoardIds() {

    // retrieves ONLY Ids from the Board-list
     return this.getBoardList().subscribe( res => {
      // this.ids = [];
      for (let i = 0; i < res.length; i++) {
        this.ids.push( res[i][0]);
      }

      // use each of these Ids to retrieve all Cards
      for (let j = 0; j < this.ids.length; j++) {
        this.cardsArray(this.ids[j]);
      }
       // console.log(this.ids);
    });
  }

  /**
   * retrieves Cards from a specific Board
   * then, compile all Cards name $ Cards due date in Array
   * @param boardId
   */

  cardsArray(boardId) {

    this.getCard(boardId).subscribe( res => {


      const overdue_cards = res.overdue;
      const dueToday_cards = res.overdueToday;
      const stillOpen_cards = res.stillOpen;

      const overdue_due_stillOpen_cards = [];

      overdue_due_stillOpen_cards.push(overdue_cards, dueToday_cards, stillOpen_cards);

      for (let i = 0; i < overdue_due_stillOpen_cards.length; i++) {
        const cards = overdue_due_stillOpen_cards[i];

        for (let k = 0; k < cards.length ; k++) {

          const allCardsTitle = cards[k].name;
          const allCardsDue = cards[k].due;

          this.SourceData  = {
            title: allCardsTitle,
            start: allCardsDue
          };

          console.log(this.SourceData);
        }
      }
    });
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
     // tap(res => console.log(`Fetched Cards from Board with Id: ${id}`, res))
    );
  }

  getListFromBoard(boardId: string) {
    return this.trello_api_service.getBoardLists(boardId);
  }

}
