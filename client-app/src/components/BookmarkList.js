import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookmarkList.css'; 
const BookmarkList = ({ bookmarks, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (bookmark) => {
    navigate(`/edit/${bookmark.id}`);
  };

  return (
    <div>
      {bookmarks.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <a href={bookmark.link} target="_blank" rel="noopener noreferrer">
                {bookmark.title}
              </a>
              <div className="bookmark-actions">
                <button className="edit-button" onClick={() => handleEdit(bookmark)}>Edit</button>
                <button onClick={() => onDelete(bookmark.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkList;
