import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalenderRoutingModule} from './calender-routing.module';
import { MyCalenderComponent } from './calender.component';

import { FullCalendarModule } from 'ng-fullcalendar';
import {FormsModule} from '@angular/forms';
import {EventService} from './event.service';

@NgModule({
  imports: [
    CommonModule,
    CalenderRoutingModule,
    FullCalendarModule,
    FormsModule
  ],
  declarations: [MyCalenderComponent],
  providers: [EventService]
})
export class CalenderModule { }
