import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Trello} from '../../../trello';
import Cards = Trello.Cards;
import Boards = Trello.Boards;
import Lists = Trello.Lists;
import moment = require('moment');
import {TrelloService} from '../../common/trello-api/trello.service';
import {TrelloBoardService} from '../../services/trello-board.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  public card: Cards;
  public boards: Boards[] = [];
  public lists: Lists[] = [];
  public createCardForm: FormGroup;


  constructor( private formBuilder: FormBuilder,
               private trelloService: TrelloService,
               private boardService: TrelloBoardService,
               private router: Router) { }

  ngOnInit() {
    this.createCardForm = this.formBuilder.group( {

      cardTitle: [this.card ? this.card.name : '', Validators.required],
      cardDsc: [this.card &&  this.card.desc ? this.card : ''],
      due: [this.card && this.card.due ? this.card.due : new Date(), []],
      dueDate: [this.card && this.card.due ? this.card.due : new Date(), []],
      dueTime: [this.card && this.card.due ? this.card.due : moment().format('HH:mm'), []],
      idBoard: [this.card && this.card.idBoard ? this.card.idBoard : null, [Validators.required]],
      idList: [this.card && this.card.idList ? this.card.idList : null, [Validators.required]]

    });

    this.boardService.getBoardList().subscribe(
      res => this.boards = res
    );



    this.createCardForm.get('idBoard').valueChanges.subscribe(boardId => {

      this.lists = [];
      this.createCardForm.get('idList').setValue(null);

      this.boardService.getListFromBoard(boardId).subscribe(
        success => console.log(success),
        error => this.lists = []
      );
    });

  }

  createCard(createCardForm: FormGroup) {

   const T = createCardForm.value.due = moment( moment(createCardForm.value.dueDate).format('YYY-MM-DD') + 'T' + createCardForm.value.dueTime, moment.ISO_8601);


    this.router.navigate(['/app']);
  }

}


