import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PrivateGuard} from '../../guards/private.guard';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: 'app',
    canActivate: [
      PrivateGuard
    ],
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
