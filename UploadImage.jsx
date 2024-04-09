import React, { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "your_upload_preset");
    data.append("cloud_name", "your_cloud_name");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/{cloud_name}/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      setImagePreview(result.secure_url); // secure_url give the image url after upload
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleSubmit}>Upload</button>
      </div>
      {imagePreview && <img src={imagePreview} alt="Uploaded" />}
    </div>
  );
};

export default UploadImage;
