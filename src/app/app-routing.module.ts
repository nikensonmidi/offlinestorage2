import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'home' , pathMatch: 'full'},
  { path: 'dispatchlog', loadChildren: () => import('./dispatchlog/dispatchlog.module').then(m => m.DispatchlogModule) },
{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
