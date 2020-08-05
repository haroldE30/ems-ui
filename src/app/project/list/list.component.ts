import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@core/services';
import { Project } from '@core/models';
import { Messages } from '@shared/messages.enum';

@Component({
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  projects = null;
  messages = Messages;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getAll()
      .pipe(first())  
      .subscribe(data => this.projects = data);
  }

  deleteProject(id: number) {
    const project = this.projects.find((x: Project) => x.id === id);
    project.isDeleting = true;
  }
}
