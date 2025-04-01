import React, { useState, useMemo } from "react";
import "../styles/Insurance.css";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import InsuranceForm from "../components/InsuranceForm/InsuranceForm";

const Insurance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formsList, setFormsList] = useState([]);
  const [editingForm, setEditingForm] = useState(null);
  const [filters, setFilters] = useState({
    lastName: "",
    status: "all", // all, completed, incomplete
  });

  const handleNewCalculation = () => {
    setEditingForm(null);
    localStorage.removeItem("insuranceFormData"); // Очищаем сохраненные данные
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingForm(null);
  };

  const handleFormSubmit = (data) => {
    if (editingForm) {
      // Обновляем существующую форму
      setFormsList((prev) =>
        prev.map((form) =>
          form.id === editingForm.id
            ? { ...data, id: form.id, date: form.date }
            : form
        )
      );
    } else {
      // Добавляем новую форму
      const newForm = {
        ...data,
        id: Date.now(),
        date: new Date().toLocaleString(),
      };
      setFormsList((prev) => [...prev, newForm]);
    }
    setIsModalOpen(false);
    setEditingForm(null);
  };

  const handleDeleteForm = (formId) => {
    setFormsList((prev) => prev.filter((form) => form.id !== formId));
  };

  const handleEditForm = (form) => {
    setEditingForm(form);
    setIsModalOpen(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Функция для форматирования ФИО
  const formatName = (lastName, firstName, middleName) => {
    const firstNameInitial = firstName ? firstName.charAt(0) + "." : "";
    const middleNameInitial = middleName ? middleName.charAt(0) + "." : "";
    return `${lastName} ${firstNameInitial}${middleNameInitial}`;
  };

  // Фильтрация списка форм
  const filteredForms = useMemo(() => {
    return formsList.filter((form) => {
      const matchesLastName = form.lastName
        .toLowerCase()
        .includes(filters.lastName.toLowerCase());
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "completed" && form.status === "completed") ||
        (filters.status === "incomplete" && form.status === "incomplete");

      return matchesLastName && matchesStatus;
    });
  }, [formsList, filters]);

  return (
    <div className="page-content">
      <h1>Страхование</h1>
      <Button
        text="Новый расчет"
        onClick={handleNewCalculation}
        variant="primary"
        size="medium"
      />

      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            name="lastName"
            value={filters.lastName}
            onChange={handleFilterChange}
            placeholder="Поиск по фамилии"
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">Все статусы</option>
            <option value="completed">Отправленные</option>
            <option value="incomplete">Не заполненные</option>
          </select>
        </div>
      </div>

      <div className="forms-list">
        {filteredForms.map((form) => (
          <div
            key={form.id}
            className={`status-message ${form.status || "completed"}`}
          >
            <div className="form-content">
              <div className="form-info">
                <span className="form-name">
                  {formatName(form.lastName, form.firstName, form.middleName)}
                </span>
                <span className="form-status">
                  Статус:{" "}
                  {form.status === "completed"
                    ? "Форма отправлена"
                    : "Форма не заполнена полностью"}
                </span>
                <span className="form-date">{form.date}</span>
              </div>
              <div className="form-actions">
                {form.status === "incomplete" && (
                  <button
                    className="action-button edit-button"
                    onClick={() => handleEditForm(form)}
                    title="Редактировать"
                  >
                    ✎
                  </button>
                )}
                <button
                  className="action-button delete-button"
                  onClick={() => handleDeleteForm(form.id)}
                  title="Удалить"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <InsuranceForm
          onSubmit={handleFormSubmit}
          onClose={handleCloseModal}
          initialData={editingForm}
        />
      </Modal>
    </div>
  );
};

export default Insurance;
