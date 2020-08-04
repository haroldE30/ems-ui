import { PositionRoutingModule } from './position-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AddEditComponent, 
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PositionRoutingModule
  ]
})
export class PositionModule { }
