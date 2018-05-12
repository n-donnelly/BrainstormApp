import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaDetailViewComponent } from './idea-detail-view.component';

describe('IdeaDetailViewComponent', () => {
  let component: IdeaDetailViewComponent;
  let fixture: ComponentFixture<IdeaDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
