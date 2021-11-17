import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

export default function ErrorMessage({ errorMessage }) {
  return (
    <div className="error-message__wrap">
      <h3 className="error-message error-message__title">Something went wrong </h3>
      <p className="error-message">
        &quot;
        {errorMessage}
        &quot;
      </p>
    </div>
  );
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
