import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {

  form!: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  send() {
    if (this.form.invalid) return;

    const data = this.form.value;

    const text =
      `Ciao, mi chiamo ${data.name}. ` +
      `Telefono: ${data.phone}. ` +
      `Messaggio: ${data.message}`;

    const url =
      `https://wa.me/393313418118?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
  }
}