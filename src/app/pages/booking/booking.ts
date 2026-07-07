import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../core/services/appointment.service';


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class Booking {

  private appointmentService = inject(AppointmentService);
  selectedDate: string = '';

  selectedTime: string = '';

  availableTimes: string[] = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00'
  ];

  name = '';
  email = '';
  phone = '';

  selectDate(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

submitAppointment() {

  const appointment = {
    name: this.name,
    email: this.email,
    phone: this.phone,
    date: this.selectedDate,
    time: this.selectedTime
  };


  this.appointmentService
    .create(appointment)
    .subscribe({

      next: (response) => {

        console.log(
          'Appuntamento inviato:',
          response
        );

        alert(
          'Richiesta appuntamento inviata!'
        );

      },


      error: (error) => {

        console.error(
          'Errore:',
          error
        );

        alert(
          'Errore invio appuntamento'
        );

      }

    });

}
}