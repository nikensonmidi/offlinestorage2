import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dispatchlog } from '../models/dipatchlog';
import { database } from 'firebase';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css'],
})
export class DialogboxComponent implements OnInit {
  record: Dispatchlog;
  form: FormGroup;
  customer: string;
  sop: string;
  status: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.record = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      customer: [this.record.customer, []],
      sop: [this.record.sop, []],
      status: [this.record.status, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
