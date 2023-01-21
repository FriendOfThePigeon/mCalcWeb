import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalcLineComponent } from './calc-line/calc-line.component';
import { CalcsListComponent } from './calcs-list/calcs-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalcLineSearchComponent } from './calc-line-search/calc-line-search.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcLineComponent,
    CalcsListComponent,
    MessagesComponent,
    DashboardComponent,
    CalcLineSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	AppRoutingModule,
	HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
