import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'roles',
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
})
class RoleDAL extends Model {

    @Column({
        type: DataType.STRING,
        field: 'id',
        primaryKey: true
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'name'
    })
    name!: string;

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


export { RoleDAL }