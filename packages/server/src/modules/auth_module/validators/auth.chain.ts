import { body } from 'express-validator';

const register = [
  body('firstname').isString(),
  body('lastname').isString(),
  body('jobtitle').isString(),
  body('email').isEmail(),
  body('compnay').isString(),
  body('password').isLength({ min: 6 }),
];

export const authValidator = {
  register,
};
