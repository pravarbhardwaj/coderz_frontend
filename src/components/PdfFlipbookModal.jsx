import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfFlipbookModal = ({ isOpen, onClose, pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const flipBookRef = useRef();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPairIndex(0);
  };

  const getPagePairs = () => {
    const pairs = [];
    for (let i = 1; i <= numPages; i += 2) {
      pairs.push([i, i + 1]);
    }
    return pairs;
  };

  const handleFlip = (e) => {
    setCurrentPairIndex(e.data);
  };

  const goToPrevPage = () => {
    if (flipBookRef.current && currentPairIndex > 0) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    const pairs = getPagePairs();
    if (flipBookRef.current && currentPairIndex < pairs.length - 1) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  if (!isOpen) return null;

  const pairs = getPagePairs();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-h-full overflow-auto flex flex-col">
       

        <div className="text-center mb-2 font-semibold text-sm">
          {pairs.length > 0 ? `${currentPairIndex + 1}/${pairs.length}` : "--"}
        </div>

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(err) => console.error("PDF Load Error:", err.message)}
          loading={<div className="text-center py-10">📄 Loading PDF...</div>}
        >
          {numPages && (
            <HTMLFlipBook
              width={800}
              height={550}
              size="stretch"
              minWidth={315}
              minHeight={400}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              className="flipbook"
              ref={flipBookRef}
              onFlip={handleFlip}
            >
              {pairs.map(([left, right], i) => (
                <div key={i} className="bg-white flex justify-between p-2">
                  <div className="w-1/2">
                    {left <= numPages && <Page pageNumber={left} />}
                  </div>
                  <div className="w-1/2">
                    {right <= numPages && <Page pageNumber={right} />}
                  </div>
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPairIndex === 0}
            className={`px-4 py-1 rounded ${
              currentPairIndex === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={onClose}
            className={`px-4 py-1 rounded bg-red-500 text-white`}
          >
            Close
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPairIndex === pairs.length - 1}
            className={`px-4 py-1 rounded ${
              currentPairIndex === pairs.length - 1
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

export default PdfFlipbookModal;
