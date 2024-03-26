import React, { useState } from 'react';
import styled from 'styled-components';
import { ApiMethod } from "../services/ApiUtils";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 9999;
`;

const FeedbackForm = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9998;

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
  }

  input,
  textarea {
    margin-bottom: 10px;
    padding: 5px;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const FeedbackButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const toggleForm = () => {
      setIsOpen(!isOpen);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    };
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const confirmSubmit = window.confirm('Are you sure you want to submit the feedback?');
  
      if (confirmSubmit) {
        const feedbackData = {
          name: name,
          email: email,
          category: selectedCategory,
          message: message,
        };
  
        try {
          const response = await fetch(ApiMethod.FEEDBACK, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
          });
  
          if (response.ok) {
            console.log('Feedback submitted successfully');
            setName('');
            setEmail('');
            setSelectedCategory('');
            setMessage('');
            setIsOpen(false);
          } else {
            console.error('Error submitting feedback');
          }
        } catch (error) {
          console.error('Error submitting feedback:', error);
        }
      }
    };

  return (
    <div>
    <FloatingButton onClick={toggleForm}>Feedback</FloatingButton>
    {isOpen && (
      <FeedbackForm>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />

          <label htmlFor="category">Category:</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange} required>
            <option value="">Select a category</option>
            <option value="general">General</option>
            <option value="suggestion">Suggestion</option>
            <option value="feature">Feature Request</option>
            <option value="bug">Bug</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="message">Message:</label>
          <textarea id="message" required></textarea>

          <button type="submit">Submit</button>
        </form>
      </FeedbackForm>
    )}
  </div>
  );
};

export default FeedbackButton;