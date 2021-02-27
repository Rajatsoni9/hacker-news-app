import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';

import { DomainPipe } from '../domain.pipe';
import { StoriesService } from '../stories.service';
import { StoryComponent } from '../story/story.component';
import { StoryListComponent } from './story-list.component';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let storiesService: StoriesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressBarModule, MatCardModule, HttpClientModule, RouterTestingModule, InfiniteScrollModule, MatProgressSpinnerModule],
      declarations: [StoryListComponent, StoryComponent, DomainPipe],
      providers: [{ provide: StoriesService, useValue: { stories: [1, 2, 3, 4, 5, 6, 7, 8, , 9, 10, 11, 12], fetchStory: () => of(1) } }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storiesService = TestBed.inject(StoriesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#loadStories should load more stories if available', () => {
    const fetchStorySpy = spyOn(storiesService, 'fetchStory');
    component.loadStories();
    expect(fetchStorySpy).toHaveBeenCalledTimes(10);
  });
});
