import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqCategories = {
    general: [
      {
        question: 'How do I create an account?',
        answer: 'To create an account, click on the "Sign Up" button on the top right corner of the homepage and follow the instructions.'
      },
      {
        question: 'How can I reset my password?',
        answer: 'You can reset your password by clicking on "Forgot Password" on the login page and following the instructions sent to your email.'
      },
      {
        question: 'Is there a mobile app available?',
        answer: 'Yes, we have mobile apps for both iOS and Android devices. You can download them from the respective app stores.'
      }
    ],
    billing: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept credit/debit cards, net banking, UPI, and popular mobile wallets.'
      },
      {
        question: 'How do I cancel my subscription?',
        answer: 'You can cancel your subscription from the Account page under the Subscription tab. Note that cancellations take effect at the end of your billing cycle.'
      },
      {
        question: 'Can I get a refund?',
        answer: 'We offer a 30-day money-back guarantee for all annual plans. Monthly plans can be canceled but are not eligible for refunds.'
      }
    ],
    technical: [
      {
        question: 'The service is not working on my device. What should I do?',
        answer: 'First, try clearing your browser cache and cookies. If the problem persists, contact our technical support team with details about your device and browser.'
      },
      {
        question: 'How many devices can I use with one account?',
        answer: 'You can use your account on up to 5 devices simultaneously with our Premium plan.'
      },
      {
        question: 'How do I update my app?',
        answer: 'For mobile apps, updates are available through the app store. For web apps, updates are applied automatically without any action needed from you.'
      }
    ]
  };

  const toggleQuestion = (index) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert('Thank you for your message. We will get back to you soon!');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="support-page">
      <div className="page-content">
        <h1 className="page-title">Support Center</h1>
        <p className="page-description">
          Find answers to common questions or contact our support team for assistance.
        </p>

        <div className="support-content">
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>

            <div className="category-tabs">
              {Object.keys(faqCategories).map(category => (
                <button
                  key={category}
                  className={`tab ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveQuestion(null);
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="faq-list">
              {faqCategories[activeCategory].map((item, index) => (
                <div key={index} className="faq-item">
                  <div
                    className="faq-question"
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3>{item.question}</h3>
                    <span className={`arrow ${activeQuestion === index ? 'open' : ''}`}>▼</span>
                  </div>
                  {activeQuestion === index && (
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-section">
            <h2>Contact Support</h2>
            <p>Can't find what you're looking for? Send us a message and we'll get back to you as soon as possible.</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;