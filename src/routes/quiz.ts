import { Router } from 'express';
import container from '../inversify.config';
import { QuizController } from '../controllers/QuizController';

const quizRouter = Router();
const quizController = container.get<QuizController>(QuizController);

quizRouter.get('/', quizController.getQuiz.bind(quizController));

export default quizRouter;
