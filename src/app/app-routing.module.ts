import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicTrendingComponent } from './dashboard/public/public-trending/public-trending.component';
import { PublicBloodlineComponent } from './dashboard/public/public-bloodline/public-bloodline.component';
import { PublicAllComponent } from './dashboard/public/public-all/public-all.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, children: [
    //{path: '', redirectTo: '/trending'},
    {path: 'trending', component: PublicTrendingComponent},
    {path: 'bloodline', component: PublicBloodlineComponent},
    {path: 'all', component: PublicAllComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
