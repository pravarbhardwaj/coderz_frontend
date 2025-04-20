import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { getAPI, patchAPI, postAPI } from "../../request/APIManager";

export default function CreateProject({
  navigation,
  getAdminProjects,
  edit = false,
  setOpenCreate,
  editData = {},
}) {
  const [formData, setFormData] = useState({
    title: editData ? editData["title"] ?? "" : "",
    description: editData ? editData["description"] ?? "" : "",
    group: editData ? editData["groupId"] : "",
    due_date: editData ? editData["due_date"] ?? "" : "",
    thumbnail: null,
  });

  const [projectId, setProjectId] = useState(null);
  const [assets, setAssets] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [groupMapping, setGroupMapping] = useState([]);

  useEffect(() => {
    fetchAllGroups();
  }, []);

  const fetchAllGroups = async () => {
    const response = await getAPI(
      navigation,
      "/accounts/admin/grade-division-mapping/"
    );

    setGroupMapping([...response.group_names]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await postAPI(
        navigation,
        "projects/classroom-projects/",
        formData,
        true
      );
      if (response) {
        alert("Project added successfully!");
        getAdminProjects();
        setOpenCreate(false)
      } else {
        alert("Failed to add project.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (!formData["thumbnail"]) {
      formDataToSend.delete("thumbnail");
    }

    try {
      const response = await patchAPI(
        navigation,
        "projects/classroom-projects/" + editData["id"] + "/",
        formData,
        true
      );

      if (response) {
        alert("Project updated successfully!");

        getAdminProjects();
      } else {
        alert("Failed to update project.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred.");
    }
  };

  const addSession = () => {
    setSessions([
      ...sessions,
      { title: "", overview_text: "", ppt_file: null, module_name: "" },
    ]);
  };

  const removeSession = (index) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const handleSessionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSessions = [...sessions];
    updatedSessions[index][name] = value;
    setSessions(updatedSessions);
  };

  const handleSessionFileChange = (index, e) => {
    const updatedSessions = [...sessions];
    updatedSessions[index].ppt_file = e.target.files[0];
    setSessions(updatedSessions);
  };

  const handleSessionUpload = async (index) => {
    const sessionData = new FormData();
    sessionData.append("project", projectId);
    Object.entries(sessions[index]).forEach(([key, value]) => {
      sessionData.append(key, value);
    });
    try {
      const response = await fetch(
        `https://api.example.com/projects/${projectId}/sessions`,
        {
          method: "POST",
          body: sessionData,
        }
      );
      if (response) {
        alert("Session uploaded successfully!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error uploading session:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {edit ? "Update" : "Add"} Project
      </h2>
      <form onSubmit={edit ? handleUpdate : handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div>
          <FormControl className="w-full">
            <InputLabel>Group*</InputLabel>
            <Select
              value={formData["group"]}
              label="Group*"
              onChange={(value) => {
                setFormData({ ...formData, ["group"]: value.target.value });
              }}
              className="w-full"
              required
            >
              {groupMapping.map((item) => (
                <MenuItem value={item.GroupId}>
                  {item.LID__LocationName} - {item.GID__GroupName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          Due Date:
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <div>Thumbnail:</div>
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required={edit ? false : true}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {edit ? "Update" : "Submit"}
        </button>
      </form>

      {projectId && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Manage Project</h3>
          <button
            className="w-full bg-green-500 text-white py-2 mt-2 rounded hover:bg-green-600"
            onClick={addSession}
          >
            Add Session
          </button>
          {sessions.map((session, index) => (
            <div key={index} className="mt-4 p-4 border rounded">
              <input
                type="text"
                name="title"
                placeholder="Session Title"
                value={session.title}
                onChange={(e) => handleSessionChange(index, e)}
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                name="ppt_file"
                onChange={(e) => handleSessionFileChange(index, e)}
                className="w-full p-2 border rounded"
              />
              <button
                className="w-full bg-red-500 text-white py-2 mt-2 rounded hover:bg-red-600"
                onClick={() => removeSession(index)}
              >
                Remove
              </button>
              <button
                className="w-full bg-purple-500 text-white py-2 mt-2 rounded hover:bg-purple-600"
                onClick={() => handleSessionUpload(index)}
              >
                Upload Session
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
