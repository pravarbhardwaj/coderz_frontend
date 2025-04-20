import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfFlipModal = ({ fileUrl, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const flipBookRef = useRef();

  const handleFlip = (e) => {
    setCurrentPage(e.data + 1); // Flipbook is 0-indexed
  };

  const goToPrevPage = () => {
    if (flipBookRef.current && currentPage > 1) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current && currentPage < numPages) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-[90vw] h-[90vh] bg-white rounded-lg shadow-lg p-4 overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 rounded px-2"
        >
          Close
        </button>

        <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          <div className="mb-2 text-sm font-semibold">
            {currentPage}/{numPages || "?"}
          </div>
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setCurrentPage(1);
            }}
            loading="Loading PDF..."
          >
            {numPages && (
              <HTMLFlipBook
                width={500}
                height={650}
                showCover={false}
                onFlip={handleFlip}
                ref={flipBookRef}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={index}>
                    <Page pageNumber={index + 1} width={500} />
                  </div>
                ))}
              </HTMLFlipBook>
            )}
          </Document>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === numPages}
            className={`px-4 py-1 rounded ${
              currentPage === numPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfFlipModal;
