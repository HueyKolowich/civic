import { Router } from 'express';
import container from '../inversify.config';
import { PositionController } from '../controllers/PositionController';

const positionRouter = Router();
const positionController =
    container.get<PositionController>(PositionController);

positionRouter.post(
    '/',
    positionController.createPositions.bind(positionController)
);

export default positionRouter;
