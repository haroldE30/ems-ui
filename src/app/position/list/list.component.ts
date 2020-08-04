import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PositionService, AlertService } from '@core/services';
import { Position } from '@core/models';
import { Messages } from '@shared/messages.enum';

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  positions = null;
  messages = Messages;

  constructor(
    private positionService: PositionService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.positionService.getAll()
      .pipe(first())
      .subscribe((data) => this.positions = data);
  }

  deletePosition(id: number) {
    const position = this.positions.find((x: Position) => x.id === id);
    position.isDeleting = true;
    this.positionService.delete(id)
      .pipe(first())
      .subscribe(
        res => {
          this.alertService.success('Position deleted.', { autoClose: true, keepAfterRouteChange: true });
          this.positions = this.positions.filter((x: Position) => x.id !== id)
        },
        error => {
          this.alertService.error(error, { autoClose: false, keepAfterRouteChange: true });
        }
      );
  }
}
