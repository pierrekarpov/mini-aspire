import * as _ from 'lodash'
import bluebird from 'bluebird';
import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { getUser } from '../utils/auth';
import { MILLISECONDS_IN_A_DAY } from '../utils/constants';
import { Loan } from '../db/models/Loan';
import { Invoice } from '../db/models/Invoice';
import { UserType } from '../enums/UserType';



export default {
    pay: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params
        const user = getUser(req.headers.authorization || '')
        if (!user || !_.get(user, 'id')) {
            return res.status(401).json({ error: 'You are not authorised to pay for a loan' });
        }
        const invoice = await Invoice.findByPk(id)
        if (!invoice) {
            return res.status(404).json({ error: `No invoice found with id ${id}` });
        }

        await invoice.update({
            paymentDate: Date.now(),
        })

        return res.status(200).json(invoice);
    }),
    generate: asyncHandler(async (req: Request, res: Response) => {

        const user = getUser(req.headers.authorization || '')
        if (!user || !_.get(user, 'userTypeId') || _.get(user, 'userTypeId') != UserType.ADMIN) {
            return res.status(401).json({ error: 'You are not authorised to generate invoices' });
        }

        // get all the loans, get their repayment frequency
        // every loan that does not have an invoice created within frequency -> create invoice
        const loans = await Loan.findAll({
            where: {
                isApproved: true
            },
            include: [Invoice]
        })

        const invoices: any[] = []
        await bluebird.map(loans, async (loan: any) => {
            const latestInvoiceDate = _.max(_.map(loan.getDataValue('invoices'), i => i.getDataValue('createdAt')))
            if (!latestInvoiceDate || Date.now() - latestInvoiceDate > MILLISECONDS_IN_A_DAY * loan.getDataValue('repaymentFrequency')) {
                const invoice = await Invoice.create({
                    loanId: loan.getDataValue('id')
                })
                invoices.push(invoice)
            }
        })
        return res.status(200).json({ invoices });
    })
};
