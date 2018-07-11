import { Component, OnInit, ViewChild} from '@angular/core';
import {TrelloBoardService} from '../../services/trello-board.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options} from 'fullcalendar';
import {EventService} from './event.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class MyCalenderComponent implements OnInit {

  calenderOptions: Options;
  displayEvent: any;
  @ViewChild( CalendarComponent) ucCalender: CalendarComponent;



  constructor(private boardService: TrelloBoardService,
              protected eventService: EventService,
              private router: Router) { }

  async ngOnInit() {

    this.eventService.getEvents().subscribe(data => {
      // debugger;
      this.calenderOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: data
      };
    });

  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        START: model.event.start,
        TITLE: model.event.title,
      },
    };
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

  goBack() {
    this.router.navigate(['/app']);
  }

}
