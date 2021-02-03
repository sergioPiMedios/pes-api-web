import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'auth_keys',
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
})
class AuthKeyDAL extends Model {

    @Column({
        type: DataType.STRING,
        field: 'id',
        primaryKey: true
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'private_key'
    })
    private_key!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'public_key'
    })
    public_key!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        field: 'is_active'
    })
    is_active!: boolean;

    @Column({
        type: DataType.TIME,
        field: 'valid_to'
    })
    valid_to!: Date;

}

export { AuthKeyDAL }