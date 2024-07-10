import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Payment = ({ setSubscriptionStatus }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state;
  const backendUrl = import.meta.env.VITE_BASE_URL;

  const paymentInitiated = useRef(false); // Ref to track if payment is already initiated

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const initiatePayment = async () => {
      if (paymentInitiated.current) return; // Prevent double payment initiation
      paymentInitiated.current = true;

      const res = await loadRazorpayScript();

      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        navigate('/signin');
        return;
      }
      const decodedToken = JSON.parse(tokenString); // Parse the string into a JSON object
      const userEmail = decodedToken.email;

      const { data: order } = await axios.post(`${backendUrl}/api/payment/create-order`, {
        amount: plan.price,
        currency: 'INR',
        receipt: `receipt#${Date.now()}`,
        plan: plan.title,
        userEmail
      });

      const options = {
        key: 'rzp_test_1WEsbofwCAiJAg',
        amount: order.amount,
        currency: order.currency,
        name: 'Subscription Service',
        description: plan.title,
        order_id: order.id,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userEmail,
            plan: plan.title,
            amount: plan.price
          };
          
          const result = await axios.post(`${backendUrl}/api/payment/verify-payment`, paymentData);
          if (result.data.status === 'success') {
            toast.success('Payment Successful');
            setSubscriptionStatus('active');
            navigate('/'); // Redirect to home page
          } else {
            toast.error('Payment Failed');
            navigate("/")
          }
        },
        prefill: {
          email: userEmail,
          contact: '9999999999' // Default or fetched from user profile
        },
        theme: {
          color: '#F37254'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };

    initiatePayment();
  }, [plan, backendUrl, setSubscriptionStatus, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h2>Processing Payment...</h2>
    </div>
  );
};

export default Payment;
