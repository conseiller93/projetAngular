import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPokemons } from './details-pokemons';

describe('DetailsPokemons', () => {
  let component: DetailsPokemons;
  let fixture: ComponentFixture<DetailsPokemons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPokemons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPokemons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
