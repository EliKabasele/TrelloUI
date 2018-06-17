import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import {Trello} from '../../../trello';
import User = Trello.User;
import {Observable} from 'rxjs/Observable';
import Boards = Trello.Boards;
import {map} from 'rxjs/operators';
import Cards = Trello.Cards;

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

  constructor(private httpClient: HttpClient) { }


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
  getMemberBoards(): Observable<Boards[]> {
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
   * This method retrieves all Cards from a Board
   * @param {string} id
   * @returns {Observable<Trello.Cards[]>}
   */
  getBoardCards(id: string): Observable<Cards[]> {
    return this.httpClient.get<Cards[]>(this.allBoards + id + this.boardCard_url);
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
