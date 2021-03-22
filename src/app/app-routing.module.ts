import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './views/form/form.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';

export { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mentor/6/home', component: HomeComponent },
  { path: 'mentor/6/student/:id', component: FormComponent},
  { path: '', redirectTo: 'mentor/6/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
