import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverSectionComponent } from './popover-section.component';

describe('PopoverSectionComponent', () => {
  let component: PopoverSectionComponent;
  let fixture: ComponentFixture<PopoverSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
