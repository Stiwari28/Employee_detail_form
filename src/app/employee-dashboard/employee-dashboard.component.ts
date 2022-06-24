import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModelObj: EmployeeModel= new EmployeeModel();

  constructor(private formbuilder: FormBuilder ,
    private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name:[''],
      email :[''],
      mobile:[''],
      add:[''],
      salary:['']
    })
  }
postEmployeeDetails(){
  this.employeeModelObj.name= this.formValue.value.name;
  this.employeeModelObj.email= this.formValue.value.email;
  this.employeeModelObj.mobile= this.formValue.value.mobile;
  this.employeeModelObj.add= this.formValue.value.add;
  this.employeeModelObj.salary= this.formValue.value.salary;

  this.api.postEmployee(this.employeeModelObj)
  .subscribe(
    res=>{
      console.log(res);
      alert("Employee Added Successfully");
    },
   err=> {
    alert("Something went wrong");
  }
    )

}
}


function res(res: any) {
  throw new Error('Function not implemented.');
}

