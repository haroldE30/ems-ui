import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ProjectRoutingModule } from './project-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ListComponent, 
    ViewComponent, 
    AddEditComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
