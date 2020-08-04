import { AlertService } from './../../core/services/alert.service';
import { DepartmentService } from './../../core/services/department.service';
import { Component, OnInit } from '@angular/core';
import { Department } from '@core/models';
import { Messages } from '@shared/messages.enum';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  departments = null;
  messages = Messages;

  constructor(
    private departmentService: DepartmentService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.departmentService.getAll()
      .subscribe(
        (deps) => this.departments = deps
        );
  }

  deleteDepartment(id: number) {
    const department = this.departments.find((x: Department) => x.id === id);
    department.isDeleting = true;
    this.departmentService.delete(id)
      .subscribe(
        res => {
          this.alertService.success('Department deleted.', {autoClose: true, keepAfterRouteChange: true});
          this.departments = this.departments.filter((x: Department) => x.id !== id);
        },
        error => {
          this.alertService.error(error, { autoClose: false, keepAfterRouteChange: true });
        }
      );
  }
}
