/**Use cases */
/**Make a scope */
import { buildMakeScope } from './scopes_dom';
/**Validators*/
import { idGen, validatorIds } from '@fnd/external_interfaces/uuid_factory';
import { booleanValidator } from "../../../app_business_rules/validators/boolean_validator";

/**Functions to validates some data */
const validators = { validatorIds, booleanValidator }

/**Create a Scope*/
const makeScope = buildMakeScope(idGen, validators);

const service = {
    makeScope,
};
export default service;
export {
    makeScope,
};