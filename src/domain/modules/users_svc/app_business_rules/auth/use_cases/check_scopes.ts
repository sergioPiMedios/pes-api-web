/**Function to check if required scopes are present in token auth*/
export function build() {
    /**
     * 
     * @param tokenPayload Payload of Authtoken
     * @param required Permissions required
     * @param roleList Rolelist of DB
     */
    return async function execute(tokenPayload: any, required: any, roleList: any) {
        if (checkAdmin(tokenPayload)) return true;
        else {
            /**Get the scopes role in a authtoken */
            const scopesInToken = getScopes(tokenPayload.roles, roleList);
            /**If the scope list is empty, the token does not have any permission */
            if (scopesInToken.length === 0) {
                return false;
            }
            /**Create a array of required permissions */
            if (isString(required)) {
                required = [[required]];
            } else if (Array.isArray(required) && required.every((val) => isString(val))) {
                required = [required];
            }
            /**Check if scope required is present in a authtoken */
            return required.some(function (required: any) {
                return required.every(function (permission: any) {
                    return scopesInToken.indexOf(permission) > -1;
                })
            });
        }
    }
}
/**
 * 
 * @param toConfirm Object to confirm if this is string type
 */
function isString(toConfirm: Object) {
    if (typeof (toConfirm) == "string") {
        return true;
    } else {
        return false;
    }
}

function checkAdmin(tokenPayload: any) {
    if (tokenPayload.admin) return true;
    else return false;
}

function getScopes(user_roles: any[], roleList: any[]) {
    const scopeList: any[] = []
    for (let i = 0; i < user_roles.length; i++) {
        const roleToken = user_roles[i];
        for (let j = 0; j < roleList.length; j++) {
            const roleDB = roleList[j];
            if (roleToken === roleDB.id) {
                roleDB.scopes.forEach((scope: any) => {
                    if (scopeList.indexOf(scope) === -1) scopeList.push(scope.name);
                });
            }
        }
    }
    return scopeList;
}
