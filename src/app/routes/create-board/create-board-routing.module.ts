import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PrivateGuard} from '../../guards/private.guard';
import {CreateBoardComponent} from './create-board.component';

const routes: Routes = [
  {
    path: 'create-board',
    canActivate: [PrivateGuard],
    children: [
      {
        path: '',
        component: CreateBoardComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class CreateBoardRoutingModule { }
