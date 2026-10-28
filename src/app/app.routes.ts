import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    path: 'heroes',
    loadComponent: () =>
      import('./features/heroes/pages/hero-list/hero-list').then((m) => m.HeroListPage),
  },
];
