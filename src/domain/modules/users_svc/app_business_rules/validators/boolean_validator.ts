function booleanValidator(bool: any): boolean {
    if(typeof bool === "string") return bool == "true"
    const procBool = (bool === undefined || bool === null) ? false : bool;
    return procBool
}

const service = { booleanValidator };
export default service;
export { booleanValidator };