import React from 'react';
import HealthCard from './HealthCard';
import PremiumHealthCard from './PremiumHealthCard';
import BackCard from './BackCard';

const UserDetailsPopup = ({ user, healthCards, onClose, onSave, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...user, [name]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold text-gray-500">X</button>
        <h2 className="text-2xl font-bold mb-4">User Details: {user.name}</h2>
        <div className="grid grid-cols-3 gap-4">
          {['email', 'phoneNumber', 'address', 'city', 'state', 'pincode', 'gender', 'birthYear'].map((field) => (
            <div key={field}>
              <label className="block font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={user[field] || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <div>
            <label className="block font-semibold">Subscription Status</label>
            <select
              name="subscriptionStatus"
              value={user.subscriptionStatus}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          {healthCards.map((member) => (
            <div key={member._id} className="mb-6 flex">
              {user.selectedPlan.includes('Solo') ? (
                <>
                  <PremiumHealthCard member={member} />
                  <BackCard member={member} />
                </>
              ) : (
                <>
                  <HealthCard member={member} />
                  <BackCard member={member} />
                </>
              )}
            </div>
          ))}
        </div>
        <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Save</button>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
