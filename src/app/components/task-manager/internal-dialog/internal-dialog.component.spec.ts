import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalDialogComponent } from './internal-dialog.component';

describe('InternalDialogComponent', () => {
  let component: InternalDialogComponent;
  let fixture: ComponentFixture<InternalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
