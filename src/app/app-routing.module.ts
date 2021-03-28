import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './views/form/form.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import {IdentificationComponent} from './views/identification/identification.component';
import {AdminHomeComponent} from './views/admin-home/admin-home.component';

export { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mentor/:mentorId/home', component: HomeComponent },
  { path: 'mentor/:mentorId/student/:id', component: FormComponent},
  { path: 'admin/home', component: AdminHomeComponent},
  { path: '', component: IdentificationComponent},
  // { path: '', redirectTo: 'identification', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
