import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  private apiEmployeeUrl = environment.apiUrl + "employee";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiEmployeeUrl);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiEmployeeUrl}/${id}`);
  }

  create(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiEmployeeUrl, emp);
  }

  update(id: number, emp: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiEmployeeUrl}/${id}`, emp);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiEmployeeUrl}/${id}`);
  }
}
