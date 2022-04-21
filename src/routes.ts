import express from 'express';
import AuthController from './controllers/AuthController';
import LoanController from './controllers/LoanController';

const router = express.Router();

/**
 * Map routes to controller methods
 */


// Auth
// post login
router.post('/auth/login', AuthController.login)

// Loan
router.post('/loan/apply', LoanController.apply)
router.post('/loan/:id/approve', LoanController.approve)
router.get('/loans', LoanController.list)
router.get('/loan/:id', LoanController.get)

// Invoice
// post pay
// post generate (for cron job to generate invoice when 7 days have passed)



export default router;
