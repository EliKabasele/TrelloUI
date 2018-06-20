import { NgModule } from '@angular/core';

import { SetTokenComponent} from './set-token.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'set-token',
    component: SetTokenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetTokenRoutingModule {}
