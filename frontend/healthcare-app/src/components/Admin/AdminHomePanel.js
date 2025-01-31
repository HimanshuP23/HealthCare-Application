import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminHomePanel() {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar takes the full left side */}
      <Sidebar className="bg-dark text-white p-3" style={{ width: '250px' }} />

      {/* Main content area including Navbar */}
      <div className="d-flex flex-column flex-grow-1">
        <Navbar className="bg-primary text-white p-2" />
        <div className="p-3"> {/* This is the main content area */} 
          <h1 className='heading-h1'>Welcome to Admin Panel</h1>
          <br/>
          <br/>
          <br/>
          <p className='fw-semibold'>New Updates Coming Soon...</p>
        </div>
      </div>
    </div>
  );
}
