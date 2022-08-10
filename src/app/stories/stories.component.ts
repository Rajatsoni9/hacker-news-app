import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from '../app.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  /** True if stories are loading */
  loading: boolean;
  /** Stores list of stories */
  stories: Array<Observable<Story>> = [];
  /** Stores index of next story */
  nextStoryIndex = 0;
  /** True if more stories are available */
  moreStoriesAvailable: boolean;

  constructor(
    private storiesService: StoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.loading = true;
      const storyType: string = params.get('type');
      if (!['top', 'new', 'best'].includes(storyType)) {
        this.router.navigateByUrl('stories/best');
      } else {
        this.storiesService.fetchStoriesByType(storyType).subscribe(() => {
          this.stories = this.storiesService.stories;
          this.nextStoryIndex = 0;
          this.loadStories();
        });
      }
    });
  }

  /**
   * This method is used to load more stories (10 at a time)
   */
  loadStories() {
    this.moreStoriesAvailable =
      this.nextStoryIndex + 10 < this.storiesService.stories.length;
    if (this.moreStoriesAvailable) {
      this.nextStoryIndex = this.nextStoryIndex + 10;
    }
    this.loading = false;
  }
}
