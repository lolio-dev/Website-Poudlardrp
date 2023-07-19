import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsCgvComponent } from './terms-cgv.component';

describe('TermsCgvComponent', () => {
  let component: TermsCgvComponent;
  let fixture: ComponentFixture<TermsCgvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsCgvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsCgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
