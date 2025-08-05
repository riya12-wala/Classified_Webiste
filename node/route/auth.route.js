import express from 'express';
import { login, signup ,getsignuplist,forgetPass,resetPass, verfication, verifyOTP} from '../controller/auth.controller';
import { auth } from '../middleware/auth.middleware';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/signuplist', getsignuplist);
router.post('/forget-pass', forgetPass);
router.post('/reset-pass', resetPass);
router.post('/send',verfication)
router.post('/verify',verifyOTP)
export default router;
