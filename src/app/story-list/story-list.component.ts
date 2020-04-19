import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  /** Stores list of stories */
  stories: Array<{ title: string, url: string, by: string, time: number, score: number }> = [];

  constructor(private storiesService: StoriesService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      const storyType = params.get('type');
      this.fetchStories(storyType).then((storyList: number[]) => {
        const storiesList = [];
        for (let i = 0; i < 10; i++) {
          storiesList.push(this.storiesService.fetchStory(storyList[i]));
        }
        forkJoin(storiesList).subscribe((stories) => {
          this.stories = stories;
        });
      });
    });
  }

  /**
   * This method is used to fetch stories based on storyType
   * @param storyType story type (new/top/best)
   */
  fetchStories(storyType: string) {
    switch (storyType) {
      case 'new':
        return this.storiesService.fetchNewStories();
      case 'top':
        return this.storiesService.fetchTopStories();
      default:
        return this.storiesService.fetchBestStories();
    }
  }

}
