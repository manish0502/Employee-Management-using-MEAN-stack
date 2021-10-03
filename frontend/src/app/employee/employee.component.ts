import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  employees: Employee[];

  constructor(private fb: FormBuilder, private empService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();

    this.createForm();
  }

  createForm() {
    this.empForm = this.fb.group({
      _id: [''],
      name: ['Ex. Manish Giri', Validators.required],
      email: ['Ex. Manish@gmail.com', Validators.required],
      position: ['Ex. Full stack developer', Validators.required],
      dept: ['Ex. Development'],
    });
  }

  onEmpSubmit() {
    if (this.empForm.valid) {
      //console.log(this.empForm.value);

      this.empService.registerEmployee(this.empForm.value).subscribe(
        (res) => {
          console.log(res);
          this.getEmployees();
        },
        (err) => {
          console.log(err);
        }
      );

      if (this.editMode) {
      } else {
      }
    }
  }

  getEmployees() {
    this.empService.getEmployeeList().subscribe((res: Employee[]) => {
      console.log(res);
      this.employees = res;
    });
  }

  onAddemployee() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }

  onDeleteEmployee(id) {
    if (confirm('Do You want to delete this Employee?.')) {
      this.empService.deleteEmployee(id).subscribe(
        (res) => {
          console.log(res);
          this.getEmployees();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
