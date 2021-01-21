import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'add', component: AddComponent },
      { path: 'report', component: ReportComponent },
      { path: '**', redirectTo: 'add' }
    ]
  }

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SrRoutingModule { }
