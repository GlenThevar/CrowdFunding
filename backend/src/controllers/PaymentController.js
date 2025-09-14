import Payment from "../models/Payment.js";
import Campaign from "../models/campaigns.js";
import crypto from "crypto"; // Best practice to import at the top
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
// Initialize Razorpay only if environment variables are available
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    // console.log('here');
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
} else {
    console.warn("Razorpay environment variables not set. Payment functionality will be limited.");
}
// Create RazorPay Order
export async function CreateOrder(req,res) {
    try {
        // console.log(`razorPay key: ${process.env.RAZORPAY_KEY_ID}, ${process.env.RAZORPAY_KEY_SECRET}`);
        // console.log(`RazorPay: ${razorpay}`);
        console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
        console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
        if (!razorpay) {
            return res.status(500).json({message:"Razorpay not configured. Please set environment variables."});
        }
        
        const {amount,campaignId}=req.body;
        const options={
            amount:amount*100, //Razorpay expects amount in paise
            currency:"INR",
            receipt:`receipt_${Date.now()}`,
        }
        const order=await razorpay.orders.create(options);
        
        const payment=new Payment({
            razorpayOrderId:order.id,
            amount,
            campaign :campaignId,
        });
        await payment.save();
        
        res.status(200).json({order,payment});
    } catch (error) {
        res.status(400).json({message:"Error Creating order",error:error.message});
    }
}
export async function verifyPayment(req,res) {
    try {
        if (!razorpay) {
            return res.status(500).json({message:"Razorpay not configured. Please set environment variables."});
        }
        
        const{razorpayOrderId,razorpayPaymentId,razorpaySignature,campaignId}=req.body;
        
        // CORRECTED: Use the exact secret variable name from your .env file
        const expectedSignature=crypto
        .createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
        .update(razorpayOrderId + "|"+ razorpayPaymentId)
        .digest("hex");
        
        if(expectedSignature !==razorpaySignature){
            return res.status(400).json({message:"Invalid signature"});
        }
        
        // Update payment status
        const payment=await Payment.findOneAndUpdate(
            {razorpayOrderId},
            {razorpayPaymentId,razorpaySignature,status:"Success"},
            {new: true}
        );
        
        if(!payment) {
            return res.status(404).json({message:"Payment not found"});
        }
        
        const campaign=await Campaign.findByIdAndUpdate(
            campaignId,
            {$inc:{amountRaised:payment.amount} },
            {new: true}
        );
        
        res.status(200).json({message:"Payment verified successfully",payment,campaign});
        
    } catch (error) { 
        res.status(500).json({message:"Error in verifying Payment",error:error.message});
    }
}