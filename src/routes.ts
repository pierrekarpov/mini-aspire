import express from 'express';
// import ImageController from './controllers/ImageController';

const router = express.Router();

/**
 * Map routes to controller methods
 */

// Image
// router.post('/image/upload', ImageController.uploadImages);
// router.get('/image/:id', ImageController.get);


// Auth
// post login

// Loan
// post apply
// post approve
// list  (for admin to see which ones to approve) (for user to see all there loans)
// get :id (for user to see the invoices)

// Invoice
// post pay
// post generate (for cron job to generate invoice when 7 days have passed)



export default router;
