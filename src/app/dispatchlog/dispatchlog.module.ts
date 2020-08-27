import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchlogRoutingModule } from './dispatchlog-routing.module';
import { DispatchlogComponent } from './dispatchlog.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [DispatchlogComponent],
  imports: [
    CommonModule,
    DispatchlogRoutingModule,
    AgGridModule.withComponents([])

  ]
})
export class DispatchlogModule { }
