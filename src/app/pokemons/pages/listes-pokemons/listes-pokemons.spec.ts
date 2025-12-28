import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesPokemons } from './listes-pokemons';

describe('ListesPokemons', () => {
  let component: ListesPokemons;
  let fixture: ComponentFixture<ListesPokemons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesPokemons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesPokemons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
