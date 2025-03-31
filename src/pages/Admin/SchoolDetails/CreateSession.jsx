import { useState } from "react";
import React from "react";
import { patchAPI, postAPI } from "../../../request/APIManager";

const CreateSession = ({
  projectId,
  setOpenSession,
  navigation,
  getSessionData = null,
  editData = {},
  edit = false,
}) => {
  const [sessionData, setSessionData] = useState({
    title: editData["title"] ?? "",
    overview_text: editData["overview_text"] ?? "",
    ppt_file: null,
    module_name: editData["module_name"] ?? "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSessionData({ ...sessionData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("project", projectId);
    Object.entries(sessionData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await postAPI(
        navigation,
        "projects/project-sessions/create/",
        formDataToSend,
        true
      );
      if (response) {
        alert("Session added successfully!");
        setOpenSession(false);
      } else {
        alert("Failed to add session.");
      }
    } catch (error) {
      console.error("Error submitting session:", error);
      alert("An error occurred.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.entries(sessionData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (!sessionData["ppt_file"]) {
      formDataToSend.delete("ppt_file");
    }

    if (!sessionData["thumbnail"]) {
      formDataToSend.delete("thumbnail");
    }

    try {
      const response = await patchAPI(
        navigation,
        "projects/project-sessions/update/" + editData["id"] + "/",
        formDataToSend,
        true
      );
      if (response) {
        alert("Session updated successfully!");
        setOpenSession(false);
        getSessionData();
      } else {
        alert("Failed to add session.");
      }
    } catch (error) {
      console.error("Error submitting session:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {edit ? "Edit" : "Add"} Session
        </h2>
        <form
          onSubmit={edit ? handleUpdate : handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Session Title"
            value={sessionData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="overview_text"
            placeholder="Overview"
            value={sessionData.overview_text}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="module_name"
            placeholder="Module Name"
            value={sessionData.module_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <div>
            <div>PPT</div>
            <input
              type="file"
              name="ppt_file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required={edit ? false : true}
            />
          </div>
          <div>
            <div>Thumbnail</div>
            <input
              type="file"
              name="thumbnail"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required={edit ? false : true}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => setOpenSession(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {edit ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
