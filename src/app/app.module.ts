import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminHomeComponent } from './views/admin-home/admin-home.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EvaluationCardComponent } from './components/evaluation-card/evaluation-card.component';
import { FormComponent } from './views/form/form.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { IdentificationComponent } from './views/identification/identification.component';
import { MaterialModule } from './material/material.module';
import { MentorAdditionComponent } from './components/mentor-addition/mentor-addition.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { StudentAdditionComponent } from './components/student-addition/student-addition.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    NavbarComponent,
    EvaluationCardComponent,
    IdentificationComponent,
    AdminHomeComponent,
    AdminNavbarComponent,
    MentorAdditionComponent,
    StudentAdditionComponent,

  ],
  entryComponents: [EvaluationCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
