import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './views/form/form.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';

export { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'form', component: FormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
