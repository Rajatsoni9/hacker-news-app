import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DomainPipe } from '../domain.pipe';
import { StoriesRoutingModule } from "./stories-routing.module";
import { StoriesComponent } from "./stories.component";
import { StoryComponent } from "./story/story.component";

@NgModule({
    declarations: [DomainPipe, StoryComponent, StoriesComponent],
    imports: [
        CommonModule,
        InfiniteScrollModule,
        MatCardModule,
        MatProgressBarModule,
        StoriesRoutingModule,
    ],
})
export class StoriesModule { }
