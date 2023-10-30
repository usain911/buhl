import { Component, SimpleChanges } from '@angular/core';
import { ToBackendService} from '../service/to-backend.service'
import { User} from '../shared/user'
import Swal from 'sweetalert2'
import { EditUserComponent } from '../dialog/edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  spieler: User[] = []

  displayedColumns: string[] = ['name', 'birthDate', 'email', 'gender', 'edit'];
  dataSource = this.spieler

  constructor(
    private us: ToBackendService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.us.getAllSpieler().subscribe(res => {      
      this.spieler = res.users
    })
  }

  //Neuer User 
  //zunächst neuen User Instanzieren mit leeren werten und ohne ID
  //dann User an Dialog schicken
  // gibt Dialog true zurück -> Fenster neu laden. 
  // man könnte den User auch ins array puschen, ohne eine neue db Abfrage
  newUser() {
    const user = {
      firstName: "",
      lastName: "",
      birthDate: new Date(""),
      email: "",
      gender: ""
    }
    this.dialog.open(EditUserComponent, {
      data: user
    }).afterClosed().subscribe(res => {
      if(res) this.ngOnInit()      
    })    
  }

  //wie oben nur mit vorhandenem User
  editUser(user: User) {    
    this.dialog.open(EditUserComponent, {
      data: user
      }).afterClosed().subscribe(res => {
      if(res) this.ngOnInit()      
    }) 
  }

  //Confirm Window mit Sweetalert
  // ggf user löschen
  delUser(user: User) {
    Swal.fire({
      title: user.firstName +' ' + user.lastName + ' wirklich löschen?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.us.deleteSpieler(user.id!).subscribe(res => {
          if(res) {
            console.log(res);  
            Swal.fire('gespeichert!', '', 'success')          
          } 
        })        
      } else if (result.isDenied) {
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
