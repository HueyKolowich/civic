import 'reflect-metadata';
import express from 'express';
import issuesRouter from './routes/issue';
import { dataSource } from './db/config';
import dotenv from 'dotenv';

dotenv.config();

dataSource
    .initialize()
    .then(() => {
        const app = express();
        const port = process.env.PORT;

        app.use(express.json());

        app.use('/issues', issuesRouter);

        app.listen(port, () => {
            console.log(`Server started and listening on port: ${port}`);
        });
    })
    .catch((error) => console.log('TypeORM connection error: ', error));
