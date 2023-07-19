import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsCguComponent } from './terms-cgu.component';

describe('TermsCguComponent', () => {
  let component: TermsCguComponent;
  let fixture: ComponentFixture<TermsCguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsCguComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsCguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
