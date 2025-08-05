import express from 'express';
import { addUser, getUser, getUserById, updateUser, deleteUser, saved,getSaved, removeSaved, addAddress, updateAddress, updateFriend, deleteAddress } from '../controller/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/addUser', addUser);
router.get('/getUser', getUser);    
router.get('/getUserById/:id', getUserById);
router.put('/updateUser',auth,updateUser);
router.delete('/deleteUser/:id', deleteUser);

//saved
router.post('/saved', auth, saved)
router.get('/getSaved', auth, getSaved)
router.put('/deleteSaved/:businessId', auth, removeSaved)

//addresses & friends

router.post('/addAdd', auth, addAddress)
router.put('/updateAdd/:_id', auth, updateAddress)
router.put('/updateFriend/:_id', auth, updateFriend)
router.delete('/deleteAdd/:_id', auth, deleteAddress)


export default router;
