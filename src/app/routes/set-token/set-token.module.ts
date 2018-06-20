import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetTokenComponent } from './set-token.component';
import { SetTokenRoutingModule} from './set-token-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SetTokenRoutingModule
  ],
  declarations: [SetTokenComponent]
})
export class SetTokenModule { }
