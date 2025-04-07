import mongoose from 'mongoose';//DULCE
import dotenv from 'dotenv';//DULCE
dotenv.config({ path: '.env' });//DULCE
//import mongoose from 'mongoose';//LINEA COMENTADA POR DULCE
//import dotenv from 'dotenv';LINEA COMENTADA POR DULCE
//dotenv.config({ path: 'src/.env' });LINEA COMENTADA POR DULCE

const connectionUrl = process.env.CONNECTION_DB || process.env.CONNECTION_DB_LOCAL;
console.log('CONNECTION_DB:', process.env.CONNECTION_DB);
console.log('CONNECTION_DB_LOCAL:', process.env.CONNECTION_DB_LOCAL);

try {
    mongoose.connect(connectionUrl)
    .then(() => {
        console.log(`
        #############################################

            Mongo Database Successfully Connected
            
        #############################################
        `);
    })
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1); // Exit process with failure
    });
} catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1); // Exit process with failure
}
