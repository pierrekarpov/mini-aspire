import express from 'express';
import AuthController from './controllers/AuthController';
import LoanController from './controllers/LoanController';
import InvoiceController from './controllers/InvoiceController';

const router = express.Router();

/**
 * Map routes to controller methods
 */


// Auth
router.post('/auth/login', AuthController.login)

// Loan
router.post('/loan/apply', LoanController.apply)
router.post('/loan/:id/approve', LoanController.approve)
router.get('/loans', LoanController.list)
router.get('/loan/:id', LoanController.get)

// Invoice
router.post('/invoice/:id/pay', InvoiceController.pay)
router.post('/invoice/generate', InvoiceController.generate)



export default router;
