import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusOneComponent } from './plus-one.component';

describe('PlusOneComponent', () => {
  let component: PlusOneComponent;
  let fixture: ComponentFixture<PlusOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlusOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
