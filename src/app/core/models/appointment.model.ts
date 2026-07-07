export interface Appointment {
  id?: number;

  name: string;

  email: string;

  phone: string;

  date: string;

  time: string;

  confirmed?: boolean;

  createdAt?: string;
}