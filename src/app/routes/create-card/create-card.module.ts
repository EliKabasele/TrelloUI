import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCardComponent } from './create-card.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateCardRoutingModule} from './create-card-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateCardRoutingModule
  ],
  declarations: [CreateCardComponent]
})
export class CreateCardModule { }
