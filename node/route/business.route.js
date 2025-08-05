import express from 'express'
import { addBusinness, getBusiness, getBusinessById, updateBusiness, deleteBusiness,  getBusinessFilter,similarBusiness, getAllBusiness } from '../controller/business.controller.js'


const router = express.Router();

router.post('/add-business', addBusinness)
    .get('/getall-business', getAllBusiness)
    .get('/get-business-filter', getBusinessFilter)
    .get('/get-business', getBusiness)
    .get('/get-business-byid/:id', getBusinessById)
    .put('/update-business/:id',updateBusiness)
    .delete('/delete-business/:id', deleteBusiness)


    //similar business
    .get('/similar-business/:sub_cat', similarBusiness)

//popular business
    // router.post('/popular-business', popularBusiness)
    // .get('/popular-business/:cat_name', getPopularBusiness)
   

    export default router