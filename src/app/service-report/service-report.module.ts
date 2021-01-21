import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SrRoutingModule } from './sr-routing.module';

import { AddComponent } from './add/add.component';
import { ReportComponent } from './report/report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [AddComponent, ReportComponent],
  imports: [
    CommonModule,
    SrRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ServiceReportModule { }
