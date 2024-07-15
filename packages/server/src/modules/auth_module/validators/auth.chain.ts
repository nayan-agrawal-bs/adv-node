import { body } from 'express-validator';

const register = [
  body('firstName').isString().notEmpty(),
  body('lastName').isString().notEmpty(),
  body('email').isEmail().normalizeEmail().notEmpty(),
  body('password').isLength({ min: 6 }),
];
const login = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];
const forgotPassword = [body('email').isEmail().normalizeEmail().notEmpty()];
const resetPassword = [
  body('password').isLength({ min: 6 }),
  body('token').isString().notEmpty().isUUID(4),
];
export const authValidator = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
