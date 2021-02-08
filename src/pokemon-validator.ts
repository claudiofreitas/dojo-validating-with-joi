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
    const schema = Joi.object().keys({
      id: Joi.number()
        .valid(1, 4, 7)
        .messages({
          'any.only':
            'The only Pokemon available are Bulbasaur, Squirtle and Charmander',
        })
        .required(),

      nickname: Joi.string().max(16).trim().optional(),

      height: Joi.number().required(),
    });

    const validationResult = schema.validate(body, {
      abortEarly: false,
      errors: { wrap: { label: false } },
    });
    if (validationResult.error) {
      // console.log(validationResult.error.details);
      const validationError = new MyValidationError(
        validationResult.error.details
      );
      throw validationError;
    }

    const id = validationResult.value.id;
    const name = POKEMON_NAMES_MAP[id];
    const nickname = validationResult.value.nickname;
    const height = validationResult.value.height;
    const pokemon: Pokemon = {
      id,
      name,
      nickname: nickname ?? name,
      height,
    };

    return pokemon;
  }
}
