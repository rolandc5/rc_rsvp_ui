import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRsvpComponent } from './search-rsvp.component';

describe('SearchRsvpComponent', () => {
  let component: SearchRsvpComponent;
  let fixture: ComponentFixture<SearchRsvpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRsvpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRsvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
