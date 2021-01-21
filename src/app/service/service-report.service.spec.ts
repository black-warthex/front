import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CalculateHours } from '../model/calculateWorkedHoursModel';
import { TechnicalReport } from '../model/technicalReportModel';
import { ServiceReportService } from './service-report.service';
describe('Unit Test Service', () => {

  let httpTestingController: HttpTestingController;
  let service: ServiceReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceReportService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ServiceReportService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  describe('test calculate hours worked', () => {

    it('returned calculate hours worked find by technical and number week from api via get', () => {

      const technicalId = 'WTX-1';
      const weekNumber = 3;
      const calculateHours: CalculateHours =
      {
        baseSalary: 960.0,
        hourlyPrice: 4.0,
        normalWorkingHours: 26.0,
        normalOvertimeWorked: 0.0,
        workingNightHours: 22.0,
        overnigthHoursWorked: 22.08,
        sundayWorkingHours: 0.0,
        sundayOvertimeWork: 1.0,
        normalHours: 104.0,
        nightHours: 118.8,
        sundayHours: 0.0,
        normalExtraHours: 0.0,
        nightlyOvertime: 154.56,
        sundayExtraHours: 8.0,
        finalSalary: 385.36
      };

      service.getCalculatedHours(technicalId, weekNumber).subscribe(data => {
        expect(calculateHours).toEqual(data);
      });

      const request = httpTestingController.expectOne('http://localhost:8080/serviceReport/report?technicalId=WTX-1&weekNumber=3');
      expect(request.request.method).toBe('GET');
      request.flush(calculateHours);
    });

  });


  describe('test add service report', () => {
    it('returned observable with request post', () => {
      const report: TechnicalReport = {
        technicalId: 'WTX-1',
        serviceId: 'service-01',
        startDateTime: '2021-01-20T07:00',
        endDateTime: '2021-01-20T20:00'
      };

      service.addReport(report).subscribe(res => {
        expect(report).toEqual(res);
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/serviceReport/add'
      );

      expect(request.request.method).toBe('POST');

      request.flush(report);

    });
  });

});
