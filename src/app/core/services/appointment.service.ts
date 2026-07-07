import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {

  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/appointments';

  create(data: Appointment): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  confirm(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/confirm/${id}`);
  }
}