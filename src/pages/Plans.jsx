import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanCard } from '../components/PlanCard';

const individualPlans = [
  {
    title: 'Solo Lite',
    price: 100,
    period: 'per year',
    features: [
      'Validity 1 Year',
      '50% discount for BPL card holders',
      'Renews 100/yr',
      '3 Days Waiting Period',
      '2 yr @150rs',
    ],
    isSelected: false,
    isRecommended: false,
  },
  {
    title: 'Solo',
    price: 300,
    period: 'per year',
    features: [
      'Free Annual Health Check up',
      'Free 1 Specialist, 2 General Cashless Consultation worth ₹2000',
      '1 Day Activation',
      'Top Priority in appointment',
    ],
    isSelected: false,
    isRecommended: true,
  },
  {
    title: 'Solo Premium',
    price: 1100,
    period: 'per year',
    features: [
      'Free Annual Health Check up',
      '2 Specialist, 4 General Cashless Consultation worth ₹4000',
      'Free ePHR facility',
      'Top Priority in appointment',
    ],
    isSelected: false,
    isRecommended: false,
  },
];

const familyPlans = [
  {
    title: 'Couple',
    price: 150,
    period: 'per year',
    features: [
      'Free Annual Health Check up',
      '2 Specialist, 4 General Cashless Consultation worth ₹4000',
      'Free ePHR facility',
      'Top Priority in appointment',
    ],
    isSelected: false,
    isRecommended: false,
  },
  {
    title: 'Family',
    price: 300,
    period: 'per year',
    features: [
      'Upto 4 Members',
      'Free ePHR facility',
      'Renews 100/yr',
      '3 Days Waiting Period',
      '2 yr @500rs',
    ],
    isSelected: false,
    isRecommended: false,
  },
  {
    title: 'Family+',
    price: 500,
    period: 'per year',
    features: [
      'Upto 6 members',
      'Free Annual Health Check up',
      'Free ePHR Facility',
      'Free 1 Specialist, 2 General Cashless Consultation worth ₹2000',
      '1 Day Activation',
      'Top Priority in appointment',
    ],
    isSelected: false,
    isRecommended: true,
  },
];

export default function Plans() {
  const [planType, setPlanType] = useState('individual');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayNow = () => {
    if (selectedPlan) {
      navigate('/payment', { state: { plan: selectedPlan } });
    }
  };

  const plans = planType === 'individual' ? individualPlans : familyPlans;

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 font-semibold rounded ${planType === 'individual' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 transition duration-300'}`}
          onClick={() => setPlanType('individual')}
        >
          Individual Plans
        </button>
        <button
          className={`px-4 py-2 mx-2 font-semibold rounded ${planType === 'family' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 transition duration-300'}`}
          onClick={() => setPlanType('family')}
        >
          Family Plans
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">{planType === 'individual' ? 'Individual Plans' : 'Family Plans'}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              {...plan}
              isSelected={selectedPlan?.title === plan.title}
              onSelect={() => handleSelectPlan(plan)}
            />
          ))}
        </div>
      </div>

      {selectedPlan && (
        <div className="mt-6 flex justify-center">
          <button onClick={handlePayNow} className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg">
            Pay Now ₹{selectedPlan.price}
          </button>
        </div>
      )}
    </div>
  );
}
