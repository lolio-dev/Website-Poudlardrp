import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuibblerComponent } from './quibbler.component';

describe('QuibblerComponent', () => {
  let component: QuibblerComponent;
  let fixture: ComponentFixture<QuibblerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuibblerComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuibblerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
