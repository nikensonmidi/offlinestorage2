import { Component, OnInit } from '@angular/core';
import { Dispatchlog } from '../models/dipatchlog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { DispatchlogService } from '../services/dispatchlog.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dispatchlog',
  templateUrl: './dispatchlog.component.html',
  styleUrls: ['./dispatchlog.component.css'],
})
export class DispatchlogComponent implements OnInit {
  dispatchLogs: Observable<Dispatchlog[]>;
  editingLog: Dispatchlog;
  columnDefs = [
    {headerName: 'Customer', field: 'customer' },
    {headerName: 'Sop', field: 'sop' },
    {headerName: 'Status', field: 'status'}
];


  constructor(
    private modalService: NgbModal,
    private dialog: MatDialog,
    private logservice: DispatchlogService
  ) {}

  ngOnInit() {
    this.dispatchLogs = this.logservice.dispatchLogs$
      .snapshotChanges()
      .pipe(map((actions) => actions.map((a) => a.payload.doc.data())));
  }

  generateDispatchlog(): void {
    // for (let index = 0; index < 100; index++) {
    //   const elem: Dispatchlog = {
    //     $key: index + '',
    //     customer: 'Alebar' + index,
    //     sop: 'Omhgher',
    //     status: 'pending',
    //   };
    //   this.dispatchLogs.push(elem);
    // }
  }
  addNewRecord(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const tempLog: Dispatchlog = {
      $key: '',
      customer: '',
      sop: '',
      status: '',
    };
    dialogConfig.data = tempLog;
    const dialogRef = this.dialog.open(DialogboxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      this.logservice.addLog(data);
    });
  }
  editRecord(record: Dispatchlog): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = record;
    const dialogRef = this.dialog.open(DialogboxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        record.customer = data.customer;
        record.sop = data.sop;
        record.status = data.status;
        this.logservice.editLog(record);
      }
    });
  }
  delete(record: Dispatchlog): void {
    this.logservice.delete(record);
  }
}
