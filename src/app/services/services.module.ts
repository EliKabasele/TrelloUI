import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrelloBoardService} from './trello-board.service';
import {CalculateDateService} from './calculate-date.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [TrelloBoardService, CalculateDateService]
})
export class ServicesModule { }
