// TO BE IMPLMENTED WHEN THE ACCOUNT KYC IS DONE

// import React from "react";
// import { useRazorpay } from "react-razorpay";
// import axios from "axios";

// const PaymentButton = () => {
//   const { Razorpay } = useRazorpay();

//   const handlePayment = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/payment/create-order",
//         {
//           amount: 100,
//           campaignId: "68fb0896f4f1b94a22cb84ab",
//         }
//       );

//       const order = response;

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: order.data.order.amount,
//         currency: order.data.order.currency,
//         name: "Fund It",
//         description: "Helping someone",
//         order_id: order.data.order.id,

//         handler: async (response) => {
//           try {
//             console.log(response);
//             const finalresult = await axios.post(
//               "http://localhost:3000/payment/verify-payment",
//               {
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//                 razorpaySignature: response.razorpay_signature,
//                 campaignId: "68fb0896f4f1b94a22cb84ab",
//               }
//             );

//             alert("Payment successful!");
//           } catch (err) {
//             alert("Payment failed: " + err.message);
//             console.log(err);
//           }
//         },
//       };

//       const rzpay = new Razorpay(options);

//       rzpay.open();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePayment}>Hello</button>
//     </div>
//   );
// };

// export default PaymentButton;
