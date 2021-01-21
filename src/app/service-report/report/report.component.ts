import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ServiceReportService } from 'src/app/service/service-report.service';
import { Router } from '@angular/router';
import { CalculateHours } from 'src/app/model/calculateWorkedHoursModel';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  constructor(private service: ServiceReportService, private route: Router) {
    this.findHoursForm = this.createFormGroup();
  }

  weekNumber: number[] = [];
  report: CalculateHours;
  findHoursForm: FormGroup;
  createFormGroup(): FormGroup {
    return new FormGroup({
      technicalId: new FormControl('', [Validators.required, Validators.minLength(1)]),
      weekNumber: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    for (let i = 1; i <= 53; i++) {
      this.weekNumber.push(i);
    }
  }

  findHours(): void {
    if (this.findHoursForm.valid) {
      this.service.getCalculatedHours(
        this.findHoursForm.get('technicalId').value, this.findHoursForm.get('weekNumber').value)
        .subscribe((res: CalculateHours) => {
          this.report = res;
          this.findHoursForm.reset();
        });
    } else {
      console.log('invalido');
    }
  }

  getTechnicalId(): AbstractControl { return this.findHoursForm.get('technicalId'); }
  getWeek(): AbstractControl { return this.findHoursForm.get('weekNumber'); }
}
