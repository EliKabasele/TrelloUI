import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Trello} from '../../../trello';
import User = Trello.User;
import {Observable} from 'rxjs/Observable';
import Boards = Trello.Boards;
import {catchError, map, tap} from 'rxjs/operators';
import Cards = Trello.Cards;
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable()
export class TrelloService {

  /**
   * General URLs for member/me, member-Boards, Boards, Cards
   * @type {string}
   */
  public memberMe_url = 'https://api.trello.com/1/members/me';
  public myBoards_url = 'https://api.trello.com/1/members/me/boards';
  public allBoards = 'https://api.trello.com/1/boards/';
  public allCards = 'https://api.trello.com/1/cards/';
  public boardCard_url = '/cards';
  public boardList_url = '/lists';

  constructor(private httpClient: HttpClient) { }

  /**
   * This method handles Request errors
   * @param {string} operation
   * @param {T} result
   * @returns {(error: any) => Observable<T>}
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error, `Operation: ${operation}`);

      return of(result as T);
    };
  }

  /**
   * This method retrieves a Trello user
   * @returns {Promise<Trello.User>}
   */
  async getMemberMe(): Promise<User> {
    return this.httpClient.get<User>(this.memberMe_url).toPromise();
  }


  /**
   * This method retrieves all user Boards
   * @returns {Observable<Trello.Boards[]>}
   */
  getBoards(): Observable<Boards[]> {
    return this.httpClient.get<Boards[]>(this.myBoards_url)
      .pipe(map( res => {
        const data = [];
        for (let i = 0; i < res.length; i++) {
          data.push( [res[i].id, res[i].name]);
        }

        return data;
      }));
  }


  /**
   * This method create a new Board
   * @param {string} boardName
   * @returns {Observable<Trello.Boards>}
   */
  createBoard(boardName: string): Observable<Boards> {
    return this.httpClient.post<Boards>(this.allBoards + `?name=${boardName}`,  httpOptions).pipe(
      tap((res: Boards) => console.log(`Added Board: ${res.name}`)),
      catchError(this.handleError<any>('createMemberBoard'))
    );

  }

  getBoardList(listId: string): Observable<any> {
    return this.httpClient.get(this.allBoards + listId + this.boardList_url).pipe(
      tap(res => console.log(`Fetched List with Id: ${listId}`, res)),
      catchError(this.handleError<any>('getBoardList'))
    );
  }




  /**
   * This method retrieves all Cards from a Board
   * @param {string} id
   * @returns {Observable<Trello.Cards[]>}
   */
  getBoardCards(cardId: string): Observable<Cards[]> {
    return this.httpClient.get<Cards[]>(this.allBoards + cardId + this.boardCard_url);
  }

  createBoardCard() {

  }


  /**
   * This method retrieves all comment-cards
   * @param id
   * @returns {Observable<any>}
   */
  getCommentCards(id): Observable<any> {
    return this.httpClient.get(this.allCards + id + '(actions?filter=commentCard');
  }

}
