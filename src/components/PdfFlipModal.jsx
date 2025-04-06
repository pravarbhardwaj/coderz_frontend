import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfFlipModal = ({ fileUrl, onClose }) => {
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-[90vw] h-[90vh] bg-white rounded-lg shadow-lg p-4 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 rounded px-2"
        >
          Close
        </button>

        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading="Loading PDF..."
          >
            {numPages && (
              <HTMLFlipBook width={500} height={650}>
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={index}>
                    <Page pageNumber={index + 1} width={500} />
                  </div>
                ))}
              </HTMLFlipBook>
            )}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfFlipModal;
