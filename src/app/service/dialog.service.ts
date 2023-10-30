import { Injectable } from '@angular/core';
import { MatDialog} from '@angular/material/dialog'
import { User, DataObject } from '../shared/user';
import { EditUserComponent } from '../dialog/edit-user/edit-user.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openEditSpieler(user: User) {
    this.dialog.open(EditUserComponent, {
      //width: '40rem',
      height: '32rem',
      disableClose: true,
      position: { top: "10px"},
      data:user
    })
  }
}
