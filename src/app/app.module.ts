import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TrelloApiModule } from './common/trello-api/trello-api.module';
import { TrelloAuthModule } from './common/trello-auth/trello-auth.module';
import { DashboardModule } from './routes/dashboard/dashboard.module';
import { SetTokenModule } from './routes/set-token/set-token.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TrelloApiModule,
    TrelloAuthModule,
    DashboardModule,
    SetTokenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
