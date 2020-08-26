import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchlogRoutingModule } from './dispatchlog-routing.module';
import { DispatchlogComponent } from './dispatchlog.component';


@NgModule({
  declarations: [DispatchlogComponent],
  imports: [
    CommonModule,
    DispatchlogRoutingModule
  ]
})
export class DispatchlogModule { }
