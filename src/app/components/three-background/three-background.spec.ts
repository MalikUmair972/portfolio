import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeBackground } from './three-background';

describe('ThreeBackground', () => {
  let component: ThreeBackground;
  let fixture: ComponentFixture<ThreeBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
