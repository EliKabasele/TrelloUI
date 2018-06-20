import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { WelcomePageRoutingModule} from './welcome-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WelcomePageRoutingModule
  ],
  declarations: [WelcomePageComponent]
})
export class WelcomePageModule { }
