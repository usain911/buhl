import { Component, Inject } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToBackendService } from 'src/app/service/to-backend.service';
import { User } from 'src/app/shared/user';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})


export class EditUserComponent {

  form = this.fb.group({
    firstName: [this.user.firstName, Validators.required],
    lastName:  [this.user.lastName, Validators.required],
    email:  [this.user.email, [Validators.email, Validators.required]],
    birthDate:  [this.user.birthDate, [Validators.required]],
    gender: [this.user.gender, Validators.required]
  });

  submitted = false;
  constructor(@Inject(MAT_DIALOG_DATA) public user: User,
  public dialogRef: MatDialogRef<EditUserComponent>,
  private us: ToBackendService,
  private fb: FormBuilder) { }

  ngOnInit() {
  }


 save() {   
    const user = {
      ...this.form,
      id: this.user.id
    } 
    if(!this.form.valid) {
      console.log("fehler bei der Eingabe");      
    } else {
      // validate User
      //Bei einem vorhandenem User mit userId
      if(user.id) {        
        console.log("alt");
        
        this.us.updateUser(this.user).subscribe(res => {
          //console.log(res);
          if(res) {
            console.log(res);   
            this.closeDialog(true)          }
        })
      } else {
        console.log("neu");
        
        //Bei einem neuem User ohne userId
        this.us.newUser(this.user).subscribe(res => {
          if(res) {
            console.log(res);
            this.closeDialog(true)
          }          
        })
      }      
    }    
  }

  closeDialog(status: boolean): any {
    this.dialogRef.close(status);
  }
}
