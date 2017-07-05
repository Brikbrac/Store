import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from '../modules/dashboard/dashboard.component';
import { flowerComponent } from "../modules/flower/flower.component";
//import { HeroesComponent }      from './heroes.component';
//import { HeroDetailComponent }  from './hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'product/:id', component: flowerComponent },
 // { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash:true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}