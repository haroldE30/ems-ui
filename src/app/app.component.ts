import { Component } from '@angular/core';

import * as $ from 'jquery';
import { Messages } from '@shared/messages.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management System';
  messages = Messages;

  ngOnInit() {
    $("#hide-sidebar").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $("#menu-toggle").show();
    });
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $("#menu-toggle").hide();
    });
  }

}
