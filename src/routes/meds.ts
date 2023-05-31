import { Router } from "express";
import { getAll, getType } from "../controllers/medsController";
const router = Router();

router.get("/getAll", getAll);

router.post("/getType", getType);

module.exports = router;
