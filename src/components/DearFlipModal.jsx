import { useEffect, useRef, useState } from "react";
import React from "react";

const DearFlipModal = ({ pdfUrl, open, onClose }) => {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Load DearFlip only once
  useEffect(() => {
    if (window.DFLIP) {
      setReady(true);
      return;
    }

    const loadAssets = async () => {
      const loadScript = (src) =>
        new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

      const loadCss = (href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      };

      try {
        loadCss("https://cdn.jsdelivr.net/npm/dearflip@2.1.0/css/dflip.min.css");
        loadCss("https://cdn.jsdelivr.net/npm/dearflip@2.1.0/css/themify-icons.min.css");
        await loadScript("https://cdn.jsdelivr.net/npm/dearflip@2.1.0/js/dflip.min.js");

        if (window.DFLIP) {
          setReady(true);
        } else {
          console.error("DFLIP not available after loading script.");
        }
      } catch (err) {
        console.error("Failed to load DearFlip assets", err);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (open && ready && window.DFLIP && containerRef.current) {
      containerRef.current.innerHTML = "";

      // This div is where DFLIP expects to create the viewer
      const bookDiv = document.createElement("div");
      bookDiv.className = "df-custom-book df-book";
      bookDiv.setAttribute("source", pdfUrl);
      containerRef.current.appendChild(bookDiv);

      // Force re-parse
      window.DFLIP.parse();
    }
  }, [open, ready, pdfUrl]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-5xl h-[90vh] relative">
        <button
          className="absolute top-3 right-4 text-2xl font-bold text-gray-700 hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>

        {!ready ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-lg">
            Loading flipbook...
          </div>
        ) : (
          <div ref={containerRef} className="w-full h-full overflow-hidden" />
        )}
      </div>
    </div>
  );
};

export default DearFlipModal;
