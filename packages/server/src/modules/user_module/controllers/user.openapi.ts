import { SwaggerDefinitionConstant } from 'swagger-express-ts';

export default {
  updateUser: {
    path: '/',
    description: 'Update User',
    summary: 'Update User',
    parameters: {
      body: {
        properties: {
          firstName: { type: SwaggerDefinitionConstant.STRING },
          lastName: { type: SwaggerDefinitionConstant.STRING },
          email: { type: SwaggerDefinitionConstant.STRING },
          phone: { type: SwaggerDefinitionConstant.STRING },
          note: { type: SwaggerDefinitionConstant.STRING },
          profileImg: { type: SwaggerDefinitionConstant.STRING },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  },
  getUser: {
    path: '/',
    description: 'Get User',
    summary: 'Get User',
    responses: {
      200: {
        description: 'Success',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  },
  info: {
    path: '/info',
    description: 'Check User Module',
    summary: 'Check User Module',
    responses: {
      200: {
        description: 'Success',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  },
};
