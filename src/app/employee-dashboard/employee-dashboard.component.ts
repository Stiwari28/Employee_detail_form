import { Component, OnInit, resolveForwardRef } from '@angular/core';
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
  employeeData !: any;
  employeeModelObj: EmployeeModel= new EmployeeModel();
  showAdd !: boolean;
  showUpdate !: boolean;
 // role:string =""
  constructor(private api: ApiService,
    private formbuilder: FormBuilder){ }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name:[''],
      email :[''],
      mobile:[''],
      add:[''],
      salary:['']
    })
    this.getAllEmployee();
   // this.role = localStorage.getItem('userType')!
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

postEmployeeDetails(){
  this.employeeModelObj.name= this.formValue.value.name;
  this.employeeModelObj.email= this.formValue.value.email;
  this.employeeModelObj.mobile= this.formValue.value.mobile;
  this.employeeModelObj.add= this.formValue.value.add;
  this.employeeModelObj.salary= this.formValue.value.salary;

  this.api.PostEmployee(this.employeeModelObj)
  .subscribe(res => {
    console.log(res);
    alert("Employee Added Successfully")
    let ref= document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
  })
  }


getAllEmployee() {
  this.api.GetEmployee()
  .subscribe(res=>{
    this.employeeData = res;

  })
}
deleteEmployeeDetails(row:any ){
  this.api.DeleteEmployee(row.id )
  .subscribe(res=>{
    console.log(res);
    alert("Deleted Successfully");
    this.getAllEmployee();
  })
 }




 updateEmployeeDetails(){
  this.employeeModelObj.name= this.formValue.value.name;
  this.employeeModelObj.email= this.formValue.value.email;
  this.employeeModelObj.mobile= this.formValue.value.mobile;
  this.employeeModelObj.add= this.formValue.value.add;
  this.employeeModelObj.salary= this.formValue.value.salary;
 this.api.UpdateEmployee(this.employeeModelObj, this.employeeModelObj.id)
 .subscribe(res=>{
  console.log(res);
   alert("Updated Successfully");
   let ref = document.getElementById('close');
   ref?.click();
   this.formValue.reset();
   this.getAllEmployee();
 })
}
onEdit(row : any){
  this.employeeModelObj.id = row.id;
  this.formValue.controls['name'].setValue(row.name);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['add'].setValue(row.add);
  this.formValue.controls['salary'].setValue(row.salary);
  this.showUpdate = true;
  this.showAdd = false;
}

}
