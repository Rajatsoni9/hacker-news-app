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

  it('#fetchStoriesByType should fetch stories from hackernews api', () => {
    const service: StoriesService = TestBed.get(StoriesService);
    httpClientMock.get.and.returnValue(new Observable((o) => { o.next([123]); }));
    service.fetchStoriesByType('new').then((data) => {
      expect(data).toEqual([123]);
      expect(service.stories).toEqual([123]);
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
