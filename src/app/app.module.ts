import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TrelloApiModule } from './common/trello-api/trello-api.module';
import { TrelloAuthModule } from './common/trello-auth/trello-auth.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TrelloApiModule,
    TrelloAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
