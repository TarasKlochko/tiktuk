import React from 'react';
import './Loading.css';

export default function Loading() {
  return (
    <div className="loading-wrap">
      <p className="loading">Loading...</p>
      <div className="loader" />
    </div>
  );
}
