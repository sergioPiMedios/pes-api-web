import { ErrorDomainEntityValidation } from '@common/enterprise_business_rules/dto/errors/error_domain_entity_validation';

export class InstitucionesDom {

    id: string;
    nombre: string;
    municipioId: string;
    codigoDane: string;
    tipo: string;
    sector: string;

    constructor(item: any) {
        this.id = item.id;
        this.nombre = item.nombre;
        this.municipioId = item.municipioId;
        this.codigoDane = item.codigoDane;
        this.tipo = item.tipo;
        this.sector = item.sector;
    }

}

export function buildMakeInstituciones(uuidGen: any, validators: any) {

    return function execute(item: any) {
        /** data validation */
        validations(validators, item);

        const client = new InstitucionesDom({
            id: item.id || uuidGen(),
            nombre: item.nombre,
            municipioId: item.municipioId,
            codigoDane: item.codigoDane,
            tipo: item.tipo,
            sector: item.sector
        }
        );
        return Object.freeze(client);
    }
}

function validations(validators: any, item: any) {
    if (item.hasOwnProperty("id") && item.id !== undefined)
        if (!validators.validatorIds(item.id))
            throw new ErrorDomainEntityValidation("id deberia ser uuid-v4");
    if (!validators.requiredParamValidator(item, "nombre"))
        throw new ErrorDomainEntityValidation("nombre es requerido");
    if (!validators.requiredParamValidator(item, "municipioId"))
        throw new ErrorDomainEntityValidation("municipioId es requerido");
    if (!validators.requiredParamValidator(item, "codigoDane"))
        throw new ErrorDomainEntityValidation("codigoDane es requerido");
    if (!validators.requiredParamValidator(item, "tipo"))
        throw new ErrorDomainEntityValidation("tipo es requerido");
    if (!validators.requiredParamValidator(item, "sector"))
        throw new ErrorDomainEntityValidation("sector es requerido");

}
