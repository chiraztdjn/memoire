import { Router } from "express";
import {
  SignIn,
  SignUpUser,
  SignUpPharmacy,
} from "../controllers/authController";
const router = Router();

router.post("/login", SignIn);

router.post("/signupUser", SignUpUser);

router.post("/signupPharmacy", SignUpPharmacy);

module.exports = router;
