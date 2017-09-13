import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KioNg2ComponentRoutingModule } from '../../../release/module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KioNg2ComponentRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
