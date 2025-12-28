import { TestBed } from '@angular/core/testing';

import { Pokemonservice } from './pokemonservice';

describe('Pokemonservice', () => {
  let service: Pokemonservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pokemonservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
