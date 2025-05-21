import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { CounterMVCPageComponent } from './pages/counterMVC/counter-mvc-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';

export const routes: Routes = [
  {
     path: '',
     component: CounterMVCPageComponent,
  },
  {
     path: 'hero',
     component: HeroPageComponent
  }
];
