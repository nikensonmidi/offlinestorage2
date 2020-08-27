import { Component, OnInit, ViewChild } from '@angular/core';
import { Dispatchlog } from '../models/dipatchlog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { DispatchlogService } from '../services/dispatchlog.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AgGridColumn } from 'ag-grid-angular';

@Component({
  selector: 'app-dispatchlog',
  templateUrl: './dispatchlog.component.html',
  styleUrls: ['./dispatchlog.component.css'],
})
export class DispatchlogComponent implements OnInit {
  dispatchLogs: Observable<Dispatchlog[]>;
  editingLog: Dispatchlog;
  style;
  gridApi;
  gridColumnApi;
  rowSelection: string;
  private _columnDefs = [
    {
      headerName: 'Customer',
      sortable: true,
      resizable: true,
      field: 'customer',
    },
    { headerName: 'Sop', sortable: true, resizable: true, field: 'sop' },
    { headerName: 'Status', sortable: true, resizable: true, field: 'status' },
  ];
  public get columnDefs() {
    return this._columnDefs;
  }
  public set columnDefs(value) {
    this._columnDefs = value;
  }
  @ViewChild('loggrid') logGrid;

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

  setWidthAndHeight(width, height) {
    this.style = {
      marginTop: '20px',
      width,
      height,
    };
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowSelection = 'single';
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });

    params.api.sizeColumnsToFit();
  }
  onSelectionChanged(event: any) {
    const selectedRowObj: any = this.gridApi.getSelectedRows();
    const selectedRow = selectedRowObj ? selectedRowObj[0] as Dispatchlog : {}as Dispatchlog;
    this.editRecord(selectedRow);

    // console.log(this.gridColumnApi);
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

      if (data && !data.deleted) {
        record.customer = data.customer;
        record.sop = data.sop;
        record.status = data.status;
        this.logservice.editLog(record);
      }
      if( data && data.deleted ) {
        record.customer = data.customer;
        record.sop = data.sop;
        record.status = data.status;
        this.delete(record);
      }
    });
  }
  delete(record: Dispatchlog): void {
    this.logservice.delete(record);
  }
}
