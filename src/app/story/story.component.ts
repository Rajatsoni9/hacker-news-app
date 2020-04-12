import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../app.interface';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: Story;

  constructor() { }

  ngOnInit() {
  }

  openLink(url: string) {
    if (url) {
      window.open(url);
    }
  }
}
