import { Router } from "express";
import {
  addOrder,
  getAll,
  updateOrder,
} from "../controllers/pharmacyController";
const router = Router();

router.get("/getAll", getAll);

router.post("/addOrder", addOrder);

router.post("/updateOrder", updateOrder);

module.exports = router;
