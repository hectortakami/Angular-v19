import { ChangeDetectionStrategy, Component } from '@angular/core';
// Alias @environments created on tsconfig.json to avoid relative paths
// and to have a cleaner import statement.
import { environment } from '@environments/environment';
// import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeaderComponent {
  envs = {
    slogan: environment.slogan,
    developerName: environment.developerName
  };
}
