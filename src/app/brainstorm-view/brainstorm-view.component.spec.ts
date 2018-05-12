import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainstormViewComponent } from './brainstorm-view.component';

describe('BrainstormViewComponent', () => {
  let component: BrainstormViewComponent;
  let fixture: ComponentFixture<BrainstormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainstormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainstormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
