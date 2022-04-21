import app from '../../src/app'
import request from 'supertest'
import sinon from 'sinon';
import { Loan } from '../../src/db/models/Loan';

describe('Loan Controller', () => {
    let sandbox: sinon.SinonSandbox = sinon.createSandbox();
    const customerJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwa2FycG92IiwidXNlclR5cGVJZCI6MiwiZW1haWwiOiJwQGsuY29tIiwiaWF0IjoxNjUwNTcxOTQ5fQ.lzc6MC4mdXY6b3vQbd2Zy7sjmpIjp3F_GEhQJWGMKAs'
    const adminJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJiYnVyciIsInVzZXJUeXBlSWQiOjEsImVtYWlsIjoiYkBiLmNvbSIsImlhdCI6MTY1MDU3Mzk2M30.BSgS0Ne5hZjsMyDY0BW6oJE3h_D4KRgHju5L5gQ0ctk'

    beforeEach(async () => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    });

    describe('POST /api/loan/apply', () => {
        it('returns 200 ', async () => {
            sandbox.stub(Loan, 'create').resolves()
            const res = await request(app).post('/api/loan/apply').set('Authorization', `Bearer ${customerJWT}`)
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /api/loan/:id/approve', () => {
        it('returns 200 when loan is approved', async () => {
            sandbox.stub(Loan, 'findByPk').resolves({ update: sandbox.stub().resolves() } as any)
            const res = await request(app).post('/api/loan/1/approve').set('Authorization', `Bearer ${adminJWT}`)
            expect(res.statusCode).toEqual(200)
        })
        it('returns 401 when user is not authenticated', async () => {
            const res = await request(app).post('/api/loan/1/approve')
            expect(res.statusCode).toEqual(401)
        })
        it('returns 401 when user is not admin', async () => {
            const res = await request(app).post('/api/loan/1/approve').set('Authorization', `Bearer ${customerJWT}`)
            expect(res.statusCode).toEqual(401)
        })
        it('returns 404 when loan is not found', async () => {
            sandbox.stub(Loan, 'findByPk').resolves(undefined)
            const res = await request(app).post('/api/loan/1/approve').set('Authorization', `Bearer ${adminJWT}`)
            expect(res.statusCode).toEqual(404)
        })
    })

    describe('GET /api/loan/:id', () => {
        it('returns 200 ', async () => {
            sandbox.stub(Loan, 'findOne').resolves()
            const res = await request(app).get('/api/loan/1').set('Authorization', `Bearer ${customerJWT}`)
            expect(res.statusCode).toEqual(200)
        })
    })


    describe('GET /api/loans', () => {
        it('returns 200 ', async () => {
            sandbox.stub(Loan, 'findAll').resolves()
            const res = await request(app).get('/api/loans').set('Authorization', `Bearer ${customerJWT}`)
            expect(res.statusCode).toEqual(200)
        })
    })
})

