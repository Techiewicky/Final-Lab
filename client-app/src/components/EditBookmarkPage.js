import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBookmarkPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const API_BASE = 'http://localhost:3000'; 

  const fetchBookmark = async () => {
    try {
      const res = await axios.get(`${API_BASE}/readOne.php?id=${id}`);
      if (res.data && res.data.title) {
        setTitle(res.data.title);
        setLink(res.data.link);
      } else {
        alert('Bookmark not found.');
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching bookmark:', error);
    }
  };

  useEffect(() => {
    fetchBookmark();
    // eslint-disable-next-line
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !link) {
      alert('Please provide both title and link.');
      return;
    }
    try {
      const res = await axios.put(`${API_BASE}/update.php`, { id, title, link }, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(res.data.message);
      navigate('/'); // Redirect to home after updating
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  return (
    <div>
      <h2>Edit Bookmark</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Bookmark</button>
      </form>
    </div>
  );
};

export default EditBookmarkPage;
