import { useState } from "react";
import axios from "axios";
import React from "react";
import { postAPI } from "../request/APIManager";

const AssetUploadForm = ({ project, navigation, setOpenAssets, getAdminProjects }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => ({
      file,
      type: "image", // Default type
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleFileTypeChange = (index, type) => {
    const updatedFiles = [...files];
    updatedFiles[index].type = type;
    setFiles(updatedFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }

    setUploading(true);
    setError(null);
    const formData = new FormData();

    files.forEach(({ file }) => {
      formData.append("asset_files", file);
    });
    formData.append(
      "file_types",
      JSON.stringify(files.map(({ type }) => type))
    );

    try {
      const response = await postAPI(navigation, 
        `/projects/classroom-projects/${project.id}/assets/`,
        formData,
       true
      );
      if (response) {
        alert("Assets Uploaded!")
      }
      else {
        alert("Something went wrong!")
      }
      
      setUploading(false);
      setFiles([]); // Reset after successful upload
      setOpenAssets(false)
      getAdminProjects()
    } catch (err) {
      setUploading(false);
      setError("Upload failed. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Upload Project Assets</h2>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none file:bg-blue-500 file:border-none file:text-white file:py-2 file:px-4"
      />

      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((fileObj, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
            >
              <span className="text-sm truncate w-32">{fileObj.file.name}</span>
              <select
                value={fileObj.type}
                onChange={(e) => handleFileTypeChange(index, e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="image">Image</option>
                <option value="pdf">PDF</option>
              </select>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 text-sm ml-2"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default AssetUploadForm;
