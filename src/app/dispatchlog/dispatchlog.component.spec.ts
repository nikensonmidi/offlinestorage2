import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchlogComponent } from './dispatchlog.component';

describe('DispatchlogComponent', () => {
  let component: DispatchlogComponent;
  let fixture: ComponentFixture<DispatchlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
