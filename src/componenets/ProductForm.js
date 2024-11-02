import React, { useState } from "react";
import ComponentA from "../componenets/ProductFormSZR";
import ComponentB from "../componenets/ProductFormUDO";
import ComponentC from "../componenets/ProductFormPOS";

const ProductForm = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const toggleComponent = (component) => {
    setActiveComponent(activeComponent === component ? null : component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "componentA":
        return <ComponentA />;
      case "componentB":
        return <ComponentB />;
      case "componentC":
        return <ComponentC />;
      default:
        return null;
    }
  };

  return (
    <div style={{ marginTop: 200 }}>
      <h1>Выберите форму для отображения</h1>
      <div>
        <button onClick={() => toggleComponent("componentA")}>
          {activeComponent === "componentA" ? "Скрыть форму" : "Добавить ХСЗР"}
        </button>
        <button onClick={() => toggleComponent("componentB")}>
          {activeComponent === "componentB"
            ? "Скрыть форму"
            : "Добавить удобрения"}
        </button>
        <button onClick={() => toggleComponent("componentC")}>
          {activeComponent === "componentC"
            ? "Скрыть форму"
            : "Добавить посевной материал"}
        </button>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default ProductForm;
