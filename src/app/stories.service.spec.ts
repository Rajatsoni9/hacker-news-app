import { TestBed } from '@angular/core/testing';

import { StoriesService } from './stories.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('StoriesService', () => {
  const httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: httpClientMock },
    ]
  }));

  it('should be created', () => {
    const service: StoriesService = TestBed.get(StoriesService);
    expect(service).toBeTruthy();
  });

  it('#fetchTopStories should fetch topstories from hackernews api', () => {
    const service: StoriesService = TestBed.get(StoriesService);
    httpClientMock.get.and.returnValue(new Observable((o) => { o.next([123]); }));
    service.fetchTopStories().then((data) => {
      expect(data).toEqual([123]);
      expect(service.topStories).toEqual([123]);
    });
  });

  it('#fetchNewStories should fetch topstories from hackernews api', () => {
    const service: StoriesService = TestBed.get(StoriesService);
    httpClientMock.get.and.returnValue(new Observable((o) => { o.next([123]); }));
    service.fetchNewStories().then((data) => {
      expect(data).toEqual([123]);
      expect(service.newStories).toEqual([123]);
    });
  });

  it('#fetchBestStories should fetch topstories from hackernews api', () => {
    const service: StoriesService = TestBed.get(StoriesService);
    httpClientMock.get.and.returnValue(new Observable((o) => { o.next([123]); }));
    service.fetchBestStories().then((data) => {
      expect(data).toEqual([123]);
      expect(service.bestStories).toEqual([123]);
    });
  });

  it('#fetchStory should fetch topstories from hackernews api', () => {
    const service: StoriesService = TestBed.get(StoriesService);
    httpClientMock.get.and.returnValue(new Observable((o) => { o.next('test'); }));
    service.fetchStory(123).subscribe((data) => {
      expect(data).toEqual('test');
    });
  });
});
