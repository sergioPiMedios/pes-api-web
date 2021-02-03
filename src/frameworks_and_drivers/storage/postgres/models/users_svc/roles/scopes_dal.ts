import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'scopes',
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
})
class ScopesDAL extends Model {

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
        type: DataType.STRING,
        allowNull: false,
        field: 'description'
    })
    description!: string;


}


export { ScopesDAL }