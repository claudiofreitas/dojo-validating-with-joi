import Joi from "joi";

export default class MyValidationError extends Error {
  errors: Joi.ValidationErrorItem[];
  constructor(errors: Joi.ValidationErrorItem[]) {
    super();
    this.errors = errors;
  }
}
