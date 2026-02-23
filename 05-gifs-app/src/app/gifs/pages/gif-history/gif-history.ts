import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent, UpperCasePipe],
  templateUrl: './gif-history.html',
})
export default class GifHistory {
  gifService = inject(GifService);
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query'])),
  );
}
