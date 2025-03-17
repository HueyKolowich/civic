import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { dataSource } from './db/config';
import dotenv from 'dotenv';
import { ObservationalRelationshipManager } from './services/observation/ObservationalRelationshipManager';
import positionRouter from './routes/position';
import quizRouter from './routes/quiz';

dotenv.config();

dataSource
    .initialize()
    .then(() => {
        const app = express();
        const port = process.env.PORT;

        app.use(cors());

        app.use(express.json());

        ObservationalRelationshipManager.init();

        app.use('/positions', positionRouter);
        app.use('/quiz', quizRouter);

        app.listen(port, () => {
            console.log(`Server started and listening on port: ${port}`);
        });
    })
    .catch((error) => console.log('TypeORM connection error: ', error));
