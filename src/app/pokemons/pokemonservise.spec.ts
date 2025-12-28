import { TestBed } from '@angular/core/testing';

import { Pokemonservise } from './pokemonservise';

describe('Pokemonservise', () => {
  let service: Pokemonservise;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pokemonservise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
