import React, { useState, useMemo } from "react";
import "../styles/Insurance.css";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import InsuranceForm from "../components/InsuranceForm/InsuranceForm";
import { useLanguage } from "../context/LanguageContext";

const Insurance = () => {
  const { translate } = useLanguage();
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

  // Фильтрация списка форм
  const filteredForms = useMemo(() => {
    return formsList.filter((form) => {
      // Проверяем наличие поля lastName для безопасного доступа
      const lastName = form.lastName || "";

      const matchesLastName = lastName
        .toLowerCase()
        .includes(filters.lastName.toLowerCase());
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "completed" && form.status === "completed") ||
        (filters.status === "incomplete" && form.status === "incomplete");

      return matchesLastName && matchesStatus;
    });
  }, [formsList, filters]);

  // Функция для форматирования ФИО с проверкой на наличие полей
  const formatName = (lastName, firstName, middleName) => {
    // Если есть полное имя собственника, используем его
    if (lastName?.owner?.fullName) {
      return lastName.owner.fullName;
    }

    // Иначе используем старый формат данных
    const lastNameStr = lastName || "";
    const firstNameInitial = firstName ? firstName.charAt(0) + "." : "";
    const middleNameInitial = middleName ? middleName.charAt(0) + "." : "";
    return `${lastNameStr} ${firstNameInitial}${middleNameInitial}`;
  };

  return (
    <div className="page-content">
      <h1>{translate("insurance")}</h1>
      <Button
        text={translate("newCalculation")}
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
            placeholder={translate("searchByLastName")}
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
            <option value="all">{translate("allStatuses")}</option>
            <option value="completed">{translate("sent")}</option>
            <option value="incomplete">{translate("incomplete")}</option>
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
                  {form.owner && form.owner.fullName
                    ? form.owner.fullName
                    : formatName(
                        form.lastName,
                        form.firstName,
                        form.middleName
                      )}
                </span>
                <span className="form-status">
                  {translate("status")}:{" "}
                  {form.status === "completed"
                    ? translate("formSent")
                    : translate("formIncomplete")}
                </span>
                <span className="form-date">{form.date}</span>
              </div>
              <div className="form-actions">
                {form.status === "incomplete" && (
                  <button
                    className="action-button edit-button"
                    onClick={() => handleEditForm(form)}
                    title={translate("edit")}
                  >
                    ✎
                  </button>
                )}
                <button
                  className="action-button delete-button"
                  onClick={() => handleDeleteForm(form.id)}
                  title={translate("delete")}
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
