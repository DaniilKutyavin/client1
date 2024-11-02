import React, { useState, useEffect } from "react";
import { createProductPOS } from "../http/productApi"; // Update the path as necessary
import { getManufacturersByTypeThree } from "../http/manufacturerApi";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "3",
    desc_header: "",
    description: "",
    description_low: "",
    weight: "",
    culture: "",
    fertilizers: "",
    manufacturer: "",
    way: "",
    ground: "",
    descThree: "",
    adva: [],
    stabil: [],
    productiv: [],
  });

  const [files, setFiles] = useState({
    img: null,
    certificate: null,
    presentation: null,
  });

  const [manufacturers, setManufacturers] = useState([]);
  const [loadingManufacturers, setLoadingManufacturers] = useState(true);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const data = await getManufacturersByTypeThree();
        setManufacturers(data);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      } finally {
        setLoadingManufacturers(false);
      }
    };

    fetchManufacturers();
  }, []);

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

  const addStabil = () => {
    setFormData((prevData) => ({
      ...prevData,
      stabil: [...prevData.stabil, { text: "" }],
    }));
  };

  const addProductiv = () => {
    setFormData((prevData) => ({
      ...prevData,
      productiv: [...prevData.productiv, { text: "" }],
    }));
  };

  const handleAdvantageChange = (index, value) => {
    setFormData((prevData) => {
      const newAdva = prevData.adva.map((item, i) =>
        i === index ? { text: value } : item
      );
      return { ...prevData, adva: newAdva };
    });
  };

  const handleStabilChange = (index, value) => {
    setFormData((prevData) => {
      const newStabil = prevData.stabil.map((item, i) =>
        i === index ? { text: value } : item
      );
      return { ...prevData, stabil: newStabil };
    });
  };

  const handleProdChange = (index, value) => {
    setFormData((prevData) => {
      const newProd = prevData.productiv.map((item, i) =>
        i === index ? { text: value } : item
      );
      return { ...prevData, productiv: newProd };
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
      const product = await createProductPOS(formDataToSubmit);
      console.log("Product created:", product);
      setFormData({
        name: "",
        price: "",
        type: "3",
        desc_header: "",
        description: "",
        description_low: "",
        weight: "",
        culture: "",
        fertilizers: "",
        manufacturer: "",
        way: "",
        ground: "",
        descThree: "",
        adva: [],
        stabil: [],
        productiv: [],
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
      <h2>Создать посевной материал</h2>
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
            value={formData.type}
            onChange={handleChange}
            placeholder="Тип"
            readOnly // Делаем поле только для чтения
          />
        </div>
        <div className="productBuyForm_group">
          <textarea
            name="desc_header"
            value={formData.desc_header}
            onChange={handleChange}
            placeholder="Текст в шапке"
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
            <option value="">Выберите культуру</option>
            <option value="культура1">Культура 1</option>
            <option value="культура2">Культура 2</option>
            {/* Добавьте другие культуры по необходимости */}
          </select>
        </div>

        <div className="productBuyForm_group">
          <select
            name="fertilizers"
            value={formData.fertilizers}
            onChange={handleChange}
            required
          >
            <option value="">Выберите удобрение</option>
            <option value="удобрение1">Удобрение 1</option>
            <option value="удобрение2">Удобрение 2</option>
            {/* Добавьте другие удобрения по необходимости */}
          </select>
        </div>

        <div className="productBuyForm_group">
          <select
            name="way"
            value={formData.way}
            onChange={handleChange}
            required
          >
            <option value="">Выберите способ внесения</option>
            <option value="способ1">Способ 1</option>
            <option value="способ2">Способ 2</option>
            {/* Добавьте другие способы по необходимости */}
          </select>
        </div>

        <div className="productBuyForm_group">
          <select
            name="ground"
            value={formData.ground}
            onChange={handleChange}
            required
          >
            <option value="">Выберите вид грунта</option>
            <option value="грунт1">Грунт 1</option>
            <option value="грунт2">Грунт 2</option>
            {/* Добавьте другие виды грунта по необходимости */}
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
            name="descTwo"
            value={formData.descTwo}
            onChange={handleChange}
            placeholder="Описание самое нижнее"
          />
        </div>

        <div className="productBuyForm_group">
          <h3>Характеристики</h3>
          {formData.adva.map((adv, index) => (
            <input
              key={index}
              value={adv.text}
              onChange={(e) => handleAdvantageChange(index, e.target.value)}
              placeholder="Характеристика"
            />
          ))}
          <button
            type="button"
            className="productBuyForm_addInfoButton"
            onClick={addAdvantage}
          >
            Добавить характеристику
          </button>
        </div>

        <div className="productBuyForm_group">
          <h3>Устойчивость</h3>
          {formData.stabil.map((stab, index) => (
            <input
              key={index}
              value={stab.text}
              onChange={(e) => handleStabilChange(index, e.target.value)}
              placeholder="Stabil"
            />
          ))}
          <button
            type="button"
            className="productBuyForm_addInfoButton"
            onClick={addStabil}
          >
            Добавить Устойчивость
          </button>
        </div>

        <div className="productBuyForm_group">
          <h3>Урожайность</h3>
          {formData.productiv.map((prod, index) => (
            <input
              key={index}
              value={prod.text}
              onChange={(e) => handleProdChange(index, e.target.value)}
              placeholder="Productivity"
            />
          ))}
          <button
            type="button"
            className="productBuyForm_addInfoButton"
            onClick={addProductiv}
          >
            Добавить урожайность
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
