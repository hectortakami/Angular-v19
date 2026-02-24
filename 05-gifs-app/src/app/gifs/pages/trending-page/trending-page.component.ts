import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  // Once page renders, we set the previously scrolled height
  // this makes the ilusion we kept the search when leaving the view
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.gifsService.trendingScrollTop();
  }

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  gifsService = inject(GifService);

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    console.log({ scrollTotal: scrollTop + clientHeight, scrollHeight });
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.gifsService.trendingScrollTop.set(scrollTop);

    // When bottom of scroll view is reach,
    // call the function again to populate
    if (isAtBottom) {
      this.gifsService.loadTrendingGifs();
    }
  }
}
