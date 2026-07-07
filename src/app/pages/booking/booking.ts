import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppointmentService } from '../../core/services/appointment.service';
import { Appointment } from '../../core/models/appointment.model';


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class Booking implements OnInit {


  private appointmentService = inject(AppointmentService);


  today = new Date();


  currentMonth = this.today.getMonth();

  currentYear = this.today.getFullYear();



  selectedDate = '';

  selectedTime = '';



  months = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre'
  ];



  weekDays = [
    'Lun',
    'Mar',
    'Mer',
    'Gio',
    'Ven',
    'Sab',
    'Dom'
  ];



  calendarDays: (number | null)[] = [];



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



  appointments: Appointment[] = [];



  ngOnInit() {


    this.generateCalendar();



    this.appointmentService
      .getAll()
      .subscribe({

        next: (data)=>{

          this.appointments = data;


          console.log(
            'Appuntamenti:',
            this.appointments
          );

        },

        error:(error)=>{

          console.error(
            'Errore caricamento appuntamenti',
            error
          );

        }

      });


  }





  generateCalendar(){


    this.calendarDays = [];



    const firstDay =
      new Date(
        this.currentYear,
        this.currentMonth,
        1
      );



    const lastDay =
      new Date(
        this.currentYear,
        this.currentMonth + 1,
        0
      );



    let start =
      firstDay.getDay();



    // trasformiamo domenica 0 in ultimo giorno
    start =
      start === 0
      ? 6
      : start - 1;




    for(
      let i = 0;
      i < start;
      i++
    ){

      this.calendarDays.push(null);

    }




    for(
      let day = 1;
      day <= lastDay.getDate();
      day++
    ){

      this.calendarDays.push(day);

    }


  }





  previousMonth(){


    this.currentMonth--;



    if(this.currentMonth < 0){


      this.currentMonth = 11;

      this.currentYear--;

    }



    this.generateCalendar();


  }






  nextMonth(){


    this.currentMonth++;



    if(this.currentMonth > 11){


      this.currentMonth = 0;

      this.currentYear++;

    }



    this.generateCalendar();


  }






  selectDay(day:number | null){


    if(!day){

      return;

    }



    const month =
      String(this.currentMonth + 1)
      .padStart(2,'0');



    const date =
      String(day)
      .padStart(2,'0');



    this.selectedDate =
      `${this.currentYear}-${month}-${date}`;



    this.selectedTime = '';



  }

isSelectedDay(day: number | null): boolean {

  if (!day) {
    return false;
  }


  const month =
    String(this.currentMonth + 1)
    .padStart(2, '0');


  const date =
    String(day)
    .padStart(2, '0');


  return this.selectedDate ===
    `${this.currentYear}-${month}-${date}`;

}




  selectTime(time:string){


    this.selectedTime = time;


  }







  isTimeAvailable(time:string):boolean{


    return !this.appointments.some(

      appointment =>

        appointment.date === this.selectedDate
        &&
        appointment.time === time

    );


  }







  submitAppointment(){



    const appointment = {


      name:this.name,

      email:this.email,

      phone:this.phone,

      date:this.selectedDate,

      time:this.selectedTime


    };




    this.appointmentService
      .create(appointment)
      .subscribe({



        next:(response)=>{


          console.log(
            'Appuntamento inviato:',
            response
          );


          alert(
            'Richiesta appuntamento inviata!'
          );


          this.resetForm();


        },



        error:(error)=>{


          console.error(error);



          if(error.status === 409){


            alert(
              'Questo orario è già stato prenotato'
            );


          }
          else{


            alert(
              'Errore durante la prenotazione'
            );


          }


        }


      });



  }






  resetForm(){


    this.name = '';

    this.email = '';

    this.phone = '';

    this.selectedDate = '';

    this.selectedTime = '';



  }


}