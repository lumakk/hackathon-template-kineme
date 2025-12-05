import { Router } from 'express';
import { getResources, createResource } from '../controllers/resourceController';

export const resourceRouter = Router();

resourceRouter.get('/', getResources);
resourceRouter.post('/', createResource);
