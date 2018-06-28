import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Trello} from '../../../trello';
import Boards = Trello.Boards;
import {TrelloService} from '../../common/trello-api/trello.service';
import {TrelloBoardService} from '../../services/trello-board.service';


@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  public createBoardForm: FormGroup;
  public board: Boards;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private trelloService: TrelloService,
              private boardService: TrelloBoardService) { }

  ngOnInit() {
    this.createBoardForm = this.formBuilder.group( {
      boardName: ['', Validators.required]
    });

  }

  createBoard(createBoardForm: FormGroup) {

    const boardName = createBoardForm.value.boardName ;
    console.log(boardName);

    this.trelloService.createBoard(boardName).subscribe(res => {
      console.log(res);
    });

    this.router.navigate(['/app']);
  }

}
