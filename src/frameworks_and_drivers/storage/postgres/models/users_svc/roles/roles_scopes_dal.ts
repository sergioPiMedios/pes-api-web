import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'roles_scopes',
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
})
class RolesScopesDAL extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'roles_id',
        primaryKey: true
    })
    roles_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'scopes_id',
        primaryKey: true
    })
    scopes_id!: string;

}

export { RolesScopesDAL }