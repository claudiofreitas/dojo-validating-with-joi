import Joi from 'joi';
import MyValidationError from './my-validation-error';

const POKEMON_NAMES_MAP: Record<number, string> = {
  1: 'Bulbasaur',
  4: 'Charmander',
  7: 'Squirtle',
};

export type Pokemon = {
  id: number;
  name: string;
  nickname: string;
  height: number;
};

export default class PokemonValidator {
  validateBody(body: any): Pokemon {
    // Stub
    const schema = Joi.any();

    const validationResult = schema.validate(body, { abortEarly: false });
    if (validationResult.error) {
      // console.log(validationResult.error.details);
      const validationError = new MyValidationError(
        validationResult.error.details
      );
      throw validationError;
    }

    return validationResult.value;
  }
}
