import React, { useState, useEffect } from "react";
import "./InsuranceForm.css";
import Button from "../Button/Button";
import { useLanguage } from "../../context/LanguageContext";

const InsuranceForm = ({ onSubmit, onClose, initialData = null }) => {
  const { translate } = useLanguage();
  const [formData, setFormData] = useState({
    // Блок продукты
    products: {
      osago: false,
      kasko: false,
      gap: false,
      roadAssistance: false,
      lifeInsurance: false,
    },
    // Блок пролонгация
    prolongation: {
      hasPreviousPolicy: false,
      previousPolicyNumber: "",
    },
    // Блок собственник
    owner: {
      isInsurer: true,
      isDriver: true,
      fullName: "",
      birthDate: "",
      gender: "male",
      phone: "",
      email: "",
      passport: {
        series: "",
        number: "",
        issueDate: "",
        issuedBy: "",
        departmentCode: "",
      },
      registrationAddress: "",
      sameAsRegistration: true,
      residenceAddress: "",
      driverLicense: {
        series: "",
        number: "",
        issueDate: "",
        experienceStartDate: "",
      },
      hasPreviousLicense: false,
      previousLicense: {
        series: "",
        number: "",
        issueDate: "",
      },
    },
    // Блок водители
    drivers: {
      noRestrictions: false,
      allDriversInAllContracts: true,
      list: [
        {
          fullName: "",
          birthDate: "",
          gender: "male",
          isForeignLicense: false,
          license: {
            series: "",
            number: "",
            issueDate: "",
            experienceStartDate: "",
          },
          maritalStatus: "single",
          children: "0",
          hasPreviousLicense: false,
          previousLicense: {
            series: "",
            number: "",
            issueDate: "",
          },
        },
      ],
    },
    // Блок информация о ТС
    vehicle: {
      isNew: true,
      vin: "",
      chassis: "",
      brand: "",
      model: "",
      body: "",
      year: "",
      licensePlate: "",
      isForeignLicensePlate: false,
      category: "",
      subcategory: "",
      engineType: "gasoline",
      enginePower: "",
      engineVolume: "",
      transmissionType: "manual",
      doorsCount: "",
      bodyType: "sedan",
      useGoal: "personal",
      purchasePlace: "officialDealer",
      make: "",
      registrationCertificate: {
        series: "",
        number: "",
      },
      registrationDate: "",
    },
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
    const { name, value, type, checked } = e.target;

    // Обработка чекбоксов и обычных полей ввода
    if (name.includes(".")) {
      const parts = name.split(".");
      setFormData((prev) => {
        const newData = { ...prev };
        let current = newData;

        for (let i = 0; i < parts.length - 1; i++) {
          if (
            parts[i] === "drivers" &&
            parts[i + 1] === "list" &&
            parts.length > i + 2
          ) {
            const index = parseInt(parts[i + 2]);
            if (!current.drivers.list[index]) {
              current.drivers.list[index] = {};
            }
            current = current.drivers.list[index];
            i += 2;
          } else {
            if (!current[parts[i]]) {
              current[parts[i]] = {};
            }
            current = current[parts[i]];
          }
        }

        current[parts[parts.length - 1]] =
          type === "checkbox" ? checked : value;
        return newData;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const addDriver = () => {
    setFormData((prev) => ({
      ...prev,
      drivers: {
        ...prev.drivers,
        list: [
          ...prev.drivers.list,
          {
            fullName: "",
            birthDate: "",
            gender: "male",
            isForeignLicense: false,
            license: {
              series: "",
              number: "",
              issueDate: "",
              experienceStartDate: "",
            },
            maritalStatus: "single",
            children: "0",
            hasPreviousLicense: false,
            previousLicense: {
              series: "",
              number: "",
              issueDate: "",
            },
          },
        ],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Создаем полный объект данных формы для отправки
    // Добавляем поля lastName, firstName, middleName для совместимости с фильтрацией
    const fullNameParts = formData.owner.fullName.split(" ");
    const formDataToSubmit = {
      ...formData,
      lastName: fullNameParts[0] || "",
      firstName: fullNameParts[1] || "",
      middleName: fullNameParts[2] || "",
      status: "completed",
    };

    onSubmit(formDataToSubmit);
    localStorage.removeItem("insuranceFormData"); // Очищаем сохраненные данные после успешной отправки
  };

  const handleClose = () => {
    // Сохраняем данные перед закрытием
    localStorage.setItem("insuranceFormData", JSON.stringify(formData));
    onClose();
  };

  const handleSaveForLater = () => {
    // Сохраняем данные и закрываем форму с статусом "incomplete"
    // Также добавляем поля lastName, firstName, middleName для совместимости с фильтрацией
    const fullNameParts = formData.owner.fullName.split(" ");
    const formDataToSubmit = {
      ...formData,
      lastName: fullNameParts[0] || "",
      firstName: fullNameParts[1] || "",
      middleName: fullNameParts[2] || "",
      status: "incomplete",
    };

    localStorage.setItem("insuranceFormData", JSON.stringify(formData));
    onSubmit(formDataToSubmit);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="insurance-form">
      <h2>{translate("newCalculation")}</h2>

      {/* Блок "Продукты" */}
      <div className="form-section">
        <h3>{translate("products")}</h3>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="osago"
              name="products.osago"
              checked={formData.products.osago}
              onChange={handleChange}
            />
            <label htmlFor="osago">{translate("osago")}</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="kasko"
              name="products.kasko"
              checked={formData.products.kasko}
              onChange={handleChange}
            />
            <label htmlFor="kasko">{translate("kasko")}</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="gap"
              name="products.gap"
              checked={formData.products.gap}
              onChange={handleChange}
            />
            <label htmlFor="gap">{translate("gap")}</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="roadAssistance"
              name="products.roadAssistance"
              checked={formData.products.roadAssistance}
              onChange={handleChange}
            />
            <label htmlFor="roadAssistance">
              {translate("roadAssistance")}
            </label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="lifeInsurance"
              name="products.lifeInsurance"
              checked={formData.products.lifeInsurance}
              onChange={handleChange}
            />
            <label htmlFor="lifeInsurance">{translate("lifeInsurance")}</label>
          </div>
        </div>
      </div>

      {/* Блок "Пролонгация" */}
      <div className="form-section">
        <h3>{translate("prolongation")}</h3>
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="hasPreviousPolicy"
            name="prolongation.hasPreviousPolicy"
            checked={formData.prolongation.hasPreviousPolicy}
            onChange={handleChange}
          />
          <label htmlFor="hasPreviousPolicy">
            {translate("specifyPreviousPolicy")}
          </label>
        </div>

        {formData.prolongation.hasPreviousPolicy && (
          <div className="form-group">
            <label htmlFor="previousPolicyNumber">
              {translate("policySerialNumber")}
            </label>
            <input
              type="text"
              id="previousPolicyNumber"
              name="prolongation.previousPolicyNumber"
              value={formData.prolongation.previousPolicyNumber}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      {/* Блок "Собственник" */}
      <div className="form-section">
        <h3>{translate("owner")}</h3>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="isInsurer"
              name="owner.isInsurer"
              checked={formData.owner.isInsurer}
              onChange={handleChange}
            />
            <label htmlFor="isInsurer">{translate("insurer")}</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="isDriver"
              name="owner.isDriver"
              checked={formData.owner.isDriver}
              onChange={handleChange}
            />
            <label htmlFor="isDriver">{translate("driver")}</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ownerFullName">{translate("fullName")}</label>
          <input
            type="text"
            id="ownerFullName"
            name="owner.fullName"
            value={formData.owner.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ownerBirthDate">{translate("birthDate")}</label>
          <input
            type="date"
            id="ownerBirthDate"
            name="owner.birthDate"
            value={formData.owner.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{translate("gender")}</label>
          <div className="radio-group">
            <div className="radio-item">
              <input
                type="radio"
                id="ownerGenderMale"
                name="owner.gender"
                value="male"
                checked={formData.owner.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="ownerGenderMale">{translate("male")}</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="ownerGenderFemale"
                name="owner.gender"
                value="female"
                checked={formData.owner.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="ownerGenderFemale">{translate("female")}</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ownerPhone">{translate("phone")}</label>
          <input
            type="tel"
            id="ownerPhone"
            name="owner.phone"
            value={formData.owner.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ownerEmail">{translate("email")}</label>
          <input
            type="email"
            id="ownerEmail"
            name="owner.email"
            value={formData.owner.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="passportSeries">
            {translate("passportSerialNumber")}
          </label>
          <div className="input-row">
            <input
              type="text"
              id="passportSeries"
              name="owner.passport.series"
              value={formData.owner.passport.series}
              onChange={handleChange}
              placeholder={translate("serial")}
              required
            />
            <input
              type="text"
              id="passportNumber"
              name="owner.passport.number"
              value={formData.owner.passport.number}
              onChange={handleChange}
              placeholder={translate("number")}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="passportIssueDate">
            {translate("passportIssueDate")}
          </label>
          <input
            type="date"
            id="passportIssueDate"
            name="owner.passport.issueDate"
            value={formData.owner.passport.issueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="passportIssuedBy">
            {translate("passportIssuedBy")}
          </label>
          <input
            type="text"
            id="passportIssuedBy"
            name="owner.passport.issuedBy"
            value={formData.owner.passport.issuedBy}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="passportDepartmentCode">
            {translate("departmentCode")}
          </label>
          <input
            type="text"
            id="passportDepartmentCode"
            name="owner.passport.departmentCode"
            value={formData.owner.passport.departmentCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="registrationAddress">
            {translate("registrationAddress")}
          </label>
          <input
            type="text"
            id="registrationAddress"
            name="owner.registrationAddress"
            value={formData.owner.registrationAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="checkbox-item">
          <input
            type="checkbox"
            id="sameAsRegistration"
            name="owner.sameAsRegistration"
            checked={formData.owner.sameAsRegistration}
            onChange={handleChange}
          />
          <label htmlFor="sameAsRegistration">
            {translate("sameAsRegistration")}
          </label>
        </div>

        {!formData.owner.sameAsRegistration && (
          <div className="form-group">
            <label htmlFor="residenceAddress">
              {translate("residenceAddress")}
            </label>
            <input
              type="text"
              id="residenceAddress"
              name="owner.residenceAddress"
              value={formData.owner.residenceAddress}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="driverLicenseSeries">
            {translate("driverLicenseSerialNumber")}
          </label>
          <div className="input-row">
            <input
              type="text"
              id="driverLicenseSeries"
              name="owner.driverLicense.series"
              value={formData.owner.driverLicense.series}
              onChange={handleChange}
              placeholder={translate("serial")}
              required
            />
            <input
              type="text"
              id="driverLicenseNumber"
              name="owner.driverLicense.number"
              value={formData.owner.driverLicense.number}
              onChange={handleChange}
              placeholder={translate("number")}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="driverLicenseIssueDate">
            {translate("issueDate")}
          </label>
          <input
            type="date"
            id="driverLicenseIssueDate"
            name="owner.driverLicense.issueDate"
            value={formData.owner.driverLicense.issueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="driverLicenseExperienceDate">
            {translate("experienceStartDate")}
          </label>
          <input
            type="date"
            id="driverLicenseExperienceDate"
            name="owner.driverLicense.experienceStartDate"
            value={formData.owner.driverLicense.experienceStartDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="checkbox-item">
          <input
            type="checkbox"
            id="hasPreviousLicense"
            name="owner.hasPreviousLicense"
            checked={formData.owner.hasPreviousLicense}
            onChange={handleChange}
          />
          <label htmlFor="hasPreviousLicense">
            {translate("specifyPreviousLicense")}
          </label>
        </div>

        {formData.owner.hasPreviousLicense && (
          <>
            <div className="form-group">
              <label htmlFor="prevLicenseSeries">
                {translate("prevLicenseSerialNumber")}
              </label>
              <div className="input-row">
                <input
                  type="text"
                  id="prevLicenseSeries"
                  name="owner.previousLicense.series"
                  value={formData.owner.previousLicense.series}
                  onChange={handleChange}
                  placeholder={translate("serial")}
                />
                <input
                  type="text"
                  id="prevLicenseNumber"
                  name="owner.previousLicense.number"
                  value={formData.owner.previousLicense.number}
                  onChange={handleChange}
                  placeholder={translate("number")}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="prevLicenseIssueDate">
                {translate("prevLicenseIssueDate")}
              </label>
              <input
                type="date"
                id="prevLicenseIssueDate"
                name="owner.previousLicense.issueDate"
                value={formData.owner.previousLicense.issueDate}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>

      {/* Блок "Водители" */}
      <div className="form-section">
        <h3>{translate("drivers")}</h3>
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="noRestrictions"
            name="drivers.noRestrictions"
            checked={formData.drivers.noRestrictions}
            onChange={handleChange}
          />
          <label htmlFor="noRestrictions">{translate("noRestrictions")}</label>
        </div>

        <div className="checkbox-item">
          <input
            type="checkbox"
            id="allDriversInAllContracts"
            name="drivers.allDriversInAllContracts"
            checked={formData.drivers.allDriversInAllContracts}
            onChange={handleChange}
          />
          <label htmlFor="allDriversInAllContracts">
            {translate("allDriversInAllContracts")}
          </label>
        </div>

        {!formData.drivers.noRestrictions && (
          <div className="drivers-list">
            {formData.drivers.list.map((driver, index) => (
              <div key={index} className="driver-item">
                <h4>
                  {translate("driverN")} {index + 1}
                </h4>

                <div className="form-group">
                  <label htmlFor={`driver${index}FullName`}>
                    {translate("fullName")}
                  </label>
                  <input
                    type="text"
                    id={`driver${index}FullName`}
                    name={`drivers.list.${index}.fullName`}
                    value={driver.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`driver${index}BirthDate`}>
                    {translate("birthDate")}
                  </label>
                  <input
                    type="date"
                    id={`driver${index}BirthDate`}
                    name={`drivers.list.${index}.birthDate`}
                    value={driver.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{translate("gender")}</label>
                  <div className="radio-group">
                    <div className="radio-item">
                      <input
                        type="radio"
                        id={`driver${index}GenderMale`}
                        name={`drivers.list.${index}.gender`}
                        value="male"
                        checked={driver.gender === "male"}
                        onChange={handleChange}
                      />
                      <label htmlFor={`driver${index}GenderMale`}>
                        {translate("male")}
                      </label>
                    </div>
                    <div className="radio-item">
                      <input
                        type="radio"
                        id={`driver${index}GenderFemale`}
                        name={`drivers.list.${index}.gender`}
                        value="female"
                        checked={driver.gender === "female"}
                        onChange={handleChange}
                      />
                      <label htmlFor={`driver${index}GenderFemale`}>
                        {translate("female")}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`driver${index}ForeignLicense`}
                    name={`drivers.list.${index}.isForeignLicense`}
                    checked={driver.isForeignLicense}
                    onChange={handleChange}
                  />
                  <label htmlFor={`driver${index}ForeignLicense`}>
                    {translate("foreignLicense")}
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor={`driver${index}LicenseSeries`}>
                    {translate("driverLicenseSerialNumber")}
                  </label>
                  <div className="input-row">
                    <input
                      type="text"
                      id={`driver${index}LicenseSeries`}
                      name={`drivers.list.${index}.license.series`}
                      value={driver.license.series}
                      onChange={handleChange}
                      placeholder={translate("serial")}
                      required
                    />
                    <input
                      type="text"
                      id={`driver${index}LicenseNumber`}
                      name={`drivers.list.${index}.license.number`}
                      value={driver.license.number}
                      onChange={handleChange}
                      placeholder={translate("number")}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor={`driver${index}LicenseIssueDate`}>
                    {translate("issueDate")}
                  </label>
                  <input
                    type="date"
                    id={`driver${index}LicenseIssueDate`}
                    name={`drivers.list.${index}.license.issueDate`}
                    value={driver.license.issueDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`driver${index}ExperienceStartDate`}>
                    {translate("experienceStartDate")}
                  </label>
                  <input
                    type="date"
                    id={`driver${index}ExperienceStartDate`}
                    name={`drivers.list.${index}.license.experienceStartDate`}
                    value={driver.license.experienceStartDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`driver${index}MaritalStatus`}>
                    {translate("maritalStatus")}
                  </label>
                  <select
                    id={`driver${index}MaritalStatus`}
                    name={`drivers.list.${index}.maritalStatus`}
                    value={driver.maritalStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="single">{translate("single")}</option>
                    <option value="married">{translate("married")}</option>
                    <option value="divorced">{translate("divorced")}</option>
                    <option value="widowed">{translate("widowed")}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor={`driver${index}Children`}>
                    {translate("children")}
                  </label>
                  <select
                    id={`driver${index}Children`}
                    name={`drivers.list.${index}.children`}
                    value={driver.children}
                    onChange={handleChange}
                    required
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                  </select>
                </div>

                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`driver${index}PreviousLicense`}
                    name={`drivers.list.${index}.hasPreviousLicense`}
                    checked={driver.hasPreviousLicense}
                    onChange={handleChange}
                  />
                  <label htmlFor={`driver${index}PreviousLicense`}>
                    {translate("specifyPreviousLicense")}
                  </label>
                </div>

                {driver.hasPreviousLicense && (
                  <>
                    <div className="form-group">
                      <label htmlFor={`driver${index}PrevLicenseSeries`}>
                        {translate("prevLicenseSerialNumber")}
                      </label>
                      <div className="input-row">
                        <input
                          type="text"
                          id={`driver${index}PrevLicenseSeries`}
                          name={`drivers.list.${index}.previousLicense.series`}
                          value={driver.previousLicense.series}
                          onChange={handleChange}
                          placeholder={translate("serial")}
                        />
                        <input
                          type="text"
                          id={`driver${index}PrevLicenseNumber`}
                          name={`drivers.list.${index}.previousLicense.number`}
                          value={driver.previousLicense.number}
                          onChange={handleChange}
                          placeholder={translate("number")}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor={`driver${index}PrevLicenseIssueDate`}>
                        {translate("prevLicenseIssueDate")}
                      </label>
                      <input
                        type="date"
                        id={`driver${index}PrevLicenseIssueDate`}
                        name={`drivers.list.${index}.previousLicense.issueDate`}
                        value={driver.previousLicense.issueDate}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}

            <button
              type="button"
              className="add-driver-btn"
              onClick={addDriver}
            >
              {translate("addDriver")}
            </button>
          </div>
        )}
      </div>

      {/* Автомобиль */}
      <div className="form-section">
        <h3>{translate("vehicle")}</h3>

        <div className="form-group">
          <label htmlFor="make">{translate("make")}</label>
          <input
            type="text"
            id="make"
            name="vehicle.make"
            value={formData.vehicle.make}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">{translate("model")}</label>
          <input
            type="text"
            id="model"
            name="vehicle.model"
            value={formData.vehicle.model}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">{translate("year")}</label>
          <input
            type="number"
            id="year"
            name="vehicle.year"
            value={formData.vehicle.year}
            onChange={handleChange}
            required
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>

        <div className="form-group">
          <label htmlFor="vin">{translate("vin")}</label>
          <input
            type="text"
            id="vin"
            name="vehicle.vin"
            value={formData.vehicle.vin}
            onChange={handleChange}
            required
            pattern="^[A-HJ-NPR-Z0-9]{17}$"
            title={translate("vinFormatInfo")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="licensePlate">{translate("licensePlate")}</label>
          <input
            type="text"
            id="licensePlate"
            name="vehicle.licensePlate"
            value={formData.vehicle.licensePlate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="registrationCertificate">
            {translate("registrationCertificate")}
          </label>
          <div className="input-row">
            <input
              type="text"
              id="registrationCertificateSeries"
              name="vehicle.registrationCertificate.series"
              value={formData.vehicle.registrationCertificate.series}
              onChange={handleChange}
              placeholder={translate("serial")}
              required
            />
            <input
              type="text"
              id="registrationCertificateNumber"
              name="vehicle.registrationCertificate.number"
              value={formData.vehicle.registrationCertificate.number}
              onChange={handleChange}
              placeholder={translate("number")}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="registrationDate">
            {translate("registrationDate")}
          </label>
          <input
            type="date"
            id="registrationDate"
            name="vehicle.registrationDate"
            value={formData.vehicle.registrationDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-buttons">
        <Button text={translate("submit")} type="submit" variant="primary" />
        <Button
          text={translate("finishLater")}
          onClick={handleSaveForLater}
          variant="secondary"
        />
        <Button
          text={translate("close")}
          onClick={handleClose}
          variant="secondary"
        />
      </div>
    </form>
  );
};

export default InsuranceForm;
