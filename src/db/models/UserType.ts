import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    paranoid: true,
    tableName: "UserTypes",
})
export class UserType extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role!: string;
}