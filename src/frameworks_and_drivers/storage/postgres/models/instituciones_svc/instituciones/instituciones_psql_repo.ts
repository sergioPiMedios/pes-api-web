import { Transaction, Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { clients } from "@fnd/storage/postgres/client/client";
import { StorageError } from '@common/enterprise_business_rules/dto/errors/storage_error';
import { IRead, IWrite, ITransactional, ICheckOptions } from '@common/enterprise_business_rules/interfaces/ioperations';
import { IFilter } from '@common/enterprise_business_rules/interfaces/ifilterwrapper';
import { ClientsEnterpriseViewDal } from '@fnd/storage/postgres/models/clients_svc/clients_enterprise/clients_enterprise_view_dal';
import { IWrapper } from '@common/enterprise_business_rules/interfaces/iwrapper';
import { ClientsEnterpriseDal } from '@fnd/storage/postgres/models/clients_svc/clients_enterprise/clients_enterprise_dal';
import { ClientsEnterpriseDom } from '@clients/enterprise_business_rules/entities/clients_enterprise/clients_enterprise_dom';
import { keyMapper } from '@fnd/helpers/key_mapper';

const PSQL_CLIENT = process.env.PSQL_CLIENT || "psql_client";

export class ClientsEnterprisePsqlRepository
    implements
    IRead<ClientsEnterpriseDom>,
    IWrite<ClientsEnterpriseDom>,
    IFilter,
    IWrapper<ClientsEnterpriseDal, ClientsEnterpriseDom>,
    ITransactional,
    ICheckOptions {

    database: Sequelize;

    constructor() {
        this.database = clients.get(PSQL_CLIENT);
        this.database.addModels([ClientsEnterpriseDal]);
    }
}
