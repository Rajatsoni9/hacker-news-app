import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DomainPipe } from "src/app/domain.pipe";
import { Story } from "../../app.interface";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
  standalone: true,
  imports: [CommonModule, MatCardModule, DomainPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryComponent {
  @Input() story: Story;

  constructor() {}

  openLink(url: string) {
    if (url) {
      window.open(url);
    }
  }
}
