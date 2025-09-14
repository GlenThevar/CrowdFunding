import express from "express";
import{CreateOrder,verifyPayment} from "../controllers/PaymentController.js";

const router=express.Router();

router.post("/create-order",CreateOrder);
router.post("/verify-payment",verifyPayment);

export default router;

