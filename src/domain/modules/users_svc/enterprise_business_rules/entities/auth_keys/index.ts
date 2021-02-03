/**Create a Auth key */
import { buildMakeAuthKey } from './auth_key_dom';
/**External Libraries */
import { datetime } from '@fnd/external_interfaces/datetime';
/**ID Generator*/
import { idGen } from '@fnd/external_interfaces/uuid_factory';
/**Key generator and uuid library */
import { generateKeyPair, generateHash } from "@fnd/external_interfaces/rsa_key";
import { uuid } from "@fnd/external_interfaces/uuid";
/**Generator Password */
import { generate } from "@fnd/external_interfaces/password_handler";

const generators = { generateKeyPair, generateHash, generate, uuid }

/**Create a Auth key*/
const makeAuthKey = buildMakeAuthKey(datetime, idGen, generators);

const service = {
    makeAuthKey
};
export default service;
export {
    makeAuthKey
};