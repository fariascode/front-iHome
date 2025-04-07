import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'iHome APIS',
      version: '1.0.0',
      description: 'Una API sencilla con Swagger y Express',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
          BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
          },
      },
  },
  security: [{ BearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
