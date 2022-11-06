import { Route } from "@angular/router";
import { StoriesComponent } from "./stories.component";

export const routes: Route[] = [{ path: ":type", component: StoriesComponent }];
