import { InstitucionesApi } from '@instituciones/enterprise_business_rules/dto/api_models/instituciones/instituciones_api';
import { InstitucionesDom } from '@instituciones/enterprise_business_rules/entities/instituciones/instituciones_dom';
import { IMapperAPI } from '@common/interface_adapters/web/controllers/bases/imapperapi';

class InstitucionesMapper implements IMapperAPI<InstitucionesDom, InstitucionesApi> {
    fromApiToDom(item: InstitucionesApi, opts?: any) {
        const resDom: InstitucionesDom = new InstitucionesDom({
            id : item.id,
            nombre : item.nombre,
            municipioId : item.municipio_id,
            codigoDane : item.codigo_dane,
            tipo : item.tipo,
            sector : item.sector
        });
        return resDom;
    }
    fromDomToApi(item: InstitucionesDom, opts?: any) {
        const resApi: InstitucionesApi = new InstitucionesApi({
            id : item.id,
            nombre : item.nombre,
            municipio_id : item.municipioId,
            codigo_dane : item.codigoDane,
            tipo : item.tipo,
            sector : item.sector
        });
        return resApi;
    }


}

const institucionesMapper = new InstitucionesMapper();

export { institucionesMapper };
