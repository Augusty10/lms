import  express from  'express';
import {
    authenticateUser, 
    createUserAccount, 
    signOutUser,
    getCurrentUserProfile,
    updateUserProfile,
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import { validateSignUp } from '../middleware/validation.middleware.js';


const router  = express.Router();

// Auth Routes 
router.post('/signup', validateSignUp, createUserAccount);
router.post ('/signin', authenticateUser);
router.post('/signout',signOutUser);

// profile Routes 
router.get("/profile", isAuthenticated,getCurrentUserProfile);
router.patch("/profile,",
      isAuthenticated,
      upload.single("avatar"),
      updateUserProfile,
);



export  default router; 
