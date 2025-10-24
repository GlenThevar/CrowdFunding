// import mongoose from "mongoose";

// const PaymentSchema = new mongoose.Schema({
//   razorpayOrderId: {
//     type: String,
//     required: true,
//   },
//   razorpayPaymentId: {
//     type: String,
//     required: false,
//   },
//   razorpaySignature: {
//     type: String,
//     required: false,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   currency: {
//     type: String,
//     default: "INR",
//   },

//   status: {
//     type: String,
//     enum: ["Created", "Success", "Failed"],
//     default: "Created",
//   },
//   campaign: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Campaign",
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
// export const payments = mongoose.model("Payments", PaymentSchema);
