import { Routes } from '@angular/router';
import { DashboardPageComponent } from './gifs/pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component').then(
        (m) => m.DashboardPageComponent
      ),
    children: [
      {
        // No need to add .then() here since the component is marked as default
        // e.g export default class SearchPageComponent { }
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page.component'),
      },
      {
        // Same here.
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page.component'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      }
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
