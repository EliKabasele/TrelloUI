import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateBoardRoutingModule} from './create-board-routing.module';
import { CreateBoardComponent } from './create-board.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateBoardRoutingModule
  ],
  declarations: [CreateBoardComponent]
})
export class CreateBoardModule { }
