import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBookmarkPage = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const API_BASE = 'http://localhost:3000'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !link) {
      alert('Please provide both title and link.');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/create.php`, { title, link }, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(res.data.message);
      navigate('/'); // Redirect to home after adding
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  return (
    <div>
      <h2>Add New Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Link:</label>
          <input 
            type="url" 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Bookmark</button>
      </form>
    </div>
  );
};

export default AddBookmarkPage;
