import React from 'react';
import PropTypes from 'prop-types';
import './ErrorPage.scss';

const ErrorPage = ({ errorMessage, onRetryClick }) => {
  return (
    <div className="error-page">
      <h1>Oops! An Error Occurred</h1>
      <p>{errorMessage}</p>
      {onRetryClick && (
        <button onClick={onRetryClick}>Retry</button>
      )}
    </div>
  );
};

ErrorPage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onRetryClick: PropTypes.func,
};

export default ErrorPage;
