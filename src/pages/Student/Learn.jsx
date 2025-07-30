import axios from "axios";
import PdfSwiperModal from "../../components/PdfSwiperModal";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";

function Learn() {
  const [pdfName, setPdfName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    setLoading(true);
    axios
      .get(
        `https://apiv2.questplus.in/api/get-content-by-user/?user_id=${userId}`
      )
      .then((res) => {
        const sortedData = [...res.data.data].sort((a, b) =>
          a.missionId.localeCompare(b.missionId)
        );
        setData(sortedData);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        setError("Failed to fetch content.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const isPaper = (name = "") =>
    name.toLowerCase().includes("question") ||
    name.toLowerCase().includes("answer");

  const pdfs = data.filter(
    (item) => item.contentTypeCode === "04" && !isPaper(item.contentName)
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PdfSwiperModal
        isOpen={open}
        onClose={() => setOpen(false)}
        pdfUrl={selectedPdf}
        pdfName={pdfName}
      />
      <div>
        {loading ? (
         <Loading />
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : pdfs.length === 0 ? (
          <div className="text-center text-gray-500 py-10 text-2xl">
            No PDFs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pdfs.map((pdf) => (
              <div
                key={pdf.qcId}
                className="border p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setSelectedPdf(pdf.fileUrl);
                  setOpen(true);
                }}
              >
                <h3 className="text-lg font-semibold">{pdf.contentName}</h3>
                <p className="text-sm text-gray-500">
                  {pdf.operationDisplayName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Learn;
