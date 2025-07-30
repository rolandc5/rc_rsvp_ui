import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeDinnerComponent } from './welcome-dinner.component';

describe('WelcomeDinnerComponent', () => {
  let component: WelcomeDinnerComponent;
  let fixture: ComponentFixture<WelcomeDinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeDinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeDinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
