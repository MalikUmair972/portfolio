import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTransition } from './scroll-transition';

describe('ScrollTransition', () => {
  let component: ScrollTransition;
  let fixture: ComponentFixture<ScrollTransition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrollTransition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollTransition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
