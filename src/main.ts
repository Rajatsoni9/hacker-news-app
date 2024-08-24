import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app/app.component";
import { CachingInterceptor } from "./app/http-interceptors/caching-interceptor";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  {
    path: "stories",
    loadChildren: () => import("./app/stories/stories.routes").then(m => m.routes),
  },
  { path: "", pathMatch: "full", redirectTo: "stories/best" },
  { path: "**", redirectTo: "stories/best" },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(
      ServiceWorkerModule.register("ngsw-worker.js", {
        enabled: environment.production,
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ],
}).catch(err => console.error(err));
