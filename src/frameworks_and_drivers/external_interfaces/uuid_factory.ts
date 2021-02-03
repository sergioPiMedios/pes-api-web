import uuid from 'uuid/v4';
import validate from 'uuid-validate';

function idGen(): string {
    return uuid();
}

function validatorIds(id: string): boolean {
    if(!id) return false;
    return validate(id, 4);
}

const service = { idGen, validatorIds };
export default service;
export { idGen, validatorIds };