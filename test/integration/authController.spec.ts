import app from '../../src/app'
import request from 'supertest'
import sinon from 'sinon';
import { User } from '../../src/db/models/User';

describe('Auth Controller', () => {
    let sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let userStub;
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

    describe('POST /api/auth/login', () => {
        it('returns 200 when user is found', async () => {
            userStub = sandbox.stub(User, 'findOne').resolves(user as any)
            const res = await request(app).post('/api/auth/login').send({ username: 'pkarpov', password: 'password' })
            expect(res.statusCode).toEqual(200)
        })
        it('returns 401 when user is not found', async () => {
            userStub = sandbox.stub(User, 'findOne').resolves(undefined as any)
            const res = await request(app).post('/api/auth/login').send({ username: 'pkarpov', password: 'password' })
            expect(res.statusCode).toEqual(401)
        })
    })
})

