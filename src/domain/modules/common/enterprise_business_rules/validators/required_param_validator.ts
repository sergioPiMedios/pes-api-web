export function requiredParamValidator(item: any, requiredParam: string) {
    if (item.hasOwnProperty(requiredParam)) return true
    else return false;
}
