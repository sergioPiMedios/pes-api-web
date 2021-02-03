// Use cases 
import { buildInstitucionesList, buildCountList } from './use_cases/get_all';


// Repositories
import { InstitucionesRepository } from '@instituciones/interface_adapters/repositories/instituciones/instituciones_repository';
import { ClientsPsqlRepository } from '@fnd/storage/postgres/repositories/clients_svc/clients/clients_psql_repo';

// Repositories instantiation
const clientsRepository: ClientsRepository = new ClientsRepository(
    new ClientsPsqlRepository()
);

// Institutions

const getList = buildInstitucionesList(
    clientsEnterpriseRepo
);
const countList = buildCountList(
    clientsEnterpriseRepo
);

const service = {
    // instituciones
    getList,
    countList,
}

export default service;

export {
    // instituciones
    getList,
    countList,
}
