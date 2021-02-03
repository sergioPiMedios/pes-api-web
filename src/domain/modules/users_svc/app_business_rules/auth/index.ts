/**Use cases */
import auth from "./use_cases";
/**Repository */
import { RoleRepository } from "@users/interface_adapters/repositories/roles/role_repo";
import { RoleScopeRepository } from "@users/interface_adapters/repositories/roles/role_scope_repo";
import { AuthKeyRepository } from '@users/interface_adapters/repositories/auth_keys/auth_keys_repository';
/**PSQL Implementation */
import { RolePSQLImpl } from "@fnd/storage/postgres/repositories/users_svc/roles/roles_repository";
import { AuthKeysPSQLImpl } from '@fnd/storage/postgres/repositories/users_svc/auth_keys/auth_keys_repo';
import { RoleScopePSQLImpl } from "@fnd/storage/postgres/repositories/users_svc/roles/role_scopes_repo";
/**JWT library */
import { jwt } from "@fnd/external_interfaces/jwt";

/**Repository of roles */
const roleRepo: RoleRepository = new RoleRepository(new RolePSQLImpl());
/**Repository of authkeys */
const authRepo: AuthKeyRepository = new AuthKeyRepository(new AuthKeysPSQLImpl());
/**Scope Repo */
const roleScopeRepo: RoleScopeRepository = new RoleScopeRepository(new RoleScopePSQLImpl());

/**Check token */
const checkToken = auth.buildCheckToken(authRepo, jwt);

/**Check scopes */
const checkScopes = auth.buildCheckScopes();
/**List all roles with actions and scopes */
const getRoleList = auth.buildGetRoleList(roleRepo, roleScopeRepo);

const service = {
    checkToken,
    checkScopes,
    getRoleList,
};
export default service;
export {
    checkToken,
    checkScopes,
    getRoleList
};
