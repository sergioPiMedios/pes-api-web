import { ErrorBadRequest } from "../../../../common/enterprise_business_rules/dto/errors/bad_request";

export function buildMakeRole(idGen: any, validators: any) {
    return function makeRole(item: any) {

        //Data validation
        if (item.id)
            if (!validators.validatorIds(item.id)) throw new ErrorBadRequest("ID invalid")

        const role = new RoleDOM(
            item.id || idGen(),
            item.name || "",
            validators.booleanValidator(item.isAdmin),
            validators.booleanValidator(item.deleted),
        )

        return Object.freeze(role)
    }
}

export class RoleDOM {

    id: string;
    name: string;
    isAdmin: boolean;
    deleted: boolean;
    scopes!: any[]
    //**Data scopes */
    scope!: string;
    scopeId!: string;
    description!: string;

    constructor(id: string, name: string, isAdmin: boolean, deleted: boolean) {
        this.id = id;
        this.name = name;
        this.isAdmin = isAdmin;
        this.deleted = deleted;
    }

    softDelete() {
        this.deleted = true;
        return Object.freeze(this);
    }

}