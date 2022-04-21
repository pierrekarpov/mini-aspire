import { Table, Model, Column, DataType, ForeignKey, HasMany } from "sequelize-typescript";
import { User } from "./User";
import { Invoice } from "./Invoice";

@Table({
    paranoid: true,
    tableName: "Loans",
})
export class Loan extends Model {
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    isApproved!: any;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    amountRequired!: any;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    repaymentAmount!: any;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    repaymentFrequency!: any;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    terms?: any;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ownerUserId!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    approverUserId?: number;

    @HasMany(() => Invoice)
    invoices?: any[]
}