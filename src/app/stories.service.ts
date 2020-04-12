import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  /** Stores list of ids of top stories */
  topStories: Array<number>;

  /** Stores list of ids of new stories */
  newStories: Array<number>;

  /** Stores list of ids of best stories */
  bestStories: Array<number>;



  /** @ignore */
  constructor(private http: HttpClient) { }

  /**
   * This method is used to fetch top stories from hacker newsapi
   *
   * @returns promise which resolves when top stories are available
   */
  fetchTopStories() {
    return new Promise((resolve, reject) => {
      this.http.get(`${BASE_URL}topstories.json`).subscribe((topStories: Array<number>) => {
        this.topStories = topStories;
        resolve(topStories);
      }, () => { reject(); });
    });
  }

  /**
   * This method is used to fetch new stories from hacker news api
   *
   * @returns promise which resolves when new stories are available
   */
  fetchNewStories() {
    return new Promise((resolve, reject) => {
      this.http.get(`${BASE_URL}newstories.json`).subscribe((newStories: Array<number>) => {
        this.newStories = newStories;
        resolve(newStories);
      }, () => { reject(); });
    });
  }

  /**
   * This method is used to fetch best stories from hacker news api
   *
   * @returns promise which resolves when best stories are available
   */
  fetchBestStories() {
    return new Promise((resolve, reject) => {
      this.http.get(`${BASE_URL}beststories.json`).subscribe((bestStories: Array<number>) => {
        this.bestStories = bestStories;
        resolve(bestStories);
      }, () => { reject(); });
    });
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
