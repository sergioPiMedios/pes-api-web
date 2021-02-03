import { Router } from 'express';

import { router as institucionesRouter } from './instituciones_svc/instituciones_routes';

const router = Router();

router.use('/instituciones', institucionesRouter);

export { router };
