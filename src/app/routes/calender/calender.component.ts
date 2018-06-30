import { Component, OnInit } from '@angular/core';
import {TrelloBoardService} from '../../services/trello-board.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  constructor(private boardService: TrelloBoardService) { }

  async ngOnInit() {

    this.boardService.getAllBoardIds();
  }

}
