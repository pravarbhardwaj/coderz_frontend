import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { getAPI, patchAPI, postAPI } from "../../request/APIManager";

export default function CreateProject({
  navigation,
  getAdminProjects,
  edit = false,
  setOpenCreate,
  editData,
}) {
  editData = editData || {};
  const [formData, setFormData] = useState({
    title: editData?.title ?? "",
    description: editData?.description ?? "",
    group: editData?.groupId ?? [],
    due_date: editData?.due_date ?? "",
    thumbnail: null,
  });

  const [sessions, setSessions] = useState(
    edit
      ? []
      : [
          {
            title: "",
            overview_text: "",
            ppt_file: null,
            thumbnail: null,
            module_name: "",
          },
        ]
  );
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
    const file = e.target.files[0];
    if (!file) return;

    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedImageTypes.includes(file.type)) {
      alert("Only JPG, JPEG, or PNG files are allowed for the thumbnail.");
      e.target.value = "";
      return;
    }

    setFormData({ ...formData, thumbnail: file });
  };

  const handleSessionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSessions = [...sessions];
    updatedSessions[index][name] = value;
    setSessions(updatedSessions);
  };

  const handleSessionFileChange = (index, e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    const allowedPdfTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];

    if (fieldName === "thumbnail") {
      if (!allowedImageTypes.includes(file.type)) {
        alert(
          "Only JPG, JPEG, or PNG files are allowed for session thumbnails."
        );
        e.target.value = "";
        return;
      }
    } else if (fieldName === "ppt_file") {
      if (!allowedPdfTypes.includes(file.type)) {
        alert("Only PDF files are allowed for session PPT.");
        e.target.value = "";
        return;
      }
    }

    const updatedSessions = [...sessions];
    updatedSessions[index][fieldName] = file;
    setSessions(updatedSessions);
  };

  const addSession = () => {
    setSessions([
      ...sessions,
      {
        title: "",
        overview_text: "",
        ppt_file: null,
        thumbnail: null,
        module_name: "",
      },
    ]);
  };

  const removeSession = (index) => {
    if (sessions.length > 1) {
      setSessions(sessions.filter((_, i) => i !== index));
    }
  };

  const buildFormData = () => {
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "group" && Array.isArray(value)) {
        value.forEach((groupId) => {
          formDataToSend.append("group", groupId);
        });
      } else if (value) {
        formDataToSend.append(key, value);
      }
    });

    sessions.forEach((session, index) => {
      Object.entries(session).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(`sessions[${index}]${key}`, value);
        }
      });
    });

    return formDataToSend;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = buildFormData();

    try {
      const response = await postAPI(
        navigation,
        "projects/classroom-projects/",
        formDataToSend,
        true
      );

      if (response) {
        alert("Project added successfully!");
        getAdminProjects();
        setOpenCreate(false);
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
    const formDataToSend = buildFormData();

    try {
      const response = await patchAPI(
        navigation,
        `projects/classroom-projects/${editData.id}/`,
        formDataToSend,
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

  const isFormValid = () => {
    const { title, description, group, due_date, thumbnail } = formData;
    if (
      !title ||
      !description ||
      !due_date ||
      !group.length ||
      (!edit && !thumbnail)
    ) {
      return false;
    }

    for (let session of sessions) {
      if (
        !session.title ||
        !session.overview_text ||
        !session.ppt_file ||
        !session.thumbnail ||
        !session.module_name
      ) {
        return false;
      }
    }

    return true;
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
        <FormControl className="w-full">
          <InputLabel>Group*</InputLabel>
          <Select
            multiple
            value={formData.group}
            label="Group*"
            disabled={edit}
            onChange={(event) => {
              const value = event.target.value;
              setFormData({
                ...formData,
                group: typeof value === "string" ? value.split(",") : value,
              });
            }}
            className="w-full"
            required
            renderValue={(selected) =>
              groupMapping
                .filter((item) => selected.includes(item.GroupId))
                .map(
                  (item) => `${item.LID__LocationName} - ${item.GID__GroupName}`
                )
                .join(", ")
            }
          >
            {groupMapping.map((item) => (
              <MenuItem
                key={item.GroupId}
                value={item.GroupId}
                style={{
                  backgroundColor: formData.group.includes(item.GroupId)
                    ? "#e3f2fd"
                    : "inherit",
                  fontWeight: formData.group.includes(item.GroupId) ? 600 : 400,
                }}
              >
                {item.LID__LocationName} - {item.GID__GroupName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>
          <label>Due Date:</label>
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
          <label>Thumbnail:</label>
          <input
            type="file"
            name="thumbnail"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required={!edit}
          />
        </div>

        {!edit && (
          <div>
            <h3 className="text-lg font-bold mt-6">Add Sessions</h3>
            {sessions.map((session, index) => (
              <div key={index} className="mt-4 p-4 border rounded">
                <input
                  type="text"
                  name="title"
                  placeholder="Session Title"
                  value={session.title}
                  onChange={(e) => handleSessionChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <textarea
                  name="overview_text"
                  placeholder="Overview"
                  value={session.overview_text}
                  onChange={(e) => handleSessionChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  type="text"
                  name="module_name"
                  placeholder="Module Name"
                  value={session.module_name}
                  onChange={(e) => handleSessionChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <div>
                  <label className="block mb-1">PPT File:</label>
                  <input
                    type="file"
                    accept=".pdf,.pptx"
                    onChange={(e) =>
                      handleSessionFileChange(index, e, "ppt_file")
                    }
                    className="w-full p-2 border rounded mb-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Thumbnail:</label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleSessionFileChange(index, e, "thumbnail")
                    }
                    className="w-full p-2 border rounded mb-2"
                    required
                  />
                </div>
                {index !== 0 && (
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 mt-2"
                    onClick={() => removeSession(index)}
                  >
                    Remove Session
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSession}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Add Session
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full text-white py-2 rounded ${
            isFormValid()
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {edit ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
