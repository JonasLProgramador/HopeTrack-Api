import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './src/routes/index.js';
import { testConnection } from './src/data/connection.js';

const app  = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT,async ()  => {
    try {
        console.log( 
        `Server is running in localhost: http://localhost:${process.env.PORT}`),
         await testConnection();
    } catch (error) {
        throw error;
    }    
}
);
