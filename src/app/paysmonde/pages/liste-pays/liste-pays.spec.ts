import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePays } from './liste-pays';

describe('ListePays', () => {
  let component: ListePays;
  let fixture: ComponentFixture<ListePays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListePays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePays);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
