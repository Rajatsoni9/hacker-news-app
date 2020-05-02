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
  /** True if stories are loading */
  loading: boolean;
  /** Stores list of stories */
  stories: Array<{ title: string, url: string, by: string, time: number, score: number }> = [];

  constructor(private storiesService: StoriesService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.loading = true;
      const storyType: string = params.get('type');
      this.storiesService.fetchStoriesByType(storyType).then((storyList: number[]) => {
        const storiesList = [];
        for (let i = 0; i < 10; i++) {
          storiesList.push(this.storiesService.fetchStory(storyList[i]));
        }
        forkJoin(storiesList).subscribe((stories) => {
          this.stories = stories;
          this.loading = false;
        });
      });
    });
  }

}
