import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { StoriesComponent } from './stories.component';

const routes: Route[] = [
  { path: ':type', component: StoriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoriesRoutingModule {}
