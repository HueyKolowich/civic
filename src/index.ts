import 'reflect-metadata';
import express from 'express';
import { dataSource } from './db/config';
import dotenv from 'dotenv';
import positionRouter from './routes/position';

dotenv.config();

dataSource
    .initialize()
    .then(() => {
        const app = express();
        const port = process.env.PORT;

        app.use(express.json());

        app.use('/positions', positionRouter);

        app.listen(port, () => {
            console.log(`Server started and listening on port: ${port}`);
        });
    })
    .catch((error) => console.log('TypeORM connection error: ', error));
