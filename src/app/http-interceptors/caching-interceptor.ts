import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  cache: Map<string, HttpResponse<any>> = new Map();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === "GET" && !req.url.includes("stories")) {
      const cachedResponse = this.cache.get(req.url);
      return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
    }
    return next.handle(req);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpResponse<any>) => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event);
        }
      })
    );
  }
}
