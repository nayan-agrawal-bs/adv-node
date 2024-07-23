import { body, param, query } from 'express-validator';

const postCreate = [];

const idParamValidation = [
  param('id', 'Id must be a valid mongo id').isMongoId(),
];

const searchValidator = [
  query('name').optional().isString().withMessage('Name must be a string'),
  query('location')
    .optional()
    .isString()
    .withMessage('Location must be a string'),
];
export { postCreate, idParamValidation, searchValidator };
