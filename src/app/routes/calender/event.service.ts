import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {TrelloBoardService} from '../../services/trello-board.service';
import {map, tap} from 'rxjs/operators';






@Injectable()
export class EventService {

  constructor(private  boardService: TrelloBoardService) { }

  public getEvents(): Observable<any> {
    let data$: Array<any>;

    return this.boardService.getCardsArray().pipe(
      tap(res => console.log(res)),
      map(data => {
        data$ = data;
        return data$;

      })
    );
  }

}
