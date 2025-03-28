import React, { useState } from "react";

const AssetCard = ({ asset, onImageClick }) => {
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
          <a
            href={asset.file}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 border px-4 py-2 rounded-md text-blue-600 border-blue-600 flex items-center gap-1"
          >
            View
          </a>
        </div>
      ) : null}
    </div>
  );
};

const AssetGallery = ({ assets }) => {
  const [expandedImage, setExpandedImage] = useState(null);

  return (
    <div>
      {expandedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <img
            src={expandedImage}
            alt="Expanded"
            className="max-w-full max-h-full"
          />
          <button
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
            onClick={() => setExpandedImage(null)}
          >
            ✖
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onImageClick={setExpandedImage}
          />
        ))}
      </div>
    </div>
  );
};

export default function Asset({assets}) {
if (assets.length == 0) {
    return (
        <p className="text-xl mt-5">No Assets!</p>
    )
}

  return (
    <div className="p-6">
      <AssetGallery assets={assets} />
    </div>
  );
}
