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
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  employees: Employee[];
  Emp : Employee
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
      dept: ['Development'],
    });
  }

  onEditEmployee(emp:Employee){
    this.editMode = true;

    this.showModal = true;
    this.empForm.patchValue(emp);
  }

  onEmpSubmit() {
    if (this.empForm.valid) {



      if(this.editMode){
            

        this.empService.updateEmploye(this.empForm.value).subscribe(
          (res) => {
            console.log(res);
            this.getEmployees();
          },
          (err) => {
            console.log(err);
          }
        )


      }
      else{
        
        this.empService.registerEmployee(this.empForm.value).subscribe(
          (res) => {
            console.log(res);
            this.getEmployees();
            
  
          },
          (err) => {
            console.log(err);
          }
        )
      

      }
      this.onReset()
      this.onCloseModal()
      

     
    }
  }

  getEmployees() {
    this.empService.getEmployeeList().subscribe((res: Employee[]) => {
      console.log(res);
      this.employees = res;
    });
  }


  onReset(){
    this.empForm.reset({
      name: 'Ex. Alex Johnson',
      email:'Manish@gmail.com',
      position: 'Ex. Full Stack Developer',
      dept: 'Development'
    });
  }
  // resetForm(){
  //   this.empForm.reset();
  // }

  onAddemployee() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
    this.editMode=false;
    this.onReset()
  }

  onDeleteEmployee(id) {
    if (confirm('Do You Really wanted to delete this Employee ?.')) {
      this.empService.deleteEmployee(id).subscribe(
        (res) => {
          console.log("Deleted successfully");
          this.getEmployees();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
