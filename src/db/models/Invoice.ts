import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Loan } from "./Loan";

@Table({
    paranoid: true,
    tableName: "Invoices",
})
export class Invoice extends Model {
    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    paymentDate: any;



    @ForeignKey(() => Loan)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    loanId!: number;


}