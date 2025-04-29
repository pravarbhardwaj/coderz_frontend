import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfSwiperModal = ({ isOpen, onClose, pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const swiperRef = useRef(null); // reference to swiper instance

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] p-4 overflow-hidden flex flex-col">
        
       
        {/* PDF Swiper */}
        <div className="flex-1 overflow-y-auto">
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
                className="w-full"
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center items-center bg-white p-2"
                  >
                    <Page pageNumber={index + 1} />
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
        </div>
      </div>
    </div>
  );
};

export default PdfSwiperModal;
