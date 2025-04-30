import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfSwiperModal = ({ isOpen, onClose, pdfUrl, pdfName }) => {
  const [numPages, setNumPages] = useState(null);
  const swiperRef = useRef(null); // reference to swiper instance

  // If the modal isn't open, return null
  if (!isOpen) return null;
  console.log("pdf name - ", pdfName);
  // Helper function to check if it's a "paper" PDF (has "question" or "answer" in name)
  const isPaper = (name = "") => name.toLowerCase().includes("question");

  // Function to handle PDF download
  const handleDownload = async () => {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = pdfName || "document.pdf"; // Default name if pdfName is unavailable
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url); // Clean up URL object
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 items-center justify-center">
      <div>
        {/* PDF Swiper */}
        <div className="flex-1">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<div className="text-center py-10">📄 Loading PDF...</div>}
          >
            {numPages && (
              <Swiper
                modules={[Navigation, Pagination]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className="w-full h-full"
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center items-center bg-white p-2"
                  >
                    <Page
                      pageNumber={index + 1}
                      height={window.innerHeight * 0.8} // full screen height
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Document>
        </div>

        {/* Control Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={swiperRef.current?.isBeginning}
          >
            Previous
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={swiperRef.current?.isEnd}
          >
            Next
          </button>
          {isPaper(pdfName) && (
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfSwiperModal;
