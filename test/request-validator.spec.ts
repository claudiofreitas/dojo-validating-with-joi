import MyValidationError from '../src/my-validation-error';
import RequestValidator from '../src/request-validator';

let validator: RequestValidator;

beforeEach(() => {
  validator = new RequestValidator();
});

describe('validateParams', () => {
  it('should validate and return sanitized values', () => {
    // Given
    const params = {
      lang: 'en',
    };

    // When
    const sanitizedParams = validator.validateParams(params);

    // Then
    expect(sanitizedParams).toStrictEqual({
      lang: 'en',
    });
  });

  it('should not validate and throw error', () => {
    // Given
    const params = {
      lang: 'fr',
    };

    // Then
    expect.assertions(2);
    try {
      validator.validateParams(params);
    } catch (error) {
      const expectedErrors = [
        {
          message: 'The language should be either English or Japanese',
          path: ['lang'],
        },
      ];
      expect(error).toHaveProperty('errors');
      expect(error.errors).toMatchObject(expectedErrors);
    }
  });
});
