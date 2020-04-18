import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StoryListComponent } from './story-list/story-list.component';

const routes: Routes = [
  {path: 'stories/:type', component: StoryListComponent},
  {path: '', pathMatch: 'full', redirectTo: 'stories/best'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
