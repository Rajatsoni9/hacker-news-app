import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './app.constants';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  /** Stores list of ids of stories */
  stories: Array<number>;

  /** @ignore */
  constructor(private http: HttpClient) { }

  /**
   * This method is used to fetch stories by type from hacker news api
   *
   * @param storyType story type
   * @returns promise which resolves when stories are available
   */
  fetchStoriesByType(storyType: string): Observable<Array<number>> {
    return this.http.get(`${BASE_URL}${storyType}stories.json`).pipe(tap((stories: Array<number>) => {
      this.stories = stories;
    }));
  }

  /**
   * This method is used to fetch story with story id
   *
   * @param storyId story id
   */
  fetchStory(storyId: number) {
    return this.http.get(`${BASE_URL}item/${storyId}.json`);
  }
}
