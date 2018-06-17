import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TrelloService} from './trello.service';
import {TokenInterceptor} from './token-interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    TrelloService
  ]
})
export class TrelloApiModule { }
