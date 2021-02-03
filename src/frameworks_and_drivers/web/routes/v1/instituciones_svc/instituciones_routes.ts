import { Router } from 'express';
import { InstitucionesController } from '@instituciones/interface_adapters/web/controllers/instituciones/instituciones_controller';
import checkScopes from '@fnd/web/middlewares/auth/check_scopes';
import filterInstituciones from '@fnd/web/middlewares/validators/build_filters/instituciones_svc/instituciones/filter_instituciones';

const institucionesCtrl = new InstitucionesController();

const router = Router();
router.get('/get-all', checkScopes("clients:get-all"), filterInstituciones, institucionesCtrl.get);

export { router };