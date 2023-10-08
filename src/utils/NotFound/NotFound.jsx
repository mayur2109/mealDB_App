import React from 'react';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      {/* You can add a link to the homepage or any other relevant page */}
      <a href="/">Go to Homepage</a>
    </div>
  );
};

export default NotFound;
