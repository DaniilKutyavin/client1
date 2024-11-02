import React, { useState, useEffect } from "react";
import { createProductSZR } from "../http/productApi"; // Update the path as necessary
import "../style/ProductBuyForm.css"; // Import your CSS file
import { getManufacturersByTypeOne } from "../http/manufacturerApi";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "1", // Always set type to 1
    description: "",
    description_low: "",
    desc_header: "",
    weight: "",
    culture: "",
    category: "",
    waiting: "",
    manufacturer: "",
    expenditure: "",
    shelf: "",
    conditions: "",
    packaging: "",
    htmlTable: "",
    adva: [],
    desc: [],
  });
  const [manufacturers, setManufacturers] = useState([]);
  const [loadingManufacturers, setLoadingManufacturers] = useState(true);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const data = await getManufacturersByTypeOne();
        setManufacturers(data);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      } finally {
        setLoadingManufacturers(false);
      }
    };

    fetchManufacturers();
  }, []);

  const [files, setFiles] = useState({
    img: null,
    certificate: null,
    presentation: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: selectedFiles[0],
    }));
  };

  const addAdvantage = () => {
    setFormData((prevData) => ({
      ...prevData,
      adva: [...prevData.adva, { text: "" }],
    }));
  };

  const addDescription = () => {
    setFormData((prevData) => ({
      ...prevData,
      desc: [...prevData.desc, { title: "", text: "" }],
    }));
  };

  const handleAdvantageChange = (index, value) => {
    setFormData((prevData) => {
      const newAdva = prevData.adva.map((item, i) =>
        i === index ? { text: value } : item
      );
      return {
        ...prevData,
        adva: newAdva,
      };
    });
  };

  const handleDescriptionChange = (index, field, value) => {
    setFormData((prevData) => {
      const newDesc = prevData.desc.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return {
        ...prevData,
        desc: newDesc,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formDataToSubmit.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    formDataToSubmit.append("img", files.img);
    formDataToSubmit.append("certificate", files.certificate);
    formDataToSubmit.append("presentation", files.presentation);

    try {
      const product = await createProductSZR(formDataToSubmit);
      console.log("Product created:", product);
      // Reset form and state if necessary
      setFormData({
        name: "",
        price: "",
        type: "1", // Reset type to 1
        description: "",
        description_low: "",
        desc_header: "",
        weight: "",
        culture: "",
        category: "",
        waiting: "",
        manufacturer: "",
        expenditure: "",
        shelf: "",
        conditions: "",
        packaging: "",
        htmlTable: "",
        adva: [],
        desc: [],
      });
      setFiles({
        img: null,
        certificate: null,
        presentation: null,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="productBuyForm_container">
      <h2>Создать ХСЗР</h2>
      <form onSubmit={handleSubmit}>
        <div className="productBuyForm_group">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Название"
            required
          />
        </div>
        <div className="productBuyForm_group">
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Цена"
            required
          />
        </div>
        <div className="productBuyForm_group">
          <input
            name="type"
            value={formData.type} // Keep type as a constant
            readOnly // Make it read-only since it's always 1
          />
        </div>
        <div className="productBuyForm_group">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Описание"
          />
        </div>
        <div className="productBuyForm_group">
          <input
            name="desc_header"
            value={formData.desc_header}
            onChange={handleChange}
            placeholder="Описание в шапке"
          />
        </div>
        <div className="productBuyForm_group">
          <textarea
            name="description_low"
            value={formData.description_low}
            onChange={handleChange}
            placeholder="Нижнее описание"
          />
        </div>
        <div className="productBuyForm_group">
          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Вес"
          />
        </div>
        <div className="productBuyForm_group">
          <select
            name="culture"
            value={formData.culture}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Выберите культуру
            </option>
            <option value="Зерновые">Зерновые</option>
            <option value="Кукуруза">Кукуруза</option>
            <option value="Подсолнечник">Подсолнечник</option>
            <option value="Сахарная свекла">Сахарная свекла</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="productBuyForm_group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Выберите категорию
            </option>
            <option value="Гербициды">Гербициды</option>
            <option value="Инсектициды">Инсектициды</option>
            <option value="Фунгициды">Фунгициды</option>
            <option value="Протравители">Протравители</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="productBuyForm_group">
          <select
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Выберите производителя
            </option>
            {loadingManufacturers ? (
              <option>Загрузка...</option>
            ) : (
              manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.name}>
                  {manufacturer.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="productBuyForm_group">
          <input
            name="waiting"
            value={formData.waiting}
            onChange={handleChange}
            placeholder="Срок ожидания и кратность ..."
          />
        </div>

        <div className="productBuyForm_group">
          <input
            name="expenditure"
            value={formData.expenditure}
            onChange={handleChange}
            placeholder="Расход рабочей жидкости"
          />
        </div>
        <div className="productBuyForm_group">
          <input
            name="shelf"
            value={formData.shelf}
            onChange={handleChange}
            placeholder="Срок хранения"
          />
        </div>
        <div className="productBuyForm_group">
          <input
            name="conditions"
            value={formData.conditions}
            onChange={handleChange}
            placeholder="Условия хранения"
          />
        </div>
        <div className="productBuyForm_group">
          <input
            name="packaging"
            value={formData.packaging}
            onChange={handleChange}
            placeholder="Упаковка"
          />
        </div>
        <div className="productBuyForm_group">
          <input
            name="htmlTable"
            value={formData.htmlTable}
            onChange={handleChange}
            placeholder="HTML Таблица"
          />
        </div>

        <div>
          <h3>Преимущества</h3>
          {formData.adva.map((adv, index) => (
            <input
              key={index}
              value={adv.text}
              onChange={(e) => handleAdvantageChange(index, e.target.value)}
              placeholder="Преимущество"
            />
          ))}
          <button
            type="button"
            className="productBuyForm_addInfoButton"
            onClick={addAdvantage}
          >
            Добавить преимущество
          </button>
        </div>

        <div>
          <h3>Описание</h3>
          {formData.desc.map((desc, index) => (
            <div key={index}>
              <input
                value={desc.title}
                onChange={(e) =>
                  handleDescriptionChange(index, "title", e.target.value)
                }
                placeholder="Заголовок"
              />
              <textarea
                value={desc.text}
                onChange={(e) =>
                  handleDescriptionChange(index, "text", e.target.value)
                }
                placeholder="Описание"
              />
            </div>
          ))}
          <button
            type="button"
            className="productBuyForm_addInfoButton"
            onClick={addDescription}
          >
            Добавить описание
          </button>
        </div>

        <div className="productBuyForm_group">
          Фото:
          <input
            type="file"
            name="img"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          <p></p>
          Файл 1:
          <input
            type="file"
            name="certificate"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
          <p></p>
          Файл 2:
          <input
            type="file"
            name="presentation"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </div>

        <button type="submit" className="productBuyForm_submitButton">
          Создать продукт
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
