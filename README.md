The objective of this Dojo is to demonstrate how to use the Joi library to perform validation.

The file `src/request-validator.ts` is an implemented very short example to validate params in the request.
This example expects the URL to have `http://domain.com?lang=<language code>`, in which only `en` (English) or `ja` (Japanese) are valid values.

# Business Requirement
In the exercise, you are required to implement the validation for a fictitious create Pokemon `POST /pokemon` endpoint.

The endpoint should accept a JSON object body with the following fields and rules:

| Field    | Rules                       |
| -------- | --------------------------- |
| id       | Numeric                     |
|          | Required                    |
|          | Only accept values: 1, 4, 7 |
| nickname | String                      |
|          | Maximum length: 16          |
|          | Optional                    |
| height   | Numeric                     |
|          | Required                    |

The validator should sanitize the field nickname by excluding any spaces in the beginning of end of the string.

## Invalid cases
When it is invalid, it should throw an error containing the `field` with problem and a `message`.

For the field `id`, if the user sends an invalid number, the message should be 'The only Pokemon available are Bulbasaur, Squirtle and Charmander'.

For the other fields and error messages, just make sure when the field is mentioned in the message, it does not have quotes around it.

## Valid cases
When it is valid, it should return an object of type `Pokemon`.

The `name` of the returned `Pokemon` should be automatically created based on the id.

The `nickname` field should be always present in the returned Pokemon object. 
If the user does not send it in the request, use the same value as the name.

## Hint
The test already exist and the first failing test is not being skipped, you can start the implementation making them pass in order.
