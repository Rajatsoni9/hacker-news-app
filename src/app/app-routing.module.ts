import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryListComponent } from './story-list/story-list.component';

const routes: Routes = [
  {path: 'stories/:type', component: StoryListComponent},
  {path: '', pathMatch: 'full', redirectTo: 'stories/best'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
