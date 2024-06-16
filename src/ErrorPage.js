import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ message }) => {
  return (
    <div className="container2" style={{textAlign:"center"}}>
      <h1>Error</h1>
      <h2>{message || "No Page to display"}</h2>
      <Link to="/" style={{color:"white"}}>Go back to home</Link>
    </div>
  );
};

export default ErrorPage;
