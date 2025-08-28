import React, { useState } from 'react';
import './Account.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const userData = {
    name: 'Peter',
    email: 'peter@example.com',
    phone: '+91 9876543210',
    plan: 'Premium',
    validity: '30 Days',
    devices: 3
  };

  const billingHistory = [
    { id: 1, date: '2023-05-15', amount: '₹299', plan: 'Premium' },
    { id: 2, date: '2023-04-15', amount: '₹299', plan: 'Premium' },
    { id: 3, date: '2023-03-15', amount: '₹299', plan: 'Premium' }
  ];

  return (
    <div className="account-page">
      <div className="page-content">
        <h1 className="page-title">Your Account</h1>

        {/* Tabs */}
        <div className="account-tabs">
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`tab-btn ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            Subscription
          </button>
          <button
            className={`tab-btn ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            Billing
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-info">
              <div className="info-card">
                <h2>Personal Information</h2>
                <div className="info-item">
                  <label>Name</label>
                  <p>{userData.name}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{userData.email}</p>
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  <p>{userData.phone}</p>
                </div>
                <button className="btn">Edit Profile</button>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="subscription-info">
              <div className="info-card">
                <h2>Current Plan</h2>
                <div className="plan-details">
                  <div className="plan-name">{userData.plan}</div>
                  <div className="plan-validity">Valid for: {userData.validity}</div>
                  <div className="plan-devices">Connected devices: {userData.devices}</div>
                </div>
                <button className="btn upgrade">Upgrade Plan</button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="billing-info">
              <div className="info-card">
                <h2>Billing History</h2>
                <div className="table-wrapper">
                  <table className="billing-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Plan</th>
                        <th>Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map(item => (
                        <tr key={item.id}>
                          <td>{item.date}</td>
                          <td>{item.amount}</td>
                          <td>{item.plan}</td>
                          <td>
                            <button className="btn small">Download</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
