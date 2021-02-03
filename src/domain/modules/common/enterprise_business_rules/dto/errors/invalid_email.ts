import { BaseError } from "../../bases/base_error";
import { ErrorsEnum, HTTPCodesEnum } from "../enums/errors_enums";

class InvalidEmail extends BaseError {
    constructor(value?: string) {
        super('invalid email address', ErrorsEnum.DOMAIN_ENTITY_VALIDATION, HTTPCodesEnum.BAD_REQUEST, value);
    }
}

export { InvalidEmail };
