import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { StoriesService } from "../stories.service";
import { StoriesComponent } from "./stories.component";

describe("StoriesComponent", () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let storiesService: StoriesService;
  let currentRouteParam = "new";
  const activatedRouteSpy = jasmine.createSpyObj("Activatedroute", [], {
    paramMap: of({ get: () => currentRouteParam }),
  });
  const routerSpy = jasmine.createSpyObj<Router>("Router", ["navigateByUrl"]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([{ path: "stories/:type", component: StoriesComponent }]),
      ],
      providers: [
        {
          provide: StoriesService,
          useValue: {
            stories: new Array(100).fill(0, 0, 100),
            fetchStory: () => of(1),
            fetchStoriesByType: () => of({}),
          },
        },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    component.nextStoryIndex = 0;
    fixture.detectChanges();
    storiesService = TestBed.inject(StoriesService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch stories if route param matches type", () => {
    currentRouteParam = "";
    component.ngOnInit();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith("stories/best");
  });

  it("#loadStories should load more stories if available", () => {
    component.loadStories();
    expect(component.nextStoryIndex).toEqual(10);
    component.loadStories();
    expect(component.nextStoryIndex).toEqual(20);
  });
});
