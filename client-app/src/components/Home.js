import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookmarkList from './BookmarkList';

const Home = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE = 'http://localhost:3000';

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/readAll.php`);
      if (Array.isArray(res.data)) {
        setBookmarks(res.data);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const deleteBookmark = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE}/delete.php`, { data: { id } });
      console.log(res.data.message);
      fetchBookmarks();
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const editBookmark = (bookmark) => {
    // Redirect to edit page with bookmark details
    window.location.href = `/edit/${bookmark.id}`;
  };

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>All Bookmarks</h2>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search bookmarks..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <BookmarkList 
        bookmarks={filteredBookmarks} 
        onDelete={deleteBookmark} 
        onEdit={editBookmark} 
      />
    </div>
  );
};

export default Home;
