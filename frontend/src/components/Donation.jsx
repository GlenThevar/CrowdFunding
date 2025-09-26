import { useState } from 'react';
import axios from 'axios';


const Donation = () => {
    const [amount, setAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('idle'); 


    const campaignId = '68c7b9136917a4e5846b8337'; 

    const handleDonate = async (e) => {
        e.preventDefault();

        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
          
            const { data } = await axios.post('http://localhost:3000/api/payment/create-order', {
                amount: Number(amount),
                campaignId: campaignId,
            });

            const order = data.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Crowdfunding Donation",
                description: "Support this great cause!",
                order_id: order.id,
                handler: async (response) => {
                    
                    try {
                        await axios.post('http://localhost:3000/api/payment/verify-payment', {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            campaignId: campaignId,
                        });
                        setPaymentStatus('success');
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        setPaymentStatus('failed');
                    }
                },
                prefill: {
                    name: "Your Name",
                    email: "youremail@example.com",
                    contact: "9999999999",
                },
                theme: {
                color: "#2563eb",
                },
            };

 
            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error("Error creating order:", error);
            alert("Could not initiate payment. Please try again.");
        }
    };

    if (paymentStatus === 'success') {
        return (
            <div className="text-center p-5 text-green-600">
                <h2 className="text-xl font-semibold">Thank You!</h2>
                <p>Your donation has been received successfully.</p>
            </div>
        );
    }

    if (paymentStatus === 'failed') {
        return (
            <div className="text-center p-5 text-red-600">
                <h2 className="text-xl font-semibold">Oh No!</h2>
                <p>Your payment failed. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="border border-slate-200 p-5 rounded-lg max-w-sm bg-white">
            <h3 className="text-lg font-semibold mb-4">Make a pledge</h3>
            <form onSubmit={handleDonate} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Pledge amount</label>
                    <div className="flex items-center border-2 border-blue-600 p-1.5 rounded-md bg-slate-50">
                        <span className="text-slate-600 mr-1">$</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="border-none outline-none ml-1 w-full bg-transparent focus:ring-0"
                        />
                    </div>
                </div>
                <div className="bg-blue-100 p-4 my-4 rounded text-slate-800">
                    <b>Back it because you believe in it.</b>
                    <p>Support the project for no reward, just because it speaks to you.</p>
                </div>
                <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default Donation;