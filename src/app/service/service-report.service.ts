import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TechnicalReport } from '../model/technicalReportModel';
import { CalculateHours } from '../model/calculateWorkedHoursModel';

@Injectable({
  providedIn: 'root'
})
export class ServiceReportService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/serviceReport/';


  addReport(report: TechnicalReport): Observable<TechnicalReport> {
    return this.http.post<TechnicalReport>(this.url + 'add', report);
  }

  getCalculatedHours(technicalId: string, weekNumber: number): Observable<CalculateHours> {
    const httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json').set('Content-Type', 'application/json');
    const httpParams = new HttpParams()
      .set('technicalId', technicalId).set('weekNumber', weekNumber.toString());
    return this.http.get<CalculateHours>(this.url + 'report', { headers: httpHeaders, params: httpParams, responseType: 'json' });
  }
}
