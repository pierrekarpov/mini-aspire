import app from '../../src/app'
import request from 'supertest'
import sinon from 'sinon';
import { Invoice } from '../../src/db/models/Invoice';
import { Loan } from '../../src/db/models/Loan';

describe('Invoice Controller', () => {
    let sandbox: sinon.SinonSandbox = sinon.createSandbox();
    const customerJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwa2FycG92IiwidXNlclR5cGVJZCI6MiwiZW1haWwiOiJwQGsuY29tIiwiaWF0IjoxNjUwNTcxOTQ5fQ.lzc6MC4mdXY6b3vQbd2Zy7sjmpIjp3F_GEhQJWGMKAs'
    const adminJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJiYnVyciIsInVzZXJUeXBlSWQiOjEsImVtYWlsIjoiYkBiLmNvbSIsImlhdCI6MTY1MDU3Mzk2M30.BSgS0Ne5hZjsMyDY0BW6oJE3h_D4KRgHju5L5gQ0ctk'

    beforeEach(async () => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    });

    describe('POST /api/invoice/:id/pay', () => {
        it('returns 200 when invoice is paid', async () => {
            sandbox.stub(Invoice, 'findByPk').resolves({ update: sandbox.stub().resolves() } as any)
            const res = await request(app).post('/api/invoice/1/pay').set('Authorization', `Bearer ${customerJWT}`)
            expect(res.statusCode).toEqual(200)
        })
        it('returns 401 when user is not authenticated', async () => {
            const res = await request(app).post('/api/invoice/1/pay')
            expect(res.statusCode).toEqual(401)
        })
        it('returns 404 when invoice is not found', async () => {
            sandbox.stub(Invoice, 'findByPk').resolves(undefined)
            const res = await request(app).post('/api/invoice/1/pay').set('Authorization', `Bearer ${customerJWT}`)
            expect(res.statusCode).toEqual(404)
        })
    })

    describe('POST /api/invoice/generate', () => {
        it('returns 200 when invoice are generated', async () => {
            sandbox.stub(Loan, 'findAll').resolves([])
            const res = await request(app).post('/api/invoice/generate').set('Authorization', `Bearer ${adminJWT}`)
            expect(res.statusCode).toEqual(200)
        })
        it('returns 401 when user is not authenticated', async () => {
            const res = await request(app).post('/api/invoice/generate')
            expect(res.statusCode).toEqual(401)
        })
        it('returns 401 when user is not admin', async () => {
            const res = await request(app).post('/api/invoice/generate').set('Authorization', `Bearer ${customerJWT}`)
            expect(res.statusCode).toEqual(401)
        })
    })
})

