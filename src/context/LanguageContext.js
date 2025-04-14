import React, { createContext, useState, useContext, useEffect } from "react";

// Создаем контекст
const LanguageContext = createContext();

// Поддерживаемые языки
export const languages = {
  RU: "ru",
  EN: "en",
  AR: "ar",
};

// Словари перевода
const translations = {
  [languages.RU]: {
    // Навигация
    home: "Домой",
    credit: "Кредитование",
    insurance: "Страхование",
    statistics: "Статистика",
    education: "Обучение",
    profile: "Профиль",
    language: "Язык",

    // Кнопки действий
    newCalculation: "Новый расчет",
    submit: "Отправить",
    finishLater: "Закончить позже",
    close: "Закрыть",
    addDriver: "Добавить водителя",

    // Заголовки блоков
    products: "Продукты",
    prolongation: "Пролонгация",
    owner: "Собственник",
    drivers: "Водители",
    vehicleInfo: "Информация о ТС",

    // Продукты
    osago: "ОСАГО",
    kasko: "КАСКО",
    gap: "GAP",
    roadAssistance: "Карта помощи на дорогах",
    lifeInsurance: "Страхование жизни",

    // Пролонгация
    specifyPreviousPolicy: "Указать предыдущий полис",
    policySerialNumber: "Серия и номер полиса",

    // Собственник
    insurer: "Страхователь",
    driver: "Водитель",
    fullName: "Фамилия Имя Отчество",
    birthDate: "Дата рождения",
    gender: "Пол",
    male: "Мужской",
    female: "Женский",
    phone: "Телефон",
    email: "E-Mail",
    passportSerialNumber: "Серия и номер паспорта",
    serial: "Серия",
    number: "Номер",
    passportIssueDate: "Дата выдачи паспорта",
    passportIssuedBy: "Орган, выдавший паспорт",
    departmentCode: "Код подразделения",
    registrationAddress: "Адрес регистрации",
    sameAsRegistration: "Проживаю по адресу регистрации",
    residenceAddress: "Адрес проживания",
    driverLicenseSerialNumber: "Серия и номер водительского удостоверения",
    issueDate: "Дата выдачи",
    experienceStartDate: "Дата начала стажа",
    specifyPreviousLicense: "Указать предыдущее ВУ",
    prevLicenseSerialNumber: "Серия и номер предыдущего ВУ",
    prevLicenseIssueDate: "Дата выдачи предыдущего ВУ",

    // Водители
    noRestrictions: "Водители без ограничений",
    allDriversInAllContracts:
      "Все указанные водители участвуют во всех договорах",
    driverN: "Водитель",
    foreignLicense: "Иностранное ВУ",
    maritalStatus: "Семейное положение",
    single: "Холост/не замужем",
    married: "Женат/замужем",
    divorced: "Разведен(а)",
    widowed: "Вдовец/вдова",
    children: "Дети",

    // Информация о ТС
    vehicleCondition: "Состояние автомобиля",
    new: "Новый",
    used: "С пробегом",
    vin: "VIN",
    chassis: "Шасси/рама",
    brand: "Марка",
    model: "Модель",
    selectBrand: "Выберите марку",
    selectModel: "Выберите модель",
    bodyNumber: "Номер кузова",
    productionYear: "Год выпуска",
    licensePlate: "Гос номер",
    foreignLicensePlate: "Иностранный госномер",
    vehicleCategory: "Категория ТС",
    selectCategory: "Выберите категорию",
    vehicleSubcategory: "Подкатегория ТС",
    selectSubcategory: "Выберите подкатегорию",
    engineType: "Тип двигателя",
    gasoline: "Бензин",
    diesel: "Дизель",
    hybrid: "Гибрид",
    electric: "Электро",
    enginePower: "Мощность двигателя (л.с.)",
    engineVolume: "Объём двигателя (см³)",
    transmissionType: "Тип КПП",
    manual: "Механика",
    automatic: "Автомат",
    doorsCount: "Число дверей",
    bodyType: "Тип кузова",
    sedan: "Седан",
    coupe: "Купе",
    cabriolet: "Кабриолет",
    hatchback: "Хэтчбэк",
    suv: "SUV",
    minivan: "Микроавтобус",
    useGoal: "Цель использования",
    personal: "Личное пользование",
    taxi: "Такси",
    rent: "Сдача в аренду",
    purchasePlace: "Место покупки",
    officialDealer: "Официальный дилер",
    nonOfficialDealer: "Неофициальный дилер",
    individual: "Физическое лицо",
    marketplace: "Маркетплейс",

    // Фильтры и статусы
    search: "Поиск",
    searchByLastName: "Поиск по фамилии",
    allStatuses: "Все статусы",
    sent: "Отправленные",
    incomplete: "Не заполненные",
    status: "Статус",
    formSent: "Форма отправлена",
    formIncomplete: "Форма не заполнена полностью",
    edit: "Редактировать",
    delete: "Удалить",
  },

  [languages.EN]: {
    // Навигация
    home: "Home",
    credit: "Credit",
    insurance: "Insurance",
    statistics: "Statistics",
    education: "Education",
    profile: "Profile",
    language: "Language",

    // Кнопки действий
    newCalculation: "New Calculation",
    submit: "Submit",
    finishLater: "Finish Later",
    close: "Close",
    addDriver: "Add Driver",

    // Заголовки блоков
    products: "Products",
    prolongation: "Prolongation",
    owner: "Owner",
    drivers: "Drivers",
    vehicleInfo: "Vehicle Information",

    // Продукты
    osago: "OSAGO",
    kasko: "CASCO",
    gap: "GAP",
    roadAssistance: "Road Assistance Card",
    lifeInsurance: "Life Insurance",

    // Пролонгация
    specifyPreviousPolicy: "Specify Previous Policy",
    policySerialNumber: "Policy Serial Number",

    // Собственник
    insurer: "Insurer",
    driver: "Driver",
    fullName: "Full Name",
    birthDate: "Date of Birth",
    gender: "Gender",
    male: "Male",
    female: "Female",
    phone: "Phone",
    email: "E-Mail",
    passportSerialNumber: "Passport Serial Number",
    serial: "Serial",
    number: "Number",
    passportIssueDate: "Passport Issue Date",
    passportIssuedBy: "Passport Issued By",
    departmentCode: "Department Code",
    registrationAddress: "Registration Address",
    sameAsRegistration: "Same as Registration Address",
    residenceAddress: "Residence Address",
    driverLicenseSerialNumber: "Driver's License Serial Number",
    issueDate: "Issue Date",
    experienceStartDate: "Experience Start Date",
    specifyPreviousLicense: "Specify Previous License",
    prevLicenseSerialNumber: "Previous License Serial Number",
    prevLicenseIssueDate: "Previous License Issue Date",

    // Водители
    noRestrictions: "No Driver Restrictions",
    allDriversInAllContracts: "All Drivers Participate in All Contracts",
    driverN: "Driver",
    foreignLicense: "Foreign License",
    maritalStatus: "Marital Status",
    single: "Single",
    married: "Married",
    divorced: "Divorced",
    widowed: "Widowed",
    children: "Children",

    // Информация о ТС
    vehicleCondition: "Vehicle Condition",
    new: "New",
    used: "Used",
    vin: "VIN",
    chassis: "Chassis/Frame",
    brand: "Brand",
    model: "Model",
    selectBrand: "Select Brand",
    selectModel: "Select Model",
    bodyNumber: "Body Number",
    productionYear: "Production Year",
    licensePlate: "License Plate",
    foreignLicensePlate: "Foreign License Plate",
    vehicleCategory: "Vehicle Category",
    selectCategory: "Select Category",
    vehicleSubcategory: "Vehicle Subcategory",
    selectSubcategory: "Select Subcategory",
    engineType: "Engine Type",
    gasoline: "Gasoline",
    diesel: "Diesel",
    hybrid: "Hybrid",
    electric: "Electric",
    enginePower: "Engine Power (HP)",
    engineVolume: "Engine Volume (cc)",
    transmissionType: "Transmission Type",
    manual: "Manual",
    automatic: "Automatic",
    doorsCount: "Number of Doors",
    bodyType: "Body Type",
    sedan: "Sedan",
    coupe: "Coupe",
    cabriolet: "Cabriolet",
    hatchback: "Hatchback",
    suv: "SUV",
    minivan: "Minivan",
    useGoal: "Usage Purpose",
    personal: "Personal Use",
    taxi: "Taxi",
    rent: "Rental",
    purchasePlace: "Purchase Place",
    officialDealer: "Official Dealer",
    nonOfficialDealer: "Non-official Dealer",
    individual: "Individual",
    marketplace: "Marketplace",

    // Фильтры и статусы
    search: "Search",
    searchByLastName: "Search by Last Name",
    allStatuses: "All Statuses",
    sent: "Sent",
    incomplete: "Incomplete",
    status: "Status",
    formSent: "Form Sent",
    formIncomplete: "Form Not Fully Completed",
    edit: "Edit",
    delete: "Delete",
  },

  [languages.AR]: {
    // Навигация
    home: "الرئيسية",
    credit: "الائتمان",
    insurance: "التأمين",
    statistics: "الإحصائيات",
    education: "التعليم",
    profile: "الملف الشخصي",
    language: "اللغة",

    // Кнопки действий
    newCalculation: "حساب جديد",
    submit: "إرسال",
    finishLater: "إنهاء لاحقًا",
    close: "إغلاق",
    addDriver: "إضافة سائق",

    // Заголовки блоков
    products: "المنتجات",
    prolongation: "التمديد",
    owner: "المالك",
    drivers: "السائقين",
    vehicleInfo: "معلومات المركبة",

    // Продукты
    osago: "التأمين الإلزامي",
    kasko: "التأمين الشامل",
    gap: "تأمين الفجوة",
    roadAssistance: "بطاقة المساعدة على الطريق",
    lifeInsurance: "تأمين الحياة",

    // Пролонгация
    specifyPreviousPolicy: "تحديد البوليصة السابقة",
    policySerialNumber: "الرقم التسلسلي للبوليصة",

    // Собственник
    insurer: "المؤمن",
    driver: "السائق",
    fullName: "الاسم الكامل",
    birthDate: "تاريخ الميلاد",
    gender: "الجنس",
    male: "ذكر",
    female: "أنثى",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    passportSerialNumber: "الرقم التسلسلي لجواز السفر",
    serial: "التسلسل",
    number: "الرقم",
    passportIssueDate: "تاريخ إصدار جواز السفر",
    passportIssuedBy: "جهة إصدار جواز السفر",
    departmentCode: "رمز القسم",
    registrationAddress: "عنوان التسجيل",
    sameAsRegistration: "نفس عنوان التسجيل",
    residenceAddress: "عنوان الإقامة",
    driverLicenseSerialNumber: "الرقم التسلسلي لرخصة القيادة",
    issueDate: "تاريخ الإصدار",
    experienceStartDate: "تاريخ بدء الخبرة",
    specifyPreviousLicense: "تحديد الرخصة السابقة",
    prevLicenseSerialNumber: "الرقم التسلسلي للرخصة السابقة",
    prevLicenseIssueDate: "تاريخ إصدار الرخصة السابقة",

    // Водители
    noRestrictions: "بدون قيود على السائقين",
    allDriversInAllContracts: "جميع السائقين يشاركون في جميع العقود",
    driverN: "سائق",
    foreignLicense: "رخصة أجنبية",
    maritalStatus: "الحالة الاجتماعية",
    single: "أعزب/عزباء",
    married: "متزوج/متزوجة",
    divorced: "مطلق/مطلقة",
    widowed: "أرمل/أرملة",
    children: "الأطفال",

    // Информация о ТС
    vehicleCondition: "حالة المركبة",
    new: "جديدة",
    used: "مستعملة",
    vin: "رقم VIN",
    chassis: "الشاسيه/الإطار",
    brand: "الماركة",
    model: "الموديل",
    selectBrand: "اختر الماركة",
    selectModel: "اختر الموديل",
    bodyNumber: "رقم الهيكل",
    productionYear: "سنة الإنتاج",
    licensePlate: "لوحة الترخيص",
    foreignLicensePlate: "لوحة ترخيص أجنبية",
    vehicleCategory: "فئة المركبة",
    selectCategory: "اختر الفئة",
    vehicleSubcategory: "الفئة الفرعية للمركبة",
    selectSubcategory: "اختر الفئة الفرعية",
    engineType: "نوع المحرك",
    gasoline: "بنزين",
    diesel: "ديزل",
    hybrid: "هجين",
    electric: "كهربائي",
    enginePower: "قوة المحرك (حصان)",
    engineVolume: "حجم المحرك (سم³)",
    transmissionType: "نوع ناقل الحركة",
    manual: "يدوي",
    automatic: "أوتوماتيكي",
    doorsCount: "عدد الأبواب",
    bodyType: "نوع الهيكل",
    sedan: "سيدان",
    coupe: "كوبيه",
    cabriolet: "مكشوفة",
    hatchback: "هاتشباك",
    suv: "دفع رباعي",
    minivan: "ميني فان",
    useGoal: "الغرض من الاستخدام",
    personal: "استخدام شخصي",
    taxi: "تاكسي",
    rent: "للإيجار",
    purchasePlace: "مكان الشراء",
    officialDealer: "وكيل رسمي",
    nonOfficialDealer: "وكيل غير رسمي",
    individual: "فرد",
    marketplace: "سوق",

    // Фильтры и статусы
    search: "بحث",
    searchByLastName: "بحث باسم العائلة",
    allStatuses: "جميع الحالات",
    sent: "مرسلة",
    incomplete: "غير مكتملة",
    status: "الحالة",
    formSent: "تم إرسال النموذج",
    formIncomplete: "النموذج غير مكتمل",
    edit: "تعديل",
    delete: "حذف",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Проверяем сохраненный язык в localStorage
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || languages.RU;
  });

  // Эффект для применения RTL для арабского языка
  useEffect(() => {
    const html = document.documentElement;

    if (language === languages.AR) {
      html.setAttribute("dir", "rtl");
      html.classList.add("rtl");
    } else {
      html.setAttribute("dir", "ltr");
      html.classList.remove("rtl");
    }

    // Сохраняем выбранный язык в localStorage
    localStorage.setItem("language", language);
  }, [language]);

  // Функция перевода
  const translate = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для использования контекста языка
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
