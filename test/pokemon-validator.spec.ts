import PokemonValidator, { Pokemon } from '../src/pokemon-validator';

let validator: PokemonValidator;

beforeEach(() => {
  validator = new PokemonValidator();
});

describe('validateBody', () => {
  function createValidBody() {
    return {
      id: 1,
      nickname: 'Peco',
      height: 2.0,
    };
  }

  it('should validate and return a Pokemon', () => {
    // Given
    const body = {
      id: 1,
      nickname: 'Bubu   ',
      height: 1.5,
    };

    // When
    const actualPokemon = validator.validateBody(body);

    // Then
    let expectedPokemon: Pokemon = {
      id: 1,
      name: 'Bulbasaur',
      nickname: 'Bubu',
      height: 1.5,
    };
    expect(actualPokemon).toStrictEqual(expectedPokemon);
  });

  it('should validate and return a Pokemon with the default nickname when empty', () => {
    // Given
    const body = {
      id: 4,
      height: 1.7,
    };

    // When
    const actualPokemon = validator.validateBody(body);

    // Then
    let expectedPokemon: Pokemon = {
      id: 4,
      name: 'Charmander',
      nickname: 'Charmander',
      height: 1.7,
    };
    expect(actualPokemon).toStrictEqual(expectedPokemon);
  });

  it('should not validate for id different than 1, 4 or 7', () => {
    // Given
    const body = createValidBody();
    body.id = 2;

    // Then
    expect.assertions(2);
    try {
      validator.validateBody(body);
    } catch (error) {
      const expectedErrors = [
        {
          message:
            'The only Pokemon available are Bulbasaur, Squirtle and Charmander',
          path: ['id'],
        },
      ];
      expect(error).toHaveProperty('errors');
      expect(error.errors).toMatchObject(expectedErrors);
    }
  });

  it('should not validate for nickname longer than 16 characters', () => {
    // Given
    const body = createValidBody();
    body.nickname = 'Super Powerful Charchar';

    // Then
    expect.assertions(2);
    try {
      validator.validateBody(body);
    } catch (error) {
      const expectedErrors = [
        {
          message:
            'nickname length must be less than or equal to 16 characters long',
          path: ['nickname'],
        },
      ];
      expect(error).toHaveProperty('errors');
      expect(error.errors).toMatchObject(expectedErrors);
    }
  });

  it('should not validate for absent id', () => {
    // Given
    const body = createValidBody();
    // @ts-ignore
    delete body.id;

    // Then
    expect.assertions(2);
    try {
      validator.validateBody(body);
    } catch (error) {
      const expectedErrors = [
        {
          message: 'id is required',
          path: ['id'],
        },
      ];
      expect(error).toHaveProperty('errors');
      expect(error.errors).toMatchObject(expectedErrors);
    }
  });

  it('should not validate for absent height', () => {
    // Given
    const body = createValidBody();
    // @ts-ignore
    delete body.height;

    // Then
    expect.assertions(2);
    try {
      validator.validateBody(body);
    } catch (error) {
      const expectedErrors = [
        {
          message: 'height is required',
          path: ['height'],
        },
      ];
      expect(error).toHaveProperty('errors');
      expect(error.errors).toMatchObject(expectedErrors);
    }
  });
});
