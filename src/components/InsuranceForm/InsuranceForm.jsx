import React, { useState, useEffect } from "react";
import "./InsuranceForm.css";
import Button from "../Button/Button";

const InsuranceForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    carBrand: "",
  });

  useEffect(() => {
    // Загружаем сохраненные данные при открытии формы
    const savedData = localStorage.getItem("insuranceFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, status: "completed" });
    localStorage.removeItem("insuranceFormData"); // Очищаем сохраненные данные после успешной отправки
  };

  const handleClose = () => {
    // Сохраняем данные перед закрытием
    localStorage.setItem("insuranceFormData", JSON.stringify(formData));
    onClose();
  };

  const handleSaveForLater = () => {
    // Сохраняем данные и закрываем форму с статусом "incomplete"
    localStorage.setItem("insuranceFormData", JSON.stringify(formData));
    onSubmit({ ...formData, status: "incomplete" });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="insurance-form">
      <h2>Форма страхования</h2>
      <div className="form-group">
        <label htmlFor="lastName">Фамилия</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">Имя</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="middleName">Отчество</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="carBrand">Марка автомобиля</label>
        <input
          type="text"
          id="carBrand"
          name="carBrand"
          value={formData.carBrand}
          onChange={handleChange}
          required
          placeholder="Например: Toyota"
        />
      </div>
      <div className="form-buttons">
        <Button text="Отправить" type="submit" variant="primary" />
        <Button
          text="Закончить позже"
          onClick={handleSaveForLater}
          variant="secondary"
        />
        <Button text="Закрыть" onClick={handleClose} variant="secondary" />
      </div>
    </form>
  );
};

export default InsuranceForm;
