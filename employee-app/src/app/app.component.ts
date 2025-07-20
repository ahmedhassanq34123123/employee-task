import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from "./employee/employees/employees.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, EmployeesComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
