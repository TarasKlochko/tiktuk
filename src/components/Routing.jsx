import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsFeed from '../pages/NewsFeed';
import UserProfile from '../pages/UserProfile';

export default function Routing() {
  return (
    <Routes>
      <Route path="/news" element={<NewsFeed />} />
      <Route path="/user" element={<UserProfile />} />
    </Routes>
  );
}
