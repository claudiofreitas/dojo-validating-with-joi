import Joi from 'joi';
import MyValidationError from './my-validation-error';

export type ValidParams = {
  name: string;
  age: number;
};

export default class RequestValidator {
  validateParams(params: any): any {
    const schema = Joi.object().keys({
      lang: Joi.string().valid('en', 'ja').messages({
        'any.only': 'The language should be either English or Japanese',
      }),
    });

    const validationResult = schema.validate(params, { abortEarly: false });
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
