import { body } from 'express-validator';

export const updateUser = [
  body('firstName').optional().isString().trim(),
  body('lastName').optional().isString().trim(),
  body('email').optional().isString().trim().isEmail().normalizeEmail(),
  body('phone').optional().isString().trim(),
  body('note').optional().isString().trim(),
  body('profileImg').optional().isURL(),
];

export default { updateUser };
