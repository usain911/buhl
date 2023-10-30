import { Component } from '@angular/core';
import { ToBackendService} from '../service/to-backend.service'
import { User} from '../shared/user'
import { DialogService } from '../service/dialog.service';
import Swal from 'sweetalert2'
import { firstValueFrom } from 'rxjs';


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
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.us.getAllSpieler().subscribe(res => {      
      this.spieler = res.users
    })
  }

  newUser() {
    let user = {
      firstName: "",
      lastName: "",
      birthDate: new Date(""),
      email: "",
      gender: ""
    }
    this.dialog.openEditSpieler(user)
  }

  async editUser(user: User) {
    this.dialog.openEditSpieler(user)  
  }



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
