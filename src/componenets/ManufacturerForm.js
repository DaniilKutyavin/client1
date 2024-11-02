import React, { useState, useEffect } from "react";
import {
  createManufacturerOne,
  createManufacturerTwo,
  createManufacturerThree,
  getManufacturersByTypeOne,
  getManufacturersByTypeTwo,
  getManufacturersByTypeThree,
  deleteManufacturerOne,
  deleteManufacturerTwo,
  deleteManufacturerThree,
} from "../http/manufacturerApi";

const ManufacturerForm = () => {
  const [manufacturers, setManufacturers] = useState({}); // Объект для хранения производителей по категориям
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [typeId, setTypeId] = useState("1"); // Значение по умолчанию для категории

  useEffect(() => {
    fetchManufacturers(); // Получаем производителей при загрузке
  }, []);

  const fetchManufacturers = async () => {
    const data1 = await getManufacturersByTypeOne();
    const data2 = await getManufacturersByTypeTwo();
    const data3 = await getManufacturersByTypeThree();
    setManufacturers({
      1: data1,
      2: data2,
      3: data3,
    });
  };

  const handleManufacturerSubmit = async (e) => {
    e.preventDefault();
    const manufacturerData = new FormData();
    manufacturerData.append("name", name);
    manufacturerData.append("logo", logo);

    // Лог для отладки
    console.log("Submitting manufacturer:", { typeId, name, logo });

    // Создание нового или обновление существующего производителя
    if (selectedManufacturer) {
      // Обновление существующего производителя
      if (typeId === "1") {
        await createManufacturerOne(manufacturerData);
      } else if (typeId === "2") {
        await createManufacturerTwo(manufacturerData);
      } else {
        await createManufacturerThree(manufacturerData);
      }
    } else {
      // Создание нового производителя
      if (typeId === "1") {
        await createManufacturerOne(manufacturerData);
      } else if (typeId === "2") {
        await createManufacturerTwo(manufacturerData);
      } else {
        await createManufacturerThree(manufacturerData);
      }
    }

    resetForm();
    fetchManufacturers(); // Обновляем список производителей
  };

  const handleDeleteManufacturer = async (typeId, id) => {
    // Лог для отладки
    console.log("Deleting manufacturer:", { typeId, id });
    if (typeId === "1") {
      await deleteManufacturerOne(id);
    } else if (typeId === "2") {
      await deleteManufacturerTwo(id);
    } else {
      await deleteManufacturerThree(id);
    }
    fetchManufacturers(); // Обновляем список производителей после удаления
  };

  const resetForm = () => {
    setIsFormOpen(false);
    setSelectedManufacturer(null);
    setName("");
    setLogo(null);
    setTypeId("1"); // Сбрасываем к значению по умолчанию
  };

  const handleEditManufacturer = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setName(manufacturer.name);
    setTypeId(manufacturer.typeId); // Устанавливаем тип производителя
    setLogo(null); // Сбрасываем логотип для режима редактирования
    setIsFormOpen(true);
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  return (
    <div className="manufacturer-form-container" style={{ marginTop: 200 }}>
      <h1>Управление Производителями</h1>
      <button
        onClick={() => {
          resetForm();
          setIsFormOpen(true);
        }}
      >
        {isFormOpen ? "Закрыть форму" : "Добавить производителя"}
      </button>

      {isFormOpen && (
        <form onSubmit={handleManufacturerSubmit} className="footer-form">
          <h3>
            {selectedManufacturer
              ? "Редактировать Производителя"
              : "Добавить Производителя"}
          </h3>
          <label>
            Название:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Логотип:
            <input
              type="file"
              onChange={handleLogoChange}
              required={!selectedManufacturer}
            />
          </label>
          <label>
            Категория:
            <select
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              disabled={selectedManufacturer}
            >
              <option value="1">ХСЗР</option>
              <option value="2">Удобрения</option>
              <option value="3">Посевной материал</option>
            </select>
          </label>
          <button type="submit">
            {selectedManufacturer ? "Сохранить" : "Добавить"}
          </button>

          <button type="button" onClick={resetForm}>
            Отмена
          </button>
        </form>
      )}

      <h2>Производители</h2>

      {/* Отображение производителей по категориям */}
      {["1", "2", "3"].map((id) => (
        <div key={id}>
          <h3>Производители Категории {id}</h3>
          <ul className="admin-list">
            {manufacturers[id] &&
              manufacturers[id].map((manufacturer) => (
                <li key={manufacturer.id}>
                  {manufacturer.name}
                  <button onClick={() => handleEditManufacturer(manufacturer)}>
                    Редактировать
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteManufacturer(id, manufacturer.id)
                    }
                  >
                    Удалить
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ManufacturerForm;
