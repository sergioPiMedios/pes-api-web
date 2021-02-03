import { buildMakeInstituciones } from './instituciones_dom';
import { idGen, validatorIds } from '@fnd/external_interfaces/uuid_factory';
import { requiredParamValidator } from '@common/enterprise_business_rules/validators/required_param_validator';

const validators = {
    validatorIds,
    requiredParamValidator,
};

const makeInstitucion = buildMakeInstituciones(idGen, validators);

const service = {
    makeInstitucion,
};
export default service;
export {
    makeInstitucion,
};
