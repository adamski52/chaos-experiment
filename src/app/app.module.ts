import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {FlickerComponent} from "./components/flicker.component";
import {HomeComponent} from "./components/home.component";
import {RandomImage} from "./services/random-image.service";
import {Utilities} from "./services/utilities.service";

@NgModule({
  declarations: [
    AppComponent,
    FlickerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    RandomImage,
    Utilities
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
