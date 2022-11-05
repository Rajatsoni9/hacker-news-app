import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "stories", loadChildren: () => import("./stories/stories.module").then(m => m.StoriesModule) },
  { path: "", pathMatch: "full", redirectTo: "stories/best" },
  { path: "**", redirectTo: "stories/best" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
