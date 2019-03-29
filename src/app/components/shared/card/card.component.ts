import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UachService } from '../../../services/uach.service';

export interface DialogData {
  item: any;
  isExpired: boolean;
}


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // Test
  item: any;

  @Input() items: any = [];
  @Input() isExp: boolean;

  constructor(private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private uach: UachService,
    
    ) {

    }

  ngOnInit() {
  }

  openDialog(it: any, expired: boolean): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      minWidth: 300,
      data: {item: it, isExpired: expired}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.item = result;
        this.openSnackBar(this.item.practice.name, this.item.user.name, this.item._id);
      }
    });
  }

  openSnackBar(message: string, user: string, id: string, action?: string) {
    message = `Orden ${message} de ${user} lista.`;
    action = 'UNDO';

    this.uach.orderReady(id).subscribe( (data: any) =>{
      if (data) {
        
        this.snackBar.open(message, action, {
          duration: 5000,
        });
      } else {
        message = 'Error al completar orden.';
        this.snackBar.open(message, action, {
          duration: 5000,
        });
      }
    });
  }

  openDeleteBar( id: string, practice: string, user: string , builder?: string ) {
    builder = `Orden ${practice} del alumno ${user} ha sido borrada con éxito.`;
    let action = 'UNDO';

    this.uach.deleteOrder(id).subscribe( (data: any) => {
      if (data) {
        
        this.snackBar.open(builder, action, {
          duration: 5000,
        });
      } else {
        builder = 'Error al borrar la orden.';
        this.snackBar.open(builder, action, {
          duration: 5000,
        });
      }
    });
  }
}


@Component({
  selector: 'app-dialog',
  templateUrl: '../app-dialog.html',
  styleUrls:  ['./card.component.css'],
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
