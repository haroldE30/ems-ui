import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@core/services';
import { Employee } from '@core/models';
import { Messages } from '@shared/messages.enum';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  employee: Employee = null;
  id: number;
  messages = Messages;

  constructor(
    private employeeService: EmployeeService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getById(this.id)
      .subscribe(
        data => this.employee = data
      );
  }

}
