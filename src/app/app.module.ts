import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Project-modules
import { TrelloApiModule } from './common/trello-api/trello-api.module';
import { TrelloAuthModule } from './common/trello-auth/trello-auth.module';
import { DashboardModule } from './routes/dashboard/dashboard.module';
import { SetTokenModule } from './routes/set-token/set-token.module';
import { WelcomePageModule } from './routes/welcome-page/welcome-page.module';

// Project-service-providers
import {PublicGuard} from './guards/public.guard';
import {PrivateGuard} from './guards/private.guard';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './/app-routing.module';
import { ServicesModule } from './services/services.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    TrelloApiModule,
    TrelloAuthModule,
    DashboardModule,
    SetTokenModule,
    WelcomePageModule,
    ServicesModule,
  ],
  providers: [
    PublicGuard,
    PrivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
