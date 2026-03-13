import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home), title: 'Home | Sree Narayana Group of Institutions' },
  { path: 'about', loadComponent: () => import('./features/about/about').then(m => m.About), title: 'About Us | Sree Narayana Group of Institutions' },
  { path: 'programs', loadComponent: () => import('./features/programs/programs').then(m => m.Programs), title: 'Programs | Sree Narayana Group of Institutions' },
  { path: 'contact', loadComponent: () => import('./features/contact/contact').then(m => m.Contact), title: 'Contact | Sree Narayana Group of Institutions' },

  { path: '**', redirectTo: '' }
];
