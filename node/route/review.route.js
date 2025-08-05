import express from 'express'
import { addReviews, updateReview, deletereview, getreview, getReviewByIdPagination,getReviewById, getReviewByUserId } from '../controller/review.controller'
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/addReview/:businessId',auth, addReviews)
    .get('/get-review', getreview)
    .get('/getreview-pagination/:id', getReviewByIdPagination)
    .get('/getreview-byid/:id', getReviewById)
    .get('/review-user',auth,getReviewByUserId)
    .put('/update-review/:id', updateReview)
    .delete('/delete-review/:id', deletereview)

export default router;