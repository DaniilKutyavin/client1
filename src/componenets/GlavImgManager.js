// src/components/GlavImgManager.jsx
import React, { useState, useEffect } from "react";
import { getGlavImgs, addGlavImg, deleteGlavImg } from "../http/glawimgApi"; // Import API functions 

const GlavImgManager = () => {
  const [glavImgs, setGlavImgs] = useState([]);
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    fetchGlavImgs();
  }, []);

  const fetchGlavImgs = async () => {
    try {
      const data = await getGlavImgs();
      setGlavImgs(data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  const handleAddImg = async () => {
    if (!imgFile) return alert("Please select an image file");
    try {
      const formData = new FormData();
      formData.append("img", imgFile);
      await addGlavImg(formData);
      setImgFile(null); // Reset file input
      fetchGlavImgs(); // Refresh the list
    } catch (error) {
      console.error("Error adding image", error);
    }
  };

  const handleDeleteImg = async (id) => {
    try {
      await deleteGlavImg(id);
      fetchGlavImgs(); // Refresh the list
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  return (
    <div style={{ marginTop: 200 }}>
      <h2>Изображения на главной страницце</h2>
      <input type="file" onChange={(e) => setImgFile(e.target.files[0])} />
      <button onClick={handleAddImg}>Добавить изображение</button>

      <ul>
        {glavImgs.map((img) => (
          <li key={img.id}>
            <img src={process.env.REACT_APP_API_URL + img?.img}  alt="GlavImg" width="100" />
            <button onClick={() => handleDeleteImg(img.id)}>удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlavImgManager;
