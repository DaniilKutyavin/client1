import React, { useState, useEffect } from "react";
import { createProductUDO } from "../http/productApi"; // Обновите путь, если необходимо
import { getManufacturersByTypeTwo } from "../http/manufacturerApi";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "2",
    desc_header: "", // Устанавливаем тип по умолчанию на 2
    description: "",
    description_low: "",
    weight: "",
    culture: "",
    fertilizers: "",
    manufacturer: "",
    way: "",
    ground: "",
    descTwo: "",
    adva: [],
    specif: [],
    keep: [],
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
        const data = await getManufacturersByTypeTwo();
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

  const addKeep = () => {
    setFormData((prevData) => ({
      ...prevData,
      keep: [...prevData.keep, { text: "" }],
    }));
  };

  const addSpec = () => {
    setFormData((prevData) => ({
      ...prevData,
      specif: [...prevData.specif, { text: "" }],
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

  const handleKeepChange = (index, value) => {
    setFormData((prevData) => {
      const newKeep = prevData.keep.map((item, i) =>
        i === index ? { text: value } : item
      );
      return { ...prevData, keep: newKeep };
    });
  };

  const handleSpecChange = (index, value) => {
    setFormData((prevData) => {
      const newSpec = prevData.specif.map((item, i) =>
        i === index ? { text: value } : item
      );
      return { ...prevData, specif: newSpec };
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
      const product = await createProductUDO(formDataToSubmit);
      console.log("Продукт создан:", product);
      setFormData({
        name: "",
        price: "",
        type: "2",
        desc_header: "", // Сбрасываем тип на 2
        description: "",
        description_low: "",
        weight: "",
        culture: "",
        fertilizers: "",
        manufacturer: "",
        way: "",
        ground: "",
        descTwo: "",
        adva: [],
        specif: [],
        keep: [],
      });
      setFiles({
        img: null,
        certificate: null,
        presentation: null,
      });
    } catch (error) {
      console.error("Ошибка при создании продукта:", error);
    }
  };

  return (
    <div className="productBuyForm_container">
      <h2>Создать удобрение</h2>
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
          <input
            name="desc_header"
            value={formData.desc_header}
            onChange={handleChange}
            placeholder="Описание в шапке"
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
            <option value="Зерновые">Зерновые</option>
            <option value="Масличные">Масличные</option>
            <option value="Зернобобовые">Зернобобовые</option>
            <option value="Овощные">Овощные</option>
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
            <option value="Фосфорные P">Фосфорные P</option>
            <option value="Калийные K">Калийные K</option>
            <option value="Комплексные N+P+K">Комплексные N+P+K</option>
            <option value="Водорастворимые">Водорастворимые</option>
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
            <option value="Основное внесение">Основное внесение</option>
            <option value="Припосевное внесение">Припосевное внесение</option>
            <option value="Листовые подкормки">Листовые подкормки</option>
            <option value="Фертигация">Фертигация</option>
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
            <option value="Открытый">Открытый</option>
            <option value="Закрытый">Закрытый</option>
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
          <h3>Преимущество</h3>
          {formData.specif.map((speci, index) => (
            <input
              key={index}
              value={speci.text}
              onChange={(e) => handleSpecChange(index, e.target.value)}
              placeholder="Преимущество"
            />
          ))}
          <button
            type="button"
            className="productBuyForm_addInfoButton"
            onClick={addSpec}
          >
            Добавить спецификацию
          </button>
        </div>

        <div className="productBuyForm_group">
          <h3>Упаковка и хранение</h3>
          {formData.keep.map((kee, index) => (
            <input
              key={index}
              value={kee.text}
              onChange={(e) => handleKeepChange(index, e.target.value)}
              placeholder="Хранение"
            />
          ))}
          <button
            type="button"
            className="productBuyForm_addInfoButton"
            onClick={addKeep}
          >
            Добавить хранение
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
