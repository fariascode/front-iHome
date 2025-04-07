import Express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bathroomsRouter from './routes/bathrooms.routes.js';
import bedroomsRouter from './routes/bedrooms.routes.js';
import garageRouter from './routes/garage.routes.js';
import kitchenRouter from './routes/kitchen.routes.js';
import livingroomRouter from './routes/livingroom.routes.js';
import roomsRouter from './routes/rooms.routes.js';
import authRouter from './routes/auth.routes.js';
import { errorHandler } from './middlewares/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';


// ! Express instance for application.
const app = Express();

//* Settings
//* Middlewares
app.use(cors());
app.use(Express.json()); // Use JSON estandard for Express Application.
app.use(morgan('dev'));
app.use(Express.urlencoded({ extended: false }));

//* Routes
const apiUrl = '/api/v1'; // Routes root endpoint
app.use(`${apiUrl}/bedrooms`, bedroomsRouter);
app.use(`${apiUrl}/kitchens`, kitchenRouter);
app.use(`${apiUrl}/bathrooms`, bathroomsRouter);
app.use(`${apiUrl}/garages`, garageRouter);
app.use(`${apiUrl}/livingrooms`, livingroomRouter);
app.use(`${apiUrl}/rooms`, roomsRouter);
app.use(`${apiUrl}/auth`, authRouter); // Añade las rutas de autenticación

// Middleware para la documentación de Swagger
const CSS_URL ="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.css";
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { customCss:'.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }', customCssUrl: CSS_URL }));
//route.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {customCss:'.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }', customCssUrl: CSS_URL}));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// ! Middleware for management errors
app.use(errorHandler);

// ! Middleware 404
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: 'Endpoint not available or not found.',
    message: 'Page not found, please sure to use a correct endpoints like /api/v1/bedrooms/'
  });
});

export default app;
