import { ErrorBadRequest } from "../../../../common/enterprise_business_rules/dto/errors/bad_request";

export function buildMakeScope(idGen: any, validators: any) {
    return function makeScope(item: any) {

        //Data validation        
        if (!validators.validatorIds(item.id)) throw new ErrorBadRequest("ID invalid")

        const scope = new ScopesDOM(
            item.id || idGen(),
            item.name || "",
            item.description || ""
        )
        
        return Object.freeze(scope)
    }
}

export class ScopesDOM {

    id: string;
    name: string;
    description: string;

    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;        
        this.description = description;
    }

}