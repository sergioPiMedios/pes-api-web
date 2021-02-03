/**
 * 
 * @param roleRepo Repository of roles
 */
export function build(roleRepo: any, rolesScopes: any) {
    return async function execute() {
        /**Obtain complete list of roles, actions and scopes */
        const roleData: any[] = await roleRepo.getAllItems({ limit: Number.MAX_VALUE, offset: 0 });
        return roleData;
    }
}
