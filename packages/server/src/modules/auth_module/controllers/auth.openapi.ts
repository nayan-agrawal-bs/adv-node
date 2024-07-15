import { SwaggerDefinitionConstant } from 'swagger-express-ts';

export default {
  resetPassword: {
    path: '/reset_password',
    description: 'Reset Password',
    summary: 'Reset Password',
    parameters: {
      body: {
        properties: {
          password: { type: SwaggerDefinitionConstant.STRING, required: true },
          token: { type: SwaggerDefinitionConstant.STRING, required: true },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
  forgetPassword: {
    path: '/forgot_password',
    description: 'Foreget Password',
    summary: 'Foreget Password',
    parameters: {
      body: {
        properties: {
          email: { type: SwaggerDefinitionConstant.STRING, required: true },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
  login: {
    path: '/login',
    description: 'Login User',
    summary: 'Login User',
    parameters: {
      body: {
        properties: {
          email: { type: SwaggerDefinitionConstant.STRING, required: true },
          password: { type: SwaggerDefinitionConstant.STRING, required: true },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
  register: {
    path: '/register',
    description: 'Register User',
    summary: 'Register User',
    parameters: {
      body: {
        properties: {
          firstName: { type: SwaggerDefinitionConstant.STRING, required: true },
          lastName: { type: SwaggerDefinitionConstant.STRING, required: true },
          email: { type: SwaggerDefinitionConstant.STRING, required: true },
          password: { type: SwaggerDefinitionConstant.STRING, required: true },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
  info: {
    path: '/info',
    description: 'Check Auth Module',
    summary: 'Check Auth Module',
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
};
