import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { UserType } from "./UserType";

@Table({
    paranoid: true,
    tableName: "Users",
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: any;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: any;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: any;

    @ForeignKey(() => UserType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userTypeId!: number;


}