import axios from "axios";
import PdfSwiperModal from "../../components/PdfSwiperModal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../request/APIManager";
import Loading from "../../components/Loading";

const Practice = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);



  const [data, setData] = useState([]);

  const sendActivity = async (paper) => {
    const payload = {
      "UserId": localStorage.getItem('user_id'),
      "location_id": "",
      "group_id": "",
      "quest_id": paper.qcId,
      "content_id": paper.contentId,
      "content_type_code": "4",
      "access_count": 1,
      "total_access_duration": 0.0,
      "first_access_duration": 0.0,
      "points": 1.0
    }
    try {
      const response = await postAPI(navigator, '/accounts/mission-activity/', payload)
    }
    catch (err) {
      console.log("Error: ", err)
    }
  }

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
          <Loading />
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
                  sendActivity(paper)
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
