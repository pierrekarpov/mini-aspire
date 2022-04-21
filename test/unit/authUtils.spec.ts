import sinon from 'sinon';
import * as _ from 'lodash'
import { createJwtToken, decodeJwtToken, getUser } from '../../src/utils/auth';
import { UserType } from '../../src/enums/UserType';

describe('Auth Utils', () => {
    let sandbox: sinon.SinonSandbox = sinon.createSandbox();
    const customerJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwa2FycG92IiwidXNlclR5cGVJZCI6MiwiZW1haWwiOiJwQGsuY29tIiwiaWF0IjoxNjUwNTcxOTQ5fQ.lzc6MC4mdXY6b3vQbd2Zy7sjmpIjp3F_GEhQJWGMKAs'
    const adminJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJiYnVyciIsInVzZXJUeXBlSWQiOjEsImVtYWlsIjoiYkBiLmNvbSIsImlhdCI6MTY1MDU3Mzk2M30.BSgS0Ne5hZjsMyDY0BW6oJE3h_D4KRgHju5L5gQ0ctk'
    const user = {
        id: 1,
        username: 'pk',
        userTypeId: 1,
        email: 'p@k.com',
    }

    beforeEach(async () => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    });

    describe('createJwtToken', () => {
        it('returns a encoded string with the correct data', async () => {
            const jwtStr = createJwtToken(user)
            const decodedUser = decodeJwtToken(jwtStr)
            expect(_.get(decodedUser, 'id')).toBe(user.id)
            expect(_.get(decodedUser, 'username')).toBe(user.username)
            expect(_.get(decodedUser, 'email')).toBe(user.email)
            expect(_.get(decodedUser, 'userTypeId')).toBe(user.userTypeId)
        })
    })


    describe('decodeJwtToken', () => {
        it('decodes string with the correct data', async () => {
            const decodedCustomer = decodeJwtToken(customerJWT)
            const decodedAdmin = decodeJwtToken(adminJWT)
            expect(_.get(decodedCustomer, 'userTypeId')).toBe(UserType.CUSTOMER)
            expect(_.get(decodedAdmin, 'userTypeId')).toBe(UserType.ADMIN)
        })
    })

    describe('getUser', () => {
        it('decodes string with the correct data', async () => {
            const decodedCustomer = getUser(`Bearer ${customerJWT}`)
            const decodedAdmin = getUser(`Bearer ${adminJWT}`)
            expect(_.get(decodedCustomer, 'userTypeId')).toBe(UserType.CUSTOMER)
            expect(_.get(decodedAdmin, 'userTypeId')).toBe(UserType.ADMIN)
        })
    })
})

