import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Gallery } from './pages/gallery/gallery';
import { Reviews } from './pages/reviews/reviews';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'chi-siamo',
    component: About
  },
  {
    path: 'servizi',
    component: Services
  },
  {
    path: 'galleria',
    component: Gallery
  },
  {
    path: 'recensioni',
    component: Reviews
  },
  {
    path: 'contatti',
    component: Contact
  }
];