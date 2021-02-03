import { BaseController } from '@common/interface_adapters/web/controllers/bases/base_controller';
import Logger from '@fnd/external_interfaces/logger';
import institucionesSvc from '@instituciones/app_business_rules/instituciones/index';
import { HTTPCodesEnum } from '@common/enterprise_business_rules/dto/enums/errors_enums';
import { ApiResponse } from '@common/enterprise_business_rules/dto/responses/api_response';
import { institucionesMapper } from '../mappers/instituciones/instituciones_mapper';
import { ListResponse } from '@common/enterprise_business_rules/dto/responses/list_response';
import { ErrorBadRequest } from '@common/enterprise_business_rules/dto/errors/bad_request';


const logger = Logger(__filename);

export class InstitucionesController extends BaseController {
    async get(req: any, res: any, next: any): Promise<void> {
        try {
            const { filter, limit, offset } = req.query;
            const resultDom: any[] = await institucionesSvc.getList(filter, limit, offset);
            const count: number = await institucionesSvc.countList(filter);
            const resultApi: any[] = resultDom.map(result => institucionesMapper.fromDomToApi(result));
            res.status(HTTPCodesEnum.SUCCESSFUL);
            res.json(new ApiResponse(
                HTTPCodesEnum.SUCCESSFUL,
                new ListResponse(resultApi, count)
            ));
        } catch (error) {
            next(error);
        }
    }
    getById(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    post(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    put(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(req: any, res: any, next: any): Promise<void> {
        throw new Error('Method not implemented.');
    }

    
    
}