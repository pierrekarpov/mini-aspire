import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { decodeJwtToken, getUser } from '../utils/auth';
import * as _ from 'lodash'
import { UserType } from '../enums/UserType';
import { Loan } from '../db/models/Loan';
import { Invoice } from '../db/models/Invoice';
import { REPAYMENT_FREQUENCY } from '../utils/constants'



export default {
    apply: asyncHandler(async (req: Request, res: Response) => {
        const user = getUser(req.headers.authorization || '')
        const { amountRequired, repaymentAmount, terms } = req.body


        const loan = await Loan.create({
            amountRequired,
            repaymentAmount,
            terms,
            ownerUserId: _.get(user, 'id'),
            repaymentFrequency: REPAYMENT_FREQUENCY
        })

        return res.status(200).json(loan);
    }),
    approve: asyncHandler(async (req: Request, res: Response) => {
        const user = getUser(req.headers.authorization || '')
        const { id } = req.params
        console.log('id', id)
        if (!_.get(user, 'userTypeId') || _.get(user, 'userTypeId') != UserType.ADMIN) {
            return res.status(401).json({ error: 'You are not authorised to approve a loan' });
        }

        const loan = await Loan.findByPk(id)
        if (!loan) {
            return res.status(404).json({ error: `No loan found with id ${id}` });
        }

        await loan.update({
            isApproved: true,
            approverUserId: _.get(user, 'userTypeId')
        })

        return res.status(200).json(loan);
    }),
    get: asyncHandler(async (req: Request, res: Response) => {
        const user = getUser(req.headers.authorization || '')
        const { id } = req.params

        const loan = await Loan.findOne({
            where: {
                id,
                ownerUserId: _.get(user, 'id'),
            },
            include: [Invoice]
        })

        return res.status(200).json({ user, id, loan });
    }),
    list: asyncHandler(async (req: Request, res: Response) => {
        const user = getUser(req.headers.authorization || '')
        let loans: any[] = []
        if (_.get(user, 'userTypeId') && _.get(user, 'userTypeId') == UserType.CUSTOMER) {
            loans = await Loan.findAll({
                where: {
                    ownerUserId: _.get(user, 'id')
                }
            })
        } else if (_.get(user, 'userTypeId') && _.get(user, 'userTypeId') == UserType.ADMIN) {
            loans = await Loan.findAll({
                where: {
                    approverUserId: _.get(user, 'id')
                }
            })
        }




        return res.status(200).json({ loans });
    }),
};
