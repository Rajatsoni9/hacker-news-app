import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";

import { StoriesService } from "./stories.service";

describe("StoriesService", () => {
  const httpClientMock = jasmine.createSpyObj("HttpClient", ["get"]);
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientMock }],
    })
  );

  it("should be created", () => {
    const service: StoriesService = TestBed.inject(StoriesService);
    expect(service).toBeTruthy();
  });

  it("#fetchStoriesByType should fetch stories from hackernews api", () => {
    const service: StoriesService = TestBed.inject(StoriesService);
    httpClientMock.get.and.returnValue(
      new Observable(o => {
        o.next([123]);
      })
    );
    service.fetchStoriesByType("new").subscribe(data => {
      expect(data).toEqual([123]);
      expect(service.stories.length).toEqual(1);
    });
  });

  it("#fetchStoriesByType should handle error when fetch stories from hackernews api fails", () => {
    const service: StoriesService = TestBed.inject(StoriesService);
    httpClientMock.get.and.returnValue(
      new Observable(o => {
        o.error("error");
      })
    );
    service.fetchStoriesByType("new").subscribe(
      success => {},
      error => {
        expect(error).toEqual("error");
      }
    );
  });

  it("#fetchStory should fetch topstories from hackernews api", () => {
    const service: StoriesService = TestBed.inject(StoriesService);
    httpClientMock.get.and.returnValue(
      new Observable(o => {
        o.next({ title: "test", url: "test", by: "test", time: 123, score: 123 });
      })
    );
    service.fetchStory(123).subscribe(data => {
      expect(data.title).toEqual("test");
      expect(data.time).toEqual(123);
    });
  });
});
