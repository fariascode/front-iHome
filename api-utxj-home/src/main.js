// src/main.js
import * as dotenv from 'dotenv';//DULCE
dotenv.config({ path: '.env' });//DULCE
import './config/database.config.js';
import app from './app.js';
//import * as dotenv from 'dotenv';//LINEA COMENTADA POR DULCE
//dotenv.config({ path: 'src/.env' });//LINEA COMENTADA POR DULCE
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`
    ##############################################################
        Express API REST Application is running and listening on:
            Local: http://localhost:${port}
            Documentación Swagger en http://localhost:${port}/api-docs
            Railway: https://api-utxj-home.up.railway.app/
    ##############################################################
  `);
});
