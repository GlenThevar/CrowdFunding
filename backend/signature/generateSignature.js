import crypto from "crypto";

const razorpayOrderId = "order_RHQtSG8ZmllQTa";
const razorpayPaymentId = "RHQwZo1f496oOo";
const razorpayKeySecret = "pGPe5ek2HXPJb66syHF2NMjX";

const signature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");

console.log("Generated Signature:", signature);
