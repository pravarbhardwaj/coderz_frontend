import axios from "axios";
import PdfSwiperModal from "../../components/PdfSwiperModal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Practice = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
  const [pdfName, setPdfName] = useState("");
    const [selectedPdf, setSelectedPdf] = useState(null);
  


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

  const cleanTitle = (title = "") => title.replace(/-MCQ$/i, "").trim();
  
  const papers = data.filter(
    (item) => item.contentTypeCode === "04" && isPaper(item.contentName)
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
          <div className="text-center text-gray-500 py-10 text-2xl">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : papers.length === 0 ? (
                <div className="text-center text-gray-500 py-10 text-2xl">
                  No papers found.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {papers.map((paper) => (
                    <div
                      key={paper.qcId}
                      className="border p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setPdfName(paper.contentName);
                        setSelectedPdf(paper.fileUrl);
                        setOpen(true);
                      }}
                    >
                      <h3 className="text-lg font-semibold">
                        {paper.contentName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {paper.operationDisplayName}
                      </p>
                    </div>
                  ))}
                </div>
              )}
      </div>
    </div>
  );
}

export default Practice;
