import { Messages } from '@shared/messages.enum';
import { EmployeeService } from './../../core/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { first, filter } from 'rxjs/operators';
import { Employee } from '@core/models';
import { AlertService } from '@core/services';

@Component({
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  employees = null;
  messages = Messages;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(first())
      .subscribe(emps => this.employees = emps);
  }

  deleteEmployee(id: number) {
    const emp = this.employees.find((x:Employee) => x.id === id);
    emp.isDeleting = true;
    this.employeeService.delete(id)
      .pipe(first())
      .subscribe(
        res => {
          this.alertService.success('Employee deleted.', { autoClose: true, keepAfterRouteChange: true });
          this.employees = this.employees.filter((x:Employee) => x.id !== id);
        },
        error => {
          this.alertService.error(error, { autoClose: false, keepAfterRouteChange: true });
        }
      )
  }
}
