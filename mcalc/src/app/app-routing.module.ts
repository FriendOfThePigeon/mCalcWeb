import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalcsListComponent } from './calcs-list/calcs-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalcLineComponent } from './calc-line/calc-line.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'calcs', component: CalcsListComponent },
	{ path: 'detail/:id', component: CalcLineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
