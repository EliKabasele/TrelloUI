import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalenderRoutingModule} from './calender-routing.module';
import { CalenderComponent } from './calender.component';

@NgModule({
  imports: [
    CommonModule,
    CalenderRoutingModule
  ],
  declarations: [CalenderComponent]
})
export class CalenderModule { }
