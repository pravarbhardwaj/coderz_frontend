import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const AssetCard = ({ asset, onImageClick, onPdfClick }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-gray-50 w-64">
      {asset.file_type === "image" ? (
        <img
          src={asset.file}
          alt="Asset"
          className="w-full h-40 object-cover rounded-md cursor-pointer"
          onClick={() => onImageClick(asset.file)}
        />
      ) : asset.file_type === "pdf" ? (
        <div className="flex flex-col items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
            alt="PDF Icon"
            className="w-20 h-20"
          />
          <p className="mt-2 font-semibold">Lesson Plan</p>
          <button
            onClick={() => onPdfClick(asset.file)}
            className="mt-2 border px-4 py-2 rounded-md text-blue-600 border-blue-600"
          >
            View
          </button>
        </div>
      ) : null}
    </div>
  );
};

const AssetGallery = ({ assets }) => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const closeModal = () => {
    setExpandedImage(null);
    setPdfUrl(null);
  };

  return (
    <div>
      {(expandedImage || pdfUrl) && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
          <div className="relative bg-white rounded-md max-w-[90vw] max-h-[90vh] overflow-auto shadow-xl p-4">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full shadow-md z-50"
              onClick={closeModal}
            >
              ✖
            </button>

            {/* Image View */}
            {expandedImage && (
              <img
                src={expandedImage}
                alt="Expanded"
                className="max-w-full max-h-[80vh]"
              />
            )}

            {/* PDF View */}
            {pdfUrl && (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-col gap-4 items-center"
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onImageClick={setExpandedImage}
            onPdfClick={setPdfUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default function Asset({ assets }) {
  if (assets.length === 0) {
    return <p className="text-xl mt-5">No Assets!</p>;
  }

  return (
    <div className="p-6">
      <AssetGallery assets={assets} />
    </div>
  );
}
