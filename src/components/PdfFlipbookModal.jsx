import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfFlipbookModal = ({ isOpen, onClose, pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!isOpen) return null;

  // Group pages in pairs [0-1], [2-3], ...
  const getPagePairs = () => {
    const pairs = [];
    for (let i = 1; i <= numPages; i += 2) {
      pairs.push([i, i + 1]);
    }
    return pairs;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-[95%] max-h-full overflow-auto">
       

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
              // maxWidth={1000}
              minHeight={400}
              // maxHeight={1536}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              className="flipbook"
            >
              {getPagePairs().map(([left, right], i) => (
                <div key={i} className="bg-white flex justify-between p-2">
                  <div className="w-1/2">{left <= numPages && <Page pageNumber={left}  />}</div>
                  <div className="w-1/2">{right <= numPages && <Page pageNumber={right} />}</div>
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
        <div className="w-full align-center justify-center">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default PdfFlipbookModal;
