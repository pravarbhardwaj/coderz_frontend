import React, { useState } from "react";


const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);


  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center space-x-4 text-gray-700">
      <span>{startItem} to {endItem} of {totalItems}</span>

      <button 
        onClick={() => goToPage(1)} 
        disabled={currentPage === 1} 
        className={`px-2 py-1 rounded ${currentPage === 1 ? "text-gray-400" : "hover:bg-gray-200"}`}
      >
        ⏮
      </button>

      <button 
        onClick={() => goToPage(currentPage - 1)} 
        disabled={currentPage === 1} 
        className={`px-2 py-1 rounded ${currentPage === 1 ? "text-gray-400" : "hover:bg-gray-200"}`}
      >
        ◀
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button 
        onClick={() => goToPage(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className={`px-2 py-1 rounded ${currentPage === totalPages ? "text-gray-400" : "hover:bg-gray-200"}`}
      >
        ▶
      </button>

      <button 
        onClick={() => goToPage(totalPages)} 
        disabled={currentPage === totalPages} 
        className={`px-2 py-1 rounded ${currentPage === totalPages ? "text-gray-400" : "hover:bg-gray-200"}`}
      >
        ⏭
      </button>
    </div>
  );
};

export default Pagination;
