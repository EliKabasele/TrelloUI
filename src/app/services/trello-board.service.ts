import { Injectable } from '@angular/core';
import {TrelloService} from '../common/trello-api/trello.service';
import {Observable} from 'rxjs/Observable';
import {Trello} from '../../trello';
import Boards = Trello.Boards;
import Cards = Trello.Cards;
import {isNull} from 'util';
import moment = require('moment');
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { map, switchMap} from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';



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
   * retrieves all board Ids,
   * then, call cardsArray(boardId), that returns ALL contained cards ( to be used as data Source for the calender)
   */
  getCardsArray(): Observable<any> {
    const eventsArray = [];

    return this.trello_api_service.getBoardsIds().pipe(
      switchMap((result: string[]) => {

        const observables = result.map(id =>
          Observable.combineLatest(Observable.of(id), this.getCards(id))
        );
        return Observable.combineLatest(observables);

      }),
      map((data: any[]) => {

        data.forEach((obj) => {
          eventsArray.push(obj[1]);
        });

        return eventsArray;
        })
    );
  }


  /**
   * retrieves Cards from a specific Board
   * then, combine all Cards's name & due date in Array
   * @param boardId
   */
  getCards(boardId: string): Observable<any> {

    let cardTitle;
    let cardDue;
    let card = {};

    return this.trello_api_service.getBoardCards(boardId).pipe(
      map( (cards: Cards[]) => {

       for (const item of cards) {
          if (item.name !== null) {

            cardTitle = item.name;
            cardDue = item.due;

            card = {
              title: cardTitle,
              start: cardDue
            };
            return card;
          }
        }
      }),
    );
  }


  /**
   * this method fetches a card and then uses the moment-module to check the card's due
   * @param {string} id
   * @returns {Observable<any>}
   */
  getCard(id: string): Observable<any> {
    return this.trello_api_service.getBoardCards(id).pipe(
      map( (res: Cards[]) => {
        const inspectedCard = res.filter( actual => !isNull(actual.due) && !actual.dueComplete);

        const overdueToday = inspectedCard.filter( a => moment(a.due).isSame(moment(), 'day'));
        const overdue = inspectedCard.filter( a => moment(a.due).isBefore(moment().hours(0).minutes(0).seconds(0)));
        const stillOpen = inspectedCard.filter( a => moment(a.due).isAfter(moment(), 'day'));

        return { overdue: overdue, overdueToday: overdueToday, stillOpen: stillOpen};
      }),
    );
  }

  getListFromBoard(boardId: string) {
    return this.trello_api_service.getBoardLists(boardId);
  }

}
