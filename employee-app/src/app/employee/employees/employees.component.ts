import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { EmployeeService } from "../services/employee.service";
import { Employee } from "../models/employee.model";
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-employees",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"],
})
export class EmployeesComponent {
  form: FormGroup;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "email",
    "position",
    "actions",
  ];
  isEditing = false;
  editingId: number | null = null;
  searchTerm: string = "";

  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private employeeService = inject(EmployeeService);

  constructor(
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      position: ["", Validators.required],
    });

    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredEmployees = this.employees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term)
    );
  }

  saveEmployee() {
    if (this.form.invalid) return;

    const employee = this.form.value as Employee;

    if (this.isEditing && this.editingId !== null) {
      this.employeeService
        .update(this.editingId, { id: this.editingId, ...employee })
        .subscribe(() => {
          this.snackBar.open("Employee updated", "", { duration: 2000 });
          this.cancelEdit();
          this.getEmployees();
        });
    } else {
      this.employeeService.create(employee).subscribe(() => {
        this.snackBar.open("Employee added", "", { duration: 2000 });
        this.form.reset();
        this.getEmployees();
      });
    }
  }

  editEmployee(emp: Employee) {
    this.isEditing = true;
    this.editingId = emp.id !== undefined ? emp.id : null;
    this.form.patchValue(emp);
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingId = null;
    this.form.reset();
  }

  deleteEmployee(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      data: "هل أنت متأكد من حذف هذا الموظف؟",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.delete(id).subscribe(() => {
          this.snackBar.open("Employee deleted", "", { duration: 2000 });
          this.getEmployees();
        });
      }
    });
  }
}
