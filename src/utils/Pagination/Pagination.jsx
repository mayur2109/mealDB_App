import React from 'react'

import './Pagination.scss'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

export default Pagination