import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Story } from '../../app.interface';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryComponent {
  @Input() story: Story;

  constructor() { }

  openLink(url: string) {
    if (url) {
      window.open(url);
    }
  }
}
