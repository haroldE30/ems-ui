import { EmployeeRoutingModule } from './employee-routing.module';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AddEditComponent, 
    ListComponent, ViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    AngularMyDatePickerModule
  ]
})
export class EmployeeModule { }
