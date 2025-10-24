// import crypto from "crypto";
// import Razorpay from "razorpay";

// import { payments } from "../models/payment.js";
// import { campaigns } from "../models/campaigns.js";

// const razorpay = new Razorpay({
//   key_id: process.env.razorpay_key_id,
//   key_secret: process.env.razorpay_key_secret,
// });

// export async function CreateOrder(req, res) {
//   try {
//     const { amount, campaignId } = req.body;
//     const options = {
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     const payment = new payments({
//       razorpayOrderId: order.id,
//       amount,
//       campaign: campaignId,
//     });
//     await payment.save();

//     res.status(200).json({ order, payment });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error Creating order", error: error.message });
//   }
// }

// export async function verifyPayment(req, res) {
//   try {
//     const {
//       razorpayOrderId,
//       razorpayPaymentId,
//       razorpaySignature,
//       campaignId,
//     } = req.body;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.razorpay_key_secret)
//       .update(razorpayOrderId + "|" + razorpayPaymentId)
//       .digest("hex");

//     if (expectedSignature !== razorpaySignature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     const payment = await payments.findOneAndUpdate(
//       { razorpayOrderId },
//       { razorpayPaymentId, razorpaySignature, status: "Success" },
//       { new: true }
//     );

//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     const campaign = await campaigns.findByIdAndUpdate(
//       campaignId,
//       { $inc: { currentAmount: payment.amount } },
//       { new: true }
//     );

//     res
//       .status(200)
//       .json({ message: "Payment verified successfully", payment, campaign });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error in verifying Payment", error: error.message });
//   }
// }
