import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateCardComponent} from './create-card.component';
import {PrivateGuard} from '../../guards/private.guard';

const routes: Routes = [
  {
    path: 'create-card',
    canActivate: [PrivateGuard],
    children: [
      {
        path: '',
        component: CreateCardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCardRoutingModule { }
