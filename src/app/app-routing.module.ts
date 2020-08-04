import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const employeeModule = () => import('./employee/employee.module').then(x => x.EmployeeModule);
const positionModule = () => import('./position/position.module').then(x => x.PositionModule);
const departmentModule = () => import('./department/department.module').then(x => x.DepartmentModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', loadChildren: employeeModule },
  { path: 'positions', loadChildren: positionModule },
  { path: 'departments', loadChildren: departmentModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
