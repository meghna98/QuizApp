import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackbar: MatSnackBar) {}
  plus:boolean = false 
  sub: boolean = false
  mult: boolean = false
  div: boolean = false 
  onNoClick():void{
    this.dialogRef.close();
  }
  onOkClick(): void {
    if(this.data.max<this.data.min)
      this._snackbar.open("Max value should be greater than min value","" , {"duration": 2000});
      else{
    let selectedOperators = []
    if(this.plus==true)
      selectedOperators.push("+")
    if(this.sub==true)
    selectedOperators.push("-")
    if(this.mult==true)
    selectedOperators.push("*")
    if(this.div==true)
    selectedOperators.push("/")
    if(selectedOperators.length!=0){
      this.data.operators = selectedOperators
      this.dialogRef.close(this.data);
    }
    else{
      this._snackbar.open("Select atleast one operator","" , {"duration": 2000});
    }
  }
  }
  ngOnInit(): void {
    this.data.operators.forEach(operator => {
      if(operator=="+")
      this.plus = true
      if(operator=="-")
      this.sub = true
      if(operator=="*")
      this.mult = true
      if(operator=="/")
      this.div = true
    });
  }

}
