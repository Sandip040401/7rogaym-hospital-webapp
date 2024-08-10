import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = ({ setSubscriptionStatus }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state.planDetails;
  const backendUrl = import.meta.env.VITE_BASE_URL;

  const paymentInitiated = useRef(false); // Ref to track if payment is already initiated
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

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
      setLoading(true);

      const res = await loadRazorpayScript();

      if (!res) {
        setLoading(false);
        setAlert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const tokenString = localStorage.getItem('token');
      if (!tokenString) {
        setLoading(false);
        navigate('/signin');
        return;
      }
      const decodedToken = JSON.parse(tokenString); // Parse the string into a JSON object
      const userEmail = decodedToken.email;

      try {
        const { data: order } = await axios.post(`${backendUrl}/api/payment/create-order`, {
          amount: plan.amount,
          currency: 'INR',
          receipt: `receipt#${Date.now()}`,
          plan: plan.planName,
          userEmail
        });

        const options = {
          key: 'rzp_test_1WEsbofwCAiJAg',
          amount: order.amount,
          currency: order.currency,
          name: 'Subscription Service',
          description: plan.planName,
          order_id: order.id,
          handler: async (response) => {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userEmail,
              plan: plan.planName,
              amount: plan.amount
            };
            
            try {
              const result = await axios.post(`${backendUrl}/api/payment/verify-payment`, paymentData);
              if (result.data.status === 'success') {
                setAlert('Payment Successful, please go to the home page to access the dashboard');
                setSubscriptionStatus('active');
                await new Promise(resolve => setTimeout(resolve, 5000));
                navigate('/dashboard'); // Redirect to home page
                window.location.reload(); // Reload the whole page
              } else {
                setAlert('Payment Failed');
                await new Promise(resolve => setTimeout(resolve, 5000));
                navigate("/dashboard");
                window.location.reload(); // Reload the whole page
              }
            } catch (error) {
              setAlert('Payment Verification Failed');
              await new Promise(resolve => setTimeout(resolve, 5000));
              navigate("/dashboard");
              window.location.reload(); // Reload the whole page
            }            
            setLoading(false);
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
      } catch (error) {
        setLoading(false);
        setAlert('Order Creation Failed');
      }
    };

    initiatePayment();
  }, [plan, backendUrl, setSubscriptionStatus, navigate]);

  return (
    <div className='min-h-full mt-72 overflow-hidden'>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      )}
      {alert && (
        <div className={`flex justify-center items-center h-12 mb-4 ${alert.includes('Failed') ? 'bg-red-500' : 'bg-green-500'} text-white`}>
          <p>{alert}</p>
        </div>
      )}
      <div className='flex justify-center'>
        <h2><Link to='/dashboard' className='text-blue-500'>Click here</Link> to go to the Dashboard if not redirected</h2>
      </div>
    </div>
  );
};

export default Payment;
