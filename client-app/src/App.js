import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddBookmarkPage from './components/AddBookmarkPage';
import EditBookmarkPage from './components/EditBookmarkPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBookmarkPage />} />
            <Route path="/edit/:id" element={<EditBookmarkPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
