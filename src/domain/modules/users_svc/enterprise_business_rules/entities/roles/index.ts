/**Use cases */
/**Make a role */
import { buildMakeRole } from './role_dom';
/**External Libraries */
import { datetime } from "@fnd/external_interfaces/datetime";
/**Validators*/
import { idGen, validatorIds } from '@fnd/external_interfaces/uuid_factory';
import { booleanValidator } from "../../../app_business_rules/validators/boolean_validator";

/**Functions to validates some data */
const validators = { validatorIds, booleanValidator }

/**Create a Role */
const makeRole = buildMakeRole(idGen, validators);

const service = {
    makeRole
};
export default service;
export {
    makeRole
};