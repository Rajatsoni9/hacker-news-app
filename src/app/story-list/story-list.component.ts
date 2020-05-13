import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Story } from '../app.interface';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss'],
})
export class StoryListComponent implements OnInit {
  /** True if stories are loading */
  loading: boolean;
  /** Stores list of stories */
  stories: Array<Story> = [];
  /** Stores index of next story */
  nextStoryIndex = 0;
  /** True if more stories are available */
  moreStoriesAvailable: boolean;

  constructor(
    private storiesService: StoriesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.loading = true;
      const storyType: string = params.get('type');
      this.storiesService
        .fetchStoriesByType(storyType)
        .then(() => {
          this.stories = [];
          this.nextStoryIndex = 0;
          this.loadStories();
        });
    });
  }

  /**
   * This method is used to load more stories (10 at a time)
   */
  loadStories() {
    const storiesList = [];
    this.moreStoriesAvailable =
      this.nextStoryIndex + 10 < this.storiesService.stories.length;
    if (this.moreStoriesAvailable) {
      for (let i = this.nextStoryIndex; i < this.nextStoryIndex + 10; i++) {
        storiesList.push(
          this.storiesService.fetchStory(this.storiesService.stories[i])
        );
      }
      forkJoin(storiesList).subscribe(
        (moreStories: Array<Story>) => {
          this.stories = [...this.stories, ...moreStories];
          this.loading = false;
          this.nextStoryIndex = this.nextStoryIndex + 10;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
}
