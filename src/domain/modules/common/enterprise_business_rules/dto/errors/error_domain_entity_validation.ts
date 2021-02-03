import { BaseError } from '../../bases/base_error'
import { ErrorsEnum, HTTPCodesEnum } from '../enums/errors_enums';

export class ErrorDomainEntityValidation extends BaseError {
    constructor(
        message = "unknown error",
        metadata = {}
    ) {
        super(
            message, 
            ErrorsEnum.DOMAIN_ENTITY_VALIDATION, 
            HTTPCodesEnum.BAD_REQUEST, 
            metadata
        );
    }
}
