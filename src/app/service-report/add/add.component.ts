import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceReportService } from 'src/app/service/service-report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  reportForm: FormGroup;
  createFormGroup(): FormGroup {
    return new FormGroup({
      technicalId: new FormControl('', [Validators.required, Validators.minLength(1)]),
      serviceId: new FormControl('', [Validators.required, Validators.minLength(1)]),
      startDateTime: new FormControl('', [Validators.required, Validators.minLength(1)]),
      endDateTime: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  constructor(private router: Router, private service: ServiceReportService) {
    this.reportForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  addReport(): void {
    this.service.addReport(this.reportForm.value)
      .subscribe(
        response => {
          const res = Object.values(response);
          if (res[1] === 'successful insert') {
            Swal.fire({
              icon: 'success',
              title: 'success!',
              text: 'service report added successfully',
            });
            this.reportForm.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'error!',
              text: '' + res[1],
            });
          }
        },
        error => {
          console.log(error);
        });
  }

  getTechnicalId(): AbstractControl { return this.reportForm.get('technicalId'); }
  getServiceId(): AbstractControl { return this.reportForm.get('serviceId'); }
  getStartDateTime(): AbstractControl { return this.reportForm.get('startDateTime'); }
  getEndDateTime(): AbstractControl { return this.reportForm.get('endDateTime'); }

}
