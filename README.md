# Mini Aspire

### script steps to run and use:

- Duplicate `.env.example` as `.env` fill in the details (make sure you have a MySQL db ready)
- `source install-part-1.sh`
- After the server start, stop it (ctrl-c)
- `source install-part-2.sh`

### manual steps to run and use:

- Install dependencies `npm i`
- Duplicate `.env.example` as `.env`
- run `npm install -g env-cmd sequelize-cli`
- Update env vars in `.env`
- Start services `env-cmd -f ./.env npm run dev ` (to initialize the db)
- Stop services (ctrl-c)
- Run migration `env-cmd -f ./.env npx sequelize db:migrate `
- Run seed `env-cmd -f ./.env npx sequelize db:seed:all `
- Start services `env-cmd -f ./.env npm run dev `
- Send API requests to http://localhost:${PORT}

### Technology used:

- Server: Node.jswritten in Typescript
- API framework: Express.js
- Database: MySQL,
- ORM: Sequelize
- Testing: Jest, Sinon and Supertest

### App Structure

```bash
/src
  /controllers
  /db # db and data models
  /enums
  /utils # helper functions
/test
  /unit # unit tests
app.js # express app
index.js # server entry point
routes.js
```

### Migrations

- sequelize-cli is used to manage db schema migrations
- Apply migrations `env-cmd -f ./.env npx sequelize db:migrate `
- Rollback `env-cmd -f ./.env npx sequelize db:migrate:undo`
- Creating migration `env-cmd -f ./.env npx sequelize migration:generate --name xxxxx`
- Apply seed `env-cmd -f ./.env npx sequelize db:seed `

### Development

- Install dependencies `npm i`
- Duplicate `.env.example` as `.env`
- run `npm install -g env-cmd`
- Update env vars in `.env`
- Start services `env-cmd -f ./.env npm run dev `

### Testing

- Start services `env-cmd -f ./.env npm run test `

### API Diagram

```mermaid
sequenceDiagram
participant C as API Consumer
participant A as API Server
participant B as Backend CRON Service

Note left of C: Login
Note left of C: POST /api/auth/login
Note left of C: body:<br>{"username": "", "password: ""}
C->>A: POST /api/auth/login
A->>A: create jwt
A->>C: 200: success: {"jwt": ""}

Note left of C: Apply for Loan
Note left of C: POST /api/loan/apply
Note left of C: body:<br>"{amountRequired": 1, "repaymentAmount": 1, "terms": {}}
C->>A: POST /api/loan/apply
A->>A: create unapproved loan
A->>C: 200: success: loan

Note left of C: List Loans (customer or admin dashboard)
Note left of C: GET /api/loans
C->>A: GET /api/loans
A->>A: Get loans based on user role
alt if user is admin
    A->>C: 200: return all loans
else
A->>C: 200: return only user loans
end

Note left of C: Get Loans (with invoices)
Note left of C: GET /api/loan/:id
C->>A: GET /api/loan/:id
A->>A: Get loan and invoice
A->>C: 200: return loan and invoice


Note left of C: Approve Loans
Note left of C: POST /api/loan/:id/approve
C->>A: POST /api/loan/:id/approve
A->>A: Get loans based on user role
alt if user is admin
    A->>A: set loan as approved
    A->>C: 200: return loan
else
A->>C: 401: unauthorised
end

Note left of C: Pay Invoice
Note left of C: POST /api/invoice/:id/pay
C->>A: POST /api/invoice/:id/pay
A->>A: Set invoice paymentDate as now()
A->>C: 200: return invoice

Note left of C: Generate Invoice
Note left of C: POST /api/invoice/generate
B->>B: Cron job to run every day
B->>A: POST /api/invoice/generate
loop for all active loans
  alt if no invoice, or latest invoice older than X days
      A->>A: create invoice
  end
end
A->>C: 200: return invoices

```
