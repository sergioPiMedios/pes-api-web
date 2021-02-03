import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'roles_scopes_view',
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
})

class RolesScopesView extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'id',
        primaryKey: true
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'scope_id',
        primaryKey: true
    })
    scope_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'name'
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'scope'
    })
    scope!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'description'
    })
    description!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        field: 'is_admin'
    })
    is_admin!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        field: 'deleted'
    })
    deleted!: boolean;

}

export { RolesScopesView }