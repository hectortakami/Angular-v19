import { Routes } from '@angular/router';
import { Page1ComponentView } from './pages/page1/page1.component';
import { Page2ComponentView } from './pages/page2/page2.component';
import { DragonballPageComponent } from './pages/dragonball/dragonball-page.component';
import { DragonballSuperPageComponent } from './pages/dragonball-super/dragonball-super-page.component';

export const routes: Routes = [

  {
    path: 'page1',
    component: Page1ComponentView
  },
  {
    path: 'page2',
    component: Page2ComponentView
  },
  {
    path: 'dragonball',
    component: DragonballPageComponent
  },
  {
    path: 'dragonball-super',
    component: DragonballSuperPageComponent
  },
  {
    path: '**',
    redirectTo: 'page1'
  }
];
