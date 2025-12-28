import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPays } from './detail-pays';

describe('DetailPays', () => {
  let component: DetailPays;
  let fixture: ComponentFixture<DetailPays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPays);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
