import express from 'express';
import { admin } from '../controller/admin.controller';
const router = express.Router();    

router.get('/admin', admin);