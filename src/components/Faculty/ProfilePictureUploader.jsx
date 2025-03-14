import React, { useState } from 'react'
import { Pencil, User } from "lucide-react";

function ProfilePictureUploader() {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="relative w-40 h-40 flex items-center justify-center border rounded-lg overflow-hidden shadow-md bg-gray-100">
        {image ? (
          <img src={image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <User size={64} className="text-gray-400" />
        )}
        <label
          htmlFor="file-upload"
          className="absolute bottom-2 right-2 bg-blue-300 p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-400 transition"
        >
          <Pencil size={16} className="text-white" />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    );
}

export default ProfilePictureUploader