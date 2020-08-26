import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispatchlogComponent } from './dispatchlog.component';

const routes: Routes = [{ path: '', component: DispatchlogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispatchlogRoutingModule { }
