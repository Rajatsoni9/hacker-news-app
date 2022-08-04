import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StoryComponent } from './story.component';
import { DomainPipe } from '../../domain.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatChipsModule],
      declarations: [StoryComponent, DomainPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display story details correctly', () => {
    component.story = { title: 'test', url: 'https://www.google.com', score: 100, by: 'testuser', time: 123 };
    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const title = nativeElement.querySelector('mat-card-title').textContent;
    const subtitle = nativeElement.querySelector('mat-card-subtitle').textContent;
    const url = nativeElement.querySelector('mat-card-subtitle:last-child').textContent;
    expect(title).toContain('test');
    expect(subtitle).toContain('100 points by testuser');
    expect(url).toContain('google.com');
  });

  it('#openLink should open the link in browser if url is present', () => {
    const windowOpenSpy = spyOn(window, 'open');
    const testUrl = 'https://abc.com';
    component.openLink(testUrl);
    expect(windowOpenSpy.calls.count()).toEqual(1);
    expect(windowOpenSpy.calls.allArgs()[0][0]).toEqual(testUrl);
  });

  it('#openLink should do nothing if url is not present', () => {
    const windowOpenSpy = spyOn(window, 'open');
    const testUrl = '';
    component.openLink(testUrl);
    expect(windowOpenSpy.calls.count()).toEqual(0);
  });
});
