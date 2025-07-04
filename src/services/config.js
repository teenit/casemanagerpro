export const LANG = {
  GLOBAL: {
    add: "Додати",
    save: "Зберегти",
    download: "Завантажити",
    cancel: "Відмінити",
    date: "Дата",
    title: "Назва",
    description: "Опис",
    no_description: "Без опису",
    color: "Колір",
    confirm_title: "Підтвердити дію",
    delete: "Видалити",
    skip: "Пропустити",
    finish: "Завершити",
    start: "Початок",
    end: "Кінець",
    link: "Посилання",
    years: "років",
    edit: "Редагувати",
    close: "Закрити",
    tags: "Теги",
    category: "Категорія",
    type: "Тип",
    file: "Файл",
    link: "Посилання",
    name: "Ім'я",
    pib: "ПІБ",
    phone: "Телефон",
    about: "Про себе",
    delete_confirm: "Ви впевнені, що хочети видалити цей запис?",
    pick_all: "Обрати все",
    question: "Питання",
    status: "Статус",
    yes: "Так",
    no: "Ні",
    saving: "Збереження...",
    loading: "Завантаження...",
    search: "Пошук...",
    remember: "Нагадувати",
    activated: "Активовано",
    deactivated: "Деактивовано",
    email: "Електронна пошта",
    password: "Пароль",
    unknown_user: "Невідомий користувач",
    date_created: "Дата створення",
    date_updated: "Дата оновлення",
    alertMessages: {
      updated_success: "Дані збережено успішно",
      error: "Виникла помилка. Будь ласка, спробуйте пізніше",
      delete_success: "Запис успішно видалено",
      delete_error: "Не вдалося видалити запис"
    }
  },
  SETTINGS: {
    settings: "Налаштування",
    users: "Користувачі",
    categories: "Категорії",
    configurations: "Конфігурації програми",
    superadmin: "Суперадміністратор",
    telegram: "Налаштування з телеграм",
    activate: "Активувати",
    telegram_bots:"Телеграм боти",
    title_bot: "Ім'я телеграм бота",
    token_bot: "Токен телеграм бота",
    chat_id_bot: "Chat ID телеграм бота",
    add_bot: "Додати учасника",
    title_category: "Назва категорії",
    description_category: "Опис категорії",
    color_category: "Колір категорії",
    title_category_case: "Категорії кейсів",
    title_category_case_helps: "Категорії наданої допомоги",
    title_category_groups: "Категорії груп",
    edit: "Редагувати категорію",
    confirm_delete: "Ви впевнені, що хочете видалити цю категорію?",
    delete_field:"Видалення запису з таблиці",
    table_name:"Назва таблиці",
    id_meta:"Унікальний ID",
    delete_field:"Видалити запис",
    invalid_bot_data:"Введіть ім'я, токен та ID чату",
    general:"Загальні налаштування"
  },
  FIELDS_TABLE: {
    add: "Додати нове поле",
    edit:"Редагувати поле",
    confirm_delete_start: "Підтвердіть дію з видалення поля",
    confirm_delete_end: "Ця дія видалить поле та пов'язані з ним дані",
    invalid_data: "Введіть назву, ID, тип, блок та область відображення поля",
    block_view:{
      works:"Робочі дані",
      contacts:"Контактні дані",
      another:"Інше"
    },
    group:{
      cases:"Кейси",
      users:"Користувачі"
    }
  },
  FIELDS: {
    add: "Створити поле",
    field_type: "Тип поля",
    create_field: "Додати нове поле",
    block_view: "Блок відображення",
    field_name: "Назва",
    system_field: "Системне",
    group_field: "Область відображення",
    date_created: "Дата створення",
    sorted_field: "Сортування",
    unique: "Унікальний ID",
    icon_field: "Іконка",
    contacts: "Контактні дані",
    works: "Робочі дані",
    another: "Інше",
    cases: "Кейси",
    users: "Користувачі",
    no_fields: "Полів не знайдено",
    add_field: "Додати перше поле",
    type_fields: {
      "int": "Число",
      "boolean": "Світчер",
      "string": "Строка",
      "phone": "Телефон",
      "email": "E-mail",
      "date": "Дата",
      "text": "Текст"
    }
  },
  FILES: {
    "case_files": "Файли кейса",
    "history_case_files": "Файл історія кейсу"
  },
  CONFIG: {
    system_twofa_label: "2-факторна автентифікація",
    system_twofa_description: "Запровадьте або обмежте двофакторну автентифікацію по email. Коли параметр увімкнено, при кожній авторизації, користувачу буде приходити на поштому адресу числовий пароль для підтвердження входу",
  },
  TRANSACTIONS: {
    transaction_type: 'Тип транзакції',
    description: 'Опис',
    amount: 'Сума',
    payment_method: 'Метод оплати',
    status: 'Статус',
    created_at: 'Дата створення',
    pending: "Очікується",
    completed: "Завершено успішно",
    failed: "Завершено невдало",
    no_transactions: "Транзакцій не знайдено",
    add_transaction: "Додати першу транзакцію",
    add: "Створити транзакцію",
    edit: "Редагувати транзакцію",
    sum: "Сума",
    type: "Тип транзакції",
    placement: "Розташування",
    method: "Метод оплати",
    card: "Картка",
    currency: "Готівка",
    pending: "Очікується",
    ended: "Завершено",
    failed: "Не вдалося",
    id: "ID посилання",
    confirm_delete: "Ви впевнені, що хочете видалити цю транзакцію?",
    alertMessages: {
      error: "Не вдалося завантажити транзакції",
      invalid: "Введіть суму та тип транзакції"
    },
    tabs: {
      all: "Усі",
      pending: "Очікується",
      completed: "Завершено успішно",
      failed: "Завершено невдало",
    }
  },
  ACCESS: {
    events: {
      look: "Дивитися івент",
      edit: "Редагувати івент",
      members: "Учасники івенту",
      plan: "План івенту",
      docs: "Документи до івенту"
    },
    access: {
      look: "Перегляд шаблонів",
      edit: "Редагування шаблонів прав",
      look_rights: "Перегляд списку прав",
      edit_rights: "Редагування списку прав"
    }
  },
  ACCESS_PAGE: {
    add: "Додати права",
    error_no_role_name: "Введіть назву ролі",
    error_no_name: "Введіть назву шаблону права",
    success_updated: "Шаблон прав оновлено",
    success_added: "Шаблон прав додано",
  },
  USERS_PAGE: {
    add_user: "Додати користувача",
    access: "Шаблон прав",
    reset_password: "Скинути пароль",
    deactivate: "Деактивувати",
    activate: "Активувати",
    no_level: "Права не встановлено",
    set_access: "Встановити рівень доступу",
    wish_set_access: "Бажаєте встановити шаблон прав для",
    set_user: "Зареєструвати користувача"
  },
  NOT_FOUND: {
    start: "Ця сторінка не існує! Перевірте правильність посилання або",
    end: "поверніться на головну"
  },
  MENU_NOTIFICATION: {
    created_new_case: "створив новий кейс",
    created_new_event: "створив нову подію",
    changed_case_name: "змінив ім'я кейсу",
    case: "У кейса",
    notifications: {
      new_case: "Новий кейс",
      new_event: "Нова подія",
      new_task: "Нова задача",
      edit_case: "Редагування кейсу",
      update: "Оновлення",
      birthday: "День народження",
      more: "Детальніше",
    }
  },

  FILES_UPLOADER: {
    download: "Завантажити файл",
    send: "Відправити файл",
    alertMessages: {
      success: "Файли завантажено успішно",
      error: "Неправильні дані"
    }
  },

  settings_to_page: "Налаштування до сторінки",
  access_users_pages: "Рівень доступу користувачів (Сторінки)",
  forbidden: "Заборонено",
  assigned_categories: "Призначені категорії",
  full_access: "Повний доступ",
  only_own: "Тільки свої",
  only_assigned: "Тільки призначені",
  add: "Додати",
  create_links_between_cases: "Створювати зв'язки між кейсами",
  create_individual_plan: "Створити індивідуальний план",
  delete_case: "Видалити кейс",
  add_files: "Додати файли",
  export: "Експортувати",
  completely_hidden: "Приховано повністю",
  almost_all_hidden: "Майже все приховано",
  average: "Середньо",
  low: "Низько",
  no_records: "Немає доступних записів",
  add_record_about_provided_assistance: "Додати запис про надану допомогу",
  a_page_case_add: "Створити кейс",
  a_page_case_look: "Переглядати кейс",
  a_page_case_edit_permission: "Доступ до редагуванння кейсів",
  a_page_case_edit_actions: "Редагувати кейс",
  a_page_case_transfer: "Передати кейс іншому користувачу",
  a_page_case_add_notes: "Додавати нотатки до кейсу",
  a_page_case_hidden: "Приховати інформацію",
  access_text: {
    add_template: "Додати шаблон прав",
  },
  status_plan: {
    0: "Задачу створено",
    1: "Задача в процесі",
    2: "Задача призупинена",
    3: "Задача видалена",
    4: "Задачу завершено не успішно",
    7: "Задача виконана не успішно",
    8: "Задача виконана успішно",
  },
  status_task: "Статус задачі",
  start_time: "Дата початку",
  end_time: "Дата кінця",
  cancel: "Відмінити",
  save: "Зберегти",
  status: "Статус",
  planing: "Планування",
  gallery: "Додані медіа файли",
  documents: "Додані документи",
  years: "років",
  uploaders: {
    PhotoUploader: {
      sucess: "Файли додано успішно",
      error: "Помилка при завантаженні файлів",
      notAnImg: "Файл не є зображенням"
    }
  },
  placeholders: {
    email: "Ваш Email...",
    connect: "Як кейс пов'язан з групою"
  },
  buttonTexts: {
    recover: "Відновити",
    ok: "Добре",
    auth: "Авторизація",
  },
  selects: {
    sex: {
      male: "Чоловік",
      female: "Жінка",
      other: "Інше",
    },
  },
  case_files: {
    delete_confirm: "Ви впевнені, що хочете видалити цей файл?",
    photo: "Фотографія"
  },
  footer: {
    email: "Якщо виникли проблеми, пропозиції - пишіть на поштову скриньку",
    phone: "Якщо питання супер термінове - дзвоніть за номером",
    updateAvaible: "Доступне оновлення",
    update: "Оновити програму",
    lastVersion: "У вас остання версія програми",
    contacts: "Наші контакти:",
    facebook: "Посилання на Facebook",
    instagram: "Посилання на Instagram",
    telegram: "Посилання на Telegram",
    logo: "Логотип Case Manager"
  },
  plan: {
    task: "Задача плану",
    create: "Створити план",
    edit: "Редагувати план",
    error: "Оберіть дату початку та кінця дати",
    error_date: "Дата початку повинна бути раніше дати кінця"
  },
  caseFiles: {
    title: "Файли",
    add: "Додати файл",
    alerts: {
      invalidName: "Введіть ім'я файлу до 100 символів",
      error: "Виникла помилка",
      success: "Файл додано"
    },
  },
  notes: {
    add: "Додати запис",
    text: "Текст запису",
    error: "Помилка при додаванні запису",
    error_data: "Введіть текст запису",
    success: "Запис додано"
  },
  fields: {
    title: "Користувацька інформація",
    add: "Додати інформацію",
    alertMessages: {
      errorAdd: "Помилка при додаванні інформації",
      successAdd: "Нову інформацію додано",
      errorAddEmpty: "Введіть назву і опис інформації",
      errorAddLong: "Назва повинна бути довжиною не більше 125 символів",
      errorEdit: "Помилка при редагуванні інформації",
      successEdit: "Дані оновлено успішно"
    }
  },
  detailedInfo: {
    title: "Детальна інформація",
    family_info: "Сімейний стан",
    comment: "Коментар",
    potreba: "Потреба, запит",
    history: "Історія сім'ї / особи",
    alerts: {
      success: "Дані успішно оновлено",
      error: "Виникла помилка"
    }
  },
  add_case: {
    title: "Додати кейс",
    alertMessages: {
      name: "Будь ласка, введіть ім'я кейсу",
      phone: "Будь ласка, введіть номер телефону кейсу"
    }
  },

  forgotPass: {
    title: "Форма відновлення"
  },
  login: {
    auth: "Авторизація",
    signup: "Реєстрація",
    forgetPass: "Забули пароль -"
  },
  loginForm: {
    auth: "Авторизація",
    emailLabel: "Логін",
    emailMinLengthMessage: "Логін повинен бути довжиною більше ніж 8 символів",
    passwordLabel: "Пароль",
    passwordMinLengthMessage: "Пароль повинен бути довжиною більше ніж 5 символів",
    try_again: "Доступ до аккаунту заблоковано. Спробуйте ще раз через",
    locked_for_hour: 'Too many failed attempts. Account locked for 1 hour.',
    locked_for_5min: 'Too many failed attempts. Account locked for 5 minutes.',
    incorrect_password: "Неправильний пароль. Спробуйте ще раз",
    minutes: "хвилин",
    seconds: "секунд",
    org_code: "Код організації",
    code: "Код",
    enter: "Увійти",
    time_remained: "Залишилось часу"
  },
  galleryBlock: {
    name: "Назва",
    type: "Тип",
    size: "Розмір",
    download: "Завантажити"
  },
  addEvent: "Створення події",
  ADD_MEMBERS: {
    invalid_data: "Введіть користувача та його номер телефону (якщо користувач новий)",
    add: "Додати учасника",
    add_organisator: "Додати учасника (організатора) івента",
    organisator: "Організатор",
    member: "Учасник",
    members: "Учасники",
    existing: "Існуючий",
    new: "Новий",
    position: "Позиція на івенті",
    success_member: "Учасника додано",
    success_organisator: "Організітора додано",
    error_data: "Перевірте правильність даних"
  },
  FIELDS_BLOCK: {
    work: "Робочі дані",
    contact: "Контактні дані",
    out_of_group: "Дані поза групою",
  },
  exportPDFcasesModal: {
    no_file_selected: "Не обрано жодного кейсу на експорт",
    title: "Експорт кейсів у ПДФ",
    settings: "Налаштування",
    set_password: "Встановити пароль на ПДФ файл",
    set_archive_pass: "Встановити пароль на архів",
    pdf_pass: "Пароль на ПДФ файл",
    archive_pass: "Пароль на архів",
    watermark_image: "Встановити водяний знак (картинка)",
    watermark_text: "Встановити водяний знак (текст)"
  },
  cases: "Немає доступних кейсів",
  casesList: {
    ascending: "За зростанням",
    descending: "За спаданням",
    export: "Експорт",
    active: "Активовано",
    inactive: "Деактивовано",
    caseNumber: "Номер",
    photo: "Фотографія кейсу",
    pib: "Ім'я",
    phone: "Телефон",
    email: "Пошта",
    contract: "Договір",
    birthday: "Дата народження",
    address: "Адреса проживання",
    status: "Статус",
    categories: "Категорія",
    noCategory: "Без категорії",
    no_cases: "Кейсів не знайдено",
    add_case: "Додати кейс"
  },
  case_data: {
    first_name: "Ім'я",
    middle_name: "Прізвище",
    last_name: "По батькові",
    phone: "Номер телефону",
    sex: "Стать",
    email: "Електронна пошта",
    birthday: "Дата народження",
    address_registered: "Місце проживання по прописці",
    address_live: "Фактичне місце проживання",
    channel: "Канал комунікації",
    first_contact: "Дата першого контакту",
    contract_date: "Дата укладення договору",
    contract_number: "Номер договору",
    potreba: "Потреба, запит",
    family: "Сімейний стан, деталі про сім'ю, її склад",
    history: "Історія сім'ї / особи",
    category: "Категорії кейсу",
    comment: "Коментар",
    date_created: "Дата створення",
    responsible: "Відповідальний за кейс",
    date_first_contact: "Дата першого контакту"
  },
  CASE_PAGE: {
    deactivated: "Кейс деактивовано, хочете активувати?",
    upload: "Завантажити файл",
    delete_photo: "Ви впевнені, що хочете видалити фото кейсу?",
    delete_case: "Видалити кейс",
    confirm_case_delete: "Ви впевнені, що хочете видалити кейс?"
  },
  categories: {
    category: "Категорія",
    noCategory: "Без категорії"
  },
  calendar: {
    delete: "Видалити подію",
    month: "Місяць",
    week: "Тиждень",
    day: "День",
    only_events: "Тільки події",
    info: "Інформація про подію",
    confirm_delete: "Ви впевнені, що хочете видалити цю подію?",
    alertMessages: {
      cant_edit: "Ви не можете змінити цю подію",
      cant_delete: "Ви не можете видалити цю подію",
      error_get: "Помилка при отриманні даних календаря",
    },
    weekDays: {
      Monday: "ПН",
      Tuesday: "ВТ",
      Wednesday: "СР",
      Thursday: "ЧТ",
      Friday: "ПТ",
      Saturday: "СБ",
      Sunday: "НД"
    },
    months: {
      January: "Січень",
      February: "Лютий",
      March: "Березень",
      April: "Квітень",
      May: "Травень",
      June: "Червень",
      July: "Липень",
      August: "Серпень",
      September: "Вересень",
      October: "Жовтень",
      November: "Листопад",
      December: "Грудень"
    },
    today: "Сьогодні",
    filter: {
      title: "Відобразити у календарі",
      my_calendar: "Мій календар",
      notes_for_all: "Записи для всіх",
      birthdays: "Дні народження кейсів"
    },
    add_event: {
      title: "Додати подію",
      edit: "Редагувати подію",
      delete:"Видалити подію",
      for_all: "Для всіх",
      repeat: "Повторювати кожного року",
      alertMessages: {
        success: "Подію додано",
        error: "Введіть назву та опис події"
      },
    }
  },

  groups: {
    amount: "Кількість об'єктів",
    desc: "Опис групи:",
    date_created: "Дата створення групи:",
    info: "Інформація про групу",
    add: "Додати групу для кейсу",
    title_case: "Групи кейсу",
    add_first_group: "Створити групу",
    group: {
      members: "Учасники групи",
      confirm: "Ви впевнені, що хочете видалити зі списку учасників користувача?",
      date_created: "Дата створення групи",
      favorites: "Додати в обране ",
      edit: "Редагувати групу",
      delete_confirm: "Ви впевнені, що хочете видалити групу?"
    },
    alertMessages: {
      error: "Оберіть групу, яку хочете додати",
      success: "Зв'язок створено",
      no_title: "Введіть назву групи",
      too_long: "Назва групи повинна бути дожиною до 50 символів",
      group_added: "Групу успішно додано",
      group_updated: "Інформацію про групу оновлено",
    }
  },
  events_page: {
    title: "Події",
    add_first_events: "Створити першу подію",
    add: "Створити подію",
    edit: "Редагувати подію",
    confirm_delete: "Ви впевнені, що хочете видалити подію",
    alertMessages: {
      no_title: "Введіть назву події",
      too_long: "Назва події повинна бути довжиною до 100 символів"
    }
  },
  EVENT_PAGE: {
    take_part: "Беруть участь",
    upload: "Завантаження файлів",
    organisators: "Організатори",
    members: "Учасники",
    deleteOrgConfirm: "Ви впевнені, що хочете видалити організатора",
    deleteMemberConfirm: "Ви впевнені, що хочете видалити учасника",
    date: "Дата проведення",
    feedback: "Зворотній зв'язок",
    no_feedback: "Немає зворотнього зв'язку",
    confirm_delete_plan: "Ви впевнені, що хочете видалити план",
    plans: "Плани",
    no_plans: "Планів не знайдено",
    edit_feedback: "Редагувати зворотній зв'язок",
    confirm_delete_feedback: "Ви впевнені, що хочете видалити зворотній зв'язок?",
    alertMessages: {
      feedback_empty: "Введіть текст зворотнього зв'язку",
      feedback_success: "Зворотній зв'язок додано",
      feedback_deleted: "Зворотній зв'язок видалено",
      feedback_updated: "Зворотній зв'язок оновлено",
      plan_deleted: "План видалено",
    }
  },
  TASKS_PAGE: {
    add: "Додати завдання",
    edit: "Редагувати завдання",
    dead_line: "Термін виконання",
    updated_at: "Останнє змінення",
    from: "Від кого",
    to: "Хто виконує",
    reviewer_id: "Хто оцінює",
    archive: "В архів",
    unarchive: "З архіву",
    is_archived: "В архіві",
    not_found: "Завдань не знайдено",
    priority_text: "Пріорітет",
    info: "Інформація про завдання",
    invalid_data: "Введіть назву, термін виконання та того, хто дає, виконує та оцінює завдання",
    active: "Активно",
    finished: "Завершено",
    finish: "Завершити",
    make_active: "Зробити активним",
    on: "о",
    feedbacks: "Зворотні зв'язки",
    priority: {
      3: "Високий",
      2: "Середній",
      1: "Низький"
    },
    tabs: {
      all: "Усі",
      active: "Активні",
      finished: "Завершені",
      archived: "Архівовані"
    }
  },
  TASK_PAGE: {
    edit_task: "Редагувати завдання",
    delete_task: "Видалити завдання",
    edit_feedback: "Редагувати зворотній зв'язок",
    confirm_delete: "Ви впевнені, що хочете видалити це завдання?",
    confirm_delete_feedback: "Ви впевнені, що хочете видалити цей зворотній зв'язок?",
    feedbacks: "Історія завдання",
    is_read: "Прочитано",
    rating: "Оцінка",
    date_stamp: "Фактична дата виконання",
    created_feedback: "Створив",
    empty_feedback: "Не можна додати порожній зворотній зв'язок"
  },
  resources: {
    add: "Додати ресурс",
    link_title: "Корисні посилання",
    confirm_delete: "Ви впевнені, що хочете видалити ресурс - ",
    no_files: "Файлів не знайдено",
    add_first_file: "Додати перший файл",
    no_links: "Посилань не знайдено",
    add_first_link: "Додати перше посилання",
    documents: "Документи",
    media: "Фото та Відео",
    title: "Назва файлу:",
    no_title: "Файл без назви",
    size: "Розмір:",
    desc: "Опис файлу:",
    resource_link: "Посилання на ресурс",
    resource_type: "Тип ресурсу",
    alertMessages: {
      deleted_successfully: "Ресурс успішно видалено",
      error: "Виникла помилка. Спробуйте ще раз",
      added_successfully: "Ресурс додано",
      no_data: "Введіть назву та посилання(якщо треба) на ресурс",
      invalid_length: "Назва ресурсу не може перевищувати 150 символів"
    }
  },
  file: {
    alertMessages: {
      success: "Дані оновлено",
      error: "Виникла помилка"
    },
    add_tag: "Додати тег",
    your_tags: 'Ваші теги',
    confirm_delete: "Ви впевнені, що хочете видалити цей файл?",
    add_tags: "Додати теги",
    name: "Назва файлу",
    withoutName: "Файл без назви",
    last_updated: "Останнє редагування",
    date_created: "Дата створення",
    description: "Опис",
    empty_file: "Поки що в файлі немає інформації"
  },
  user_case_list: {
    title: "Створені кейси",
    add: "Створити кейс",
    avaible: "Доступні кейси"
  },
  pagination: {
    left: "Назад",
    right: "Вперед"
  },
  USER_PAGE: {
    change_pass: "Змінити пароль",
    old_pass: "Старий пароль",
    new_pass: "Новий пароль",
    confirm_pass: "Повторіть пароль",
    send: "Надіслати запит",
    alert_messages: {
      doesnt_match: "Паролі не збігаються",
      too_short: "Довжина паролю повинна бути більше 6 символів",
      old_pass: "Введіть свій старий пароль для підтвердження особистості",
      success_pass: "Пароль успішно змінено. Через декілька секунд вас перекине на сторінку логіну"
    }
  },
  set_user: {
    reset_password_for: "Скинути пароль для",
    add_user: "Додати користувача",
    name: "ПІБ",
    template: "Шаблон прав",
    manage: "Панель керування",
    user_type: "Тип користувача",
    new_password: "Новий пароль",
    confirm_password: "Підтвердити пароль",
    alertMessages: {
      required: "Обов'язково до заповнення",
      pib: "ПІБ повинен бути довжиною мінімум 3 символа",
      phone: "Номер телефону повинен бути довжиною мінімум 10 символів",
      email: "Введіть правильну пошту",
      adress: "Адреса повинна бути довжиною мінімум 5 символів",
      work: "Назва роботи повиннна бути довжиною мінімум 3 символа",
      pass: "Пароль повинен бути довжиною мінімум 6 символів",
      success: "Користувача успішно зареєстровано",
      dont_match: "Паролі не співпадають",
      password_updated: "Пароль оновлено"
    },
    phone: "Номер телефону",
    adress: "Адреса",
    work: "Спеціалізація / Робота",
    password: "Пароль",
    about: "Розкажіть про себе",
    volonter: "Волонтер",
    manager: "Менеджер",
    specialist: "Залучений спеціаліст",
    fsr: "ФСР",
    worker: "Працівник",
    admin: "Адміністратор"
  },
  hints: {
    phone: "Номер телефону може бути як і з префіксом країни, так і без нього",
    email: "Правильна пошта має бути довжиною не менше 7 символів, а також містити симоли '@' та '.'",
    required: "Це поле обов'язково до заповнення",
    disabled: "Це поле не підлягає редагуванню",
    auth: "Двофакторна аутентифікація — це метод захисту облікового запису, який вимагає два різні типи підтвердження особи для доступу, зазвичай поєднуючи те, що користувач знає (наприклад, пароль), з тим, що він має (наприклад, мобільний пристрій).",
    tag: "Введіть теги файлу, розділяючи кожен з них комою. Кожен тег повинен відрізнятися один від одного, бути довжиною менше за 50 символів та не може бути порожнім"
  },
  emptyData: {
    "notFound": "Записів не знайдено",
  },
  access: {
    "a_cases_category_edit_id": "Доступні категорії кейсів для редагування",
    "a_cases_category_look_id": "Доступні категорії кейсів для перегляду",
    "a_cases_edit_id": "Доступні кейси для редагування",
    "a_cases_look_id": "Доступні кейси для перегляду",
    "a_super": "Супер-адміністратор",
    "a_administartor": "Адміністратор",
    "a_blocked": "Заблокувати доступ до програми",
    "a_update_program": "Оновлювати програму Case Manager Pro",
    'a_page_case': "Доступ до сторінки кейс",
    "a_page_case_export_pdf": "Експорт кейсу у ПДФ",
    "a_page_case_media_download": "Дозволити завантажувати медіа файли",
    "a_page_case_add": "Створення кейсів",
    "a_page_case_transfer": "Передавати кейс іншому відповідальному",
    "a_page_case_notes": "Доступ до нотаток",
    "a_page_case_plan": "Доступ до планування",
    "a_page_case_help": "Доступ до наданої допомоги",
    "a_page_case_media": "Доступ до медіа даних кейса (документи, фото тощо..)",
    "a_page_case_connection": "Встановлювати зв'язки з іншими кейсами",
    "a_page_case_contact_info": "Доступ до контактної інформації кейса",
    "a_page_case_simple_info": "Доступ до загальної інформації кейса",
    "a_page_case_info": "Доступ до іншої інформації кейса",
    "a_page_case_files": "Доступ до файлів кейса",
    "a_cases_get": "Доступ до кейсів",
    "get_options": {
      0: "Заборонено",
      1: "Тільки свої",
      2: "Призначені",
      7: "Повний доступ (перегляд)",
      8: "Повний доступ (редагування)",
    },
    "a_page_cases": "Доступ до сторінки кейси",
    "a_page_cases_print": "Друк списку кейсів",
    "a_page_cases_mask": "Маскувати контактні дані кейсів",
    "a_page_cases_look_list": "Переглядати список кейсів як список",
    "a_page_cases_sort": "Відображати панель сортування кейсів",
    "a_page_resources": "Доступ до сторінки ресурси",
    "a_page_resources_upload": "Додавати нові ресурси",
    "a_page_resources_download": "Завантажувати (скачувати) ресурси",
    "a_page_resources_edit": "Редагувати ресурси",
    "a_page_resources_remove": "Видаляти ресурси",
    "a_page_phonebook": "Доступ до сторінки Телефонної книги",
    "a_page_phonebook_remove": "Видалити контакт з телефонної книги",
    "a_page_phonebook_contact": "Контактні дані з телефонної книги",
    "a_page_calendar": "Доступ до сторінки календар",
    "a_page_calendar_look_cases_HB": "Бачити дні народження кейсів",
    "a_page_calendar_look_users_HB": "Бачити дні народження користувачів",
    "a_page_calendar_add_event": "Додати запис в календар",
    "a_page_calendar_edit": "Редагувати запис в календарі",
    "a_page_calendar_remove": "Видалити запис з календарю",
    "a_page_event": "Доступ до сторінки івента (події)",
    "a_page_event_create": "Створити івент",
    "a_page_event_remove": "Видалити івент",
    "a_page_event_add_plan": "Додати план івенту",
    "a_page_event_add_feedback": "Додати зворотній зв'язок",
    "a_page_event_add_media": "Додати медіа-файли до івенту",
    "a_page_event_users": "Організатори івенту",
    "a_page_event_cases": "Учасники івенту",
    "a_page_event_edit": "Редагувати івент",
    "a_page_event_plan": "План івенту",
    "a_page_event_feedback": "Зворотній зв'язок до івенту",
    "a_page_event_media": "Медіа-файли івенту",
    "a_page_events": "Доступ до сторінки івенти (події)",
    "a_page_user": "Доступ до сторінки профіль користувача",
    "a_page_user_change_pass": "Дозволити користувачу змінювати пароль",
    "a_page_user_users": "Доступ до профілів інших користувачів",
    "a_page_user_add_history": "Додавати історії (звітність)",
    "a_page_user_contact": "Контактні дані користувача",
    "a_page_settings": "Доступ до сторінки налаштувань",
    "a_page_settings_activate_users": "Активація користувачів",
    "a_page_settings_deactivate_users": "Деактивація користувачів",
    "a_page_settings_remove_user": "Видалення користувачів",
    "a_page_settings_show_phones": "Відобразити номери телефонів користувачів",
    "a_page_settings_show_name": "Відобразити імена користувачів",
    "a_page_settings_category_case_add": "Надати можливість створювати категорії Кейсів",
    "a_page_settings_category_case_remove": "Надати можливість видаляти категорії Кейсів",
    "a_page_settings_category_phone_add": "Надати можливість створювати категорії Телефонної книги",
    "a_page_settings_category_phone_remove": "Надати можливість видаляти категорії Телефонної книги",
    "a_page_settings_category_help_add": "Надати можливість створювати категорії Наданої допомоги",
    "a_page_settings_category_help_remove": "Надати можливість видаляти категорії Наданої допомоги",
    "a_page_settings_category_group_add": "Надати можливість створювати категорії Груп",
    "a_page_settings_category_group_remove": "Надати можливість видаляти категорії Груп",
    "a_page_settings_change_accesses": "Змінити налаштування прав користувачів",
    "a_page_settings_tab_users": "Відображати таб Користувачі",
    "a_page_settings_tab_categories": "Відображати таб категорії",
    "a_page_settings_tab_events": "Відображати таб Події",
    "a_page_settings_tab_configurations": "Відображати таб Конфігурації програми",
    "a_page_settings_tab_super": "Відображати таб Суперадміністратор",
    "a_page_settings_tab_telegram": "Відображати таб Налаштування телеграм",
    "a_page_settings_case_categories": "Категорії кейсів",
    "a_page_settings_phone_categories": "Категорії телефонної книги",
    "a_page_settings_help_categories": "Категорії наданої допомоги",
    "a_page_access": "Доступ до сторінки налаштування прав користувачів",
    "a_page_access_create": "Створення шаблону прав користувачів",
    "a_page_access_edit": "Редагування шаблону прав користувачів",
    "a_page_groups": "Доступ до сторінки груп",
    "a_group_create": "Створення нової групи",
    "a_page_group": "Доступ до сторінки групи",
    "a_page_group_phones": "Відображати номери телефонів учасників",
    "a_page_group_names": "Відображати імена учасників",
    "a_page_group_favourite": "Додати можливість додавати групу у обране",
    "a_page_statistics": "Доступ до статистики",
    "a_page_case_connection": "Створення зв'язків між об'єктами і групою",
    "a_page_file": "Доступ до сторінки файла",
  },
  pages: {
    case: "Кейс",
    cases: "Кейси",
    addCase: "Додати кейс",
    search: "Розширений пошук",
    contacts: "Телефонна книга",
    cooperation: "Коаліція",
    settings: "Налаштування",
    users: "Користувачі",
    resources: "Ресурси",
    phonebook: "Телефонна книга",
    calendar: "Календар",
    event: "Івент (подія)",
    events: "Івенти (події)",
    user: "Користувач",
    accesses: "Шаблони прав",
    groups: "Групи",
    access: "Інше",
    file: "Файл",
    updateLog: "Оновленння програми",
    transactions: "Транзакції",
    administration: "Адміністрування",
    fields: "Системні поля",
    ancets: "Анкети",
    statistic: "Статистика",
    users: "Користувачі",
    tasks: "Таск-менеджер"
  },
  documents: "Додані документи",
  give_help: {
    title: "Надано допомогу",
    edit_help: "Редагувати запис",
    add_help: "Додати запис",
    who_give_help: "Хто надав допомогу",
    details_help: "Деталі наданої допомоги",
    helping: "Надано допомогу",
    error_data: "Оберіть дату, статус, опис та надавача допомоги",
    error: "Помилка при додаванні допомоги",
  },
  mounths: {
    jan: "Січень",
    feb: "Лютий",
    march: "Березень",
    april: "Квітень",
    may: "Травень",
    june: "Червень",
    july: "Липень",
    aug: "Серпень",
    sep: "Вересень",
    okt: "Жовтень",
    nov: "Листопад",
    dec: "Грудень"
  },
  happy_days_cases: "Дні народження кейсів",
  categories_case: "Категорії кейсів",
  case_view_settings: {
    "view_ProfilePhoto": "Відобразити фото профілю",
    "view_GroupConnection": "Відобразити блок групи кейсу",
    "view_Plan": "Відобразити блок плану",
    "view_Help": "Відобразити блок наданої допомоги",
    "view_Notes": "Відобразити блок нотатків",
    "view_Files": "Відобразити блок файлів",
    "view_Gallery": "Відобразити блок галерея",
    "view_FileUploader": "Відобразити блок завантаження медіа",
    "view_DetailedInfo": "Відобразити блок детальної інформації",
    "view_InfoBlock": "Відобразити інформацію про кейс",
    "view_Fields": "Відобразити блок користувацької інформації",
    "view_Histories": "Відобразити історії кейсу",
    "view_name": "Відобразити повне ім'я кейсу",
    "view_phone": "Відобразити номери телефону кейсу",
    "view_email": "Відобразити електронну пошту кейсу",
    "view_birthday": "Відобразити дату народження кейсу",
    "view_address": "Відобразити адресу кейсу",
    "view_sex": "Відобразити стать кейсу",
    "view_date_created": "Відобразити дату створення кейсу",
    "view_contract": "Відобразити договір",
    "view_channel": "Відобразити канал комунікації кейсу",
    "view_categories": "Відобразити категорії кейсу",
    "view_responsible": "Відобразити відповідального за кейс",
    "view_date_first_contact": "Відобразити дату першого контакту"
  },
  ratingScale10: {
    one: "Дуже низько",
    two: "Низько",
    three: "Нижче середнього",
    four: "Помірно",
    five: "Середньо",
    six: "Достатньо",
    seven: "Вище середнього",
    eight: "Високо",
    nine: "Дуже високо",
    ten: "Максимум"
  },
  ratingScale5: {
    one: "Дуже погано",
    two: "Погано",
    three: "Нормально",
    four: "Добре",
    five: "Чудово"
  },
  ANCETA_PAGE: {
    question: "Питання",
    activated: "Активовано",
    deactivated: "Деактивовано",
    confirm_delete: "Ви впевнені, що хочете видалити цю анкету?"
  },
  ANCETS_PAGE: {
    questions_amount: "Кіл-ть питань",
    created: "Анкету створено",
    type: "Тип анкети",
    invalid_name: "Введіть назву анкети",
    types: {
      cases: "Кейси"
    },
  },
  ancets: {
    delete_anceta: "Видалити анкету",
    type: "Тип",
    remember: "Нагадувати раз ",
    status: "Статус",
    date_created: "Дата створення",
    cases: "Для кейсів",
    active_ancets: "Активні анкети",
    question: "Питання",
    add_new_question: "Додати нове питання",
    question_description: "Надайте відповіді на питання, 1 - найнижча оцінка, 5 або 10 - найвижча оцінка, необхідно відповісти на всі питання",
    no_ancets: "Анкет не знайдено",
    add_anceta: "Додати першу анкету",
    add: "Створити анкету",
    for_cases: "Для кейсів",
    remind: "Нагадувати",
    create_question: "Створити питання",
    remembers: {
      week: "1 раз на тиждень",
      month: "1 раз на місяць",
      cvartal: "1 раз на квартал",
      year: "1 раз на рік",
    }
  },


};
export const appConfig = {
  access: {
    case: {
      a_page_case_add: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.assigned_categories, ids: true, type: 'case_categories', key: "a_id_cases_add_categories" },
          { value: '8', label: LANG.full_access },
        ],
        title: LANG.a_page_case_add,
        key: "a_page_case_add"
      },
      a_page_case_look: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.only_own },
          { value: '2', label: LANG.assigned_categories, ids: true, type: 'case_categories', key: "a_id_cases_look_categories" },
          { value: '3', label: LANG.only_assigned, ids: true, type: 'cases', key: "a_id_cases" },
          { value: '8', label: LANG.full_access },
        ],
        title: LANG.a_page_case_look,
        key: "a_page_case_look"
      },
      a_page_case_edit_permission: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.only_own },
          { value: '2', label: LANG.assigned_categories, ids: true, type: 'case_categories' },
          { value: '3', label: LANG.only_assigned, ids: true, type: 'cases' },
          { value: '8', label: LANG.full_access },
        ],
        title: LANG.a_page_case_edit_permission,
        key: "a_page_case_edit_permission"
      },
      a_page_case_edit_actions: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.add },
          { value: '2', label: LANG.create_links_between_cases },
          { value: '3', label: LANG.create_individual_plan },
          { value: '4', label: LANG.delete_case },
          { value: '5', label: LANG.add_files },
          { value: '6', label: LANG.export },
          { value: '8', label: LANG.full_access },
        ],
        title: LANG.a_page_case_edit_actions,
        key: "a_page_case_edit_actions"
      },
      a_page_case_transfer: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.assigned_categories, ids: true, type: 'case_categories' },
          { value: '2', label: LANG.only_own },
          { value: '8', label: LANG.full_access },
        ],
        title: LANG.a_page_case_transfer,
        key: "a_page_case_transfer"
      },
      a_page_case_add_notes: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.only_own },
          { value: '2', label: LANG.assigned_categories, ids: true, type: 'case_categories' },
          { value: '3', label: LANG.only_assigned, ids: true, type: 'cases' },
          { value: '4', label: LANG.add_record_about_provided_assistance },
          { value: '8', label: LANG.full_access },
        ],
        title: LANG.a_page_case_add_notes,
        key: "a_page_case_add_notes"
      },
      a_page_case_hidden: {
        options: [
          { value: '0', label: LANG.completely_hidden },
          { value: '1', label: LANG.almost_all_hidden },
          { value: '2', label: LANG.average },
          { value: '3', label: LANG.low },
          { value: '8', label: LANG.full_access },
        ],
        title: LANG.a_page_case_hidden,
        key: "a_page_case_hidden"
      }
    }
  },
  newAccess: {
    // tasks:{
    //   view_edit:[
    //     "a_task_manager"
    //   ]
    // },
    access: {
      yes_no: [
        "a_super",
        "a_administartor",
        "a_blocked",
        "a_update_program"
      ],
      view_edit: []
    },
    accessCases: {
      get: {
        right: "a_cases_get",
        options: {
          0: LANG.access.get_options[0],
          1: LANG.access.get_options[1],
          2: LANG.access.get_options[2],
          7: LANG.access.get_options[7],
          8: LANG.access.get_options[8],
        }
      },
      categories: [
        "a_cases_category_edit_id",
        "a_cases_category_look_id"
      ],
      cases: [
        "a_cases_edit_id",
        "a_cases_look_id",
      ]
    },
    case: {
      yes_no: [
        "a_page_case_export_pdf",
        "a_page_case_media_download",
        "a_page_case_add",
      ],
      view_edit: [
        "a_page_case",
        "a_page_case_transfer",
        "a_page_case_notes",
        "a_page_case_plan",
        "a_page_case_help",
        "a_page_case_media",
        "a_page_case_connection",
        "a_page_case_contact_info",
        "a_page_case_simple_info",
        "a_page_case_info",
        "a_page_case_files"
      ],
    },
    cases: {
      yes_no: [
        "a_page_cases",
        "a_page_cases_print",
        "a_page_cases_mask",
        "a_page_cases_look_list",
        "a_page_cases_sort",

      ],
      view_edit: []
    },
    resources: {
      yes_no: [
        "a_page_resources",
        "a_page_resources_upload",
        "a_page_resources_download",
        "a_page_resources_edit",
        "a_page_resources_remove"
      ],
      view_edit: []
    },
    phonebook: {
      yes_no: [
        "a_page_phonebook",
        "a_page_phonebook_remove"
      ],
      view_edit: [
        "a_page_phonebook_contact"
      ]
    },
    calendar: {
      yes_no: [
        "a_page_calendar",
        "a_page_calendar_look_cases_HB",
        "a_page_calendar_look_users_HB",
        "a_page_calendar_add_event",
        "a_page_calendar_edit",
        "a_page_calendar_remove",
      ],
      view_edit: []
    },
    event: {
      yes_no: [
        "a_page_event",
        "a_page_event_create",
        "a_page_event_remove",
        "a_page_event_add_plan",
        "a_page_event_add_feedback",
        "a_page_event_add_media",

      ],
      view_edit: [
        "a_page_event_users",
        "a_page_event_cases",
        "a_page_event_edit",
        "a_page_event_plan",
        "a_page_event_feedback",
        "a_page_event_media",
      ]
    },
    events: {
      yes_no: [
        "a_page_events"
      ],
      view_edit: []
    },
    user: {
      yes_no: [
        "a_page_user",
        "a_page_user_change_pass",
        "a_page_user_users",
        "a_page_user_add_history",
      ],
      view_edit: [
        "a_page_user_contact",
      ]
    },
    settings: {
      yes_no: [
        "a_page_settings",
        "a_page_settings_tab_users",
        "a_page_settings_tab_categories",
        "a_page_settings_tab_events",
        "a_page_settings_tab_configurations",
        "a_page_settings_tab_super",
        "a_page_settings_tab_telegram",
        "a_page_settings_activate_users",
        "a_page_settings_deactivate_users",
        "a_page_settings_remove_user",
        "a_page_settings_show_phones",
        "a_page_settings_show_name",
        "a_page_settings_category_case_add",
        "a_page_settings_category_case_remove",
        "a_page_settings_category_phone_add",
        "a_page_settings_category_phone_remove",
        "a_page_settings_category_help_add",
        "a_page_settings_category_help_remove",
        "a_page_settings_category_group_add",
        "a_page_settings_category_group_remove",
      ],
      view_edit: [
        "a_page_settings_change_accesses",
        "a_page_settings_case_categories",
        "a_page_settings_phone_categories",
        "a_page_settings_help_categories",
      ]
    },
    accesses: {
      yes_no: [
        "a_page_access",
        "a_page_access_create",
        "a_page_access_edit"
      ],
      view_edit: []
    },
    groups: {
      yes_no: [
        "a_page_group",
        "a_group_create",
        "a_page_group_phones",
        "a_page_group_names",
        "a_page_group_favourite"
      ],
      view_edit: [
        "a_page_groups",
      ]
    },
    file: {
      yes_no: [],
      view_edit: [
        "a_page_file",
      ]
    }

  },
  statusPlan: {
    0: {
      title: LANG.status_plan[0],
      color: "#d2f2cf"
    },
    1: {
      title: LANG.status_plan[1],
      color: "#fcf8bc"
    },
    2: {
      title: LANG.status_plan[2],
      color: "#ffc5c5"
    },
    // 3: {
    //   title: LANG.status_plan[3],
    //   color: "#f78e8e"
    // },
    // 4: {
    //   title: LANG.status_plan[4],
    //   color: "#ff7777"
    // },
    7: {
      title: LANG.status_plan[7],
      color: "#ff8fa3"
    },
    8: {
      title: LANG.status_plan[8],
      color: "#80ed99"
    },
  },
  pages: {
    case: {
      title: LANG.pages.case,
      description: ""
    },
    cases: {
      title: LANG.pages.cases,
      description: "",
      path: '/cases'
    },
    addCase: {
      title: LANG.pages.addCase,
      description: "",
      path: "/add-case"
    },
    settings: {
      title: LANG.pages.settings,
      description: "",
      path: "/settings"
    },
    users: {
      title: LANG.pages.users,
      description: ""
    },
    resources: {
      title: LANG.pages.resources,
      description: "",
      path: "/resources"
    },
    statistic: {
      title: LANG.pages.statistic,
      description: "",
      path: "/statistic"
    },
    // phonebook: {
    //   title: LANG.pages.phonebook,
    //   description: ""
    // },
    calendar: {
      title: LANG.pages.calendar,
      description: "",
      path: "/calendar"
    },
    event: {
      title: LANG.pages.event,
      description: ""
    },
    events: {
      title: LANG.pages.events,
      description: "",
      path: "/events"
    },
    user: {
      title: LANG.pages.user,
      description: ""
    },
    users: {
      title: LANG.pages.users,
      description: "",
      path: "/users"
    },
    tasks: {
      title: LANG.pages.tasks,
      description: "",
      path: "/tasks"
    },
    accesses: {
      title: LANG.pages.accesses,
      description: "",
      path: "/access"
    },
    groups: {
      title: LANG.pages.groups,
      description: "",
      path: '/groups'
    },
    fields: {
      title: "Системні поля",
      description: "",
      path: '/fields'
    },
    file: {
      title: LANG.pages.file,
      description: ""
    },
    access: {
      title: LANG.pages.access,
      description: ""
    },
    ancets: {
      title: "Анкети",
      description: "",
      path: "/ancets"
    },
    transactions: {
      title: "Транзакції",
      description: "",
      path: "/transactions"
    }
  },
  mounths: {
    1: {
      title: LANG.mounths.jan,
      color: "#93baf4"
    },
    2: {
      title: LANG.mounths.feb,
      color: "#83a6dc"
    },
    3: {
      title: LANG.mounths.march,
      color: "#91f5a9"
    },
    4: {
      title: LANG.mounths.april,
      color: "#7fd693"
    },
    5: {
      title: LANG.mounths.may,
      color: "#71bd83"
    },
    6: {
      title: LANG.mounths.june,
      color: "#c4f091"
    },
    7: {
      title: LANG.mounths.july,
      color: "#aed681"
    },
    8: {
      title: LANG.mounths.aug,
      color: "#96b96e"
    },
    9: {
      title: LANG.mounths.sep,
      color: "#f0d98d"
    },
    10: {
      title: LANG.mounths.okt,
      color: "#dbc680"
    },
    11: {
      title: LANG.mounths.nov,
      color: "#b7a569"
    },
    12: {
      title: LANG.mounths.dec,
      color: "#7595c5"
    },
  },
  default: {
    color: "#42a5f5"
  },
  caseViewSettings: [
    {
      primary: "view_ProfilePhoto"
    },
    {
      primary: "view_GroupConnection"
    },
    {
      primary: "view_Plan"
    },
    {
      primary: "view_Help"
    },
    {
      primary: "view_Notes"
    },
    {
      primary: "view_Files"
    },
    {
      primary: "view_Gallery"
    },
    {
      primary: "view_FileUploader"
    },
    {
      primary: "view_DetailedInfo"
    },
    {
      primary: "view_Fields"
    },
    {
      primary: "view_InfoBlock",
      options: [
        "view_name",
        "view_phone",
        "view_email",
        "view_birthday",
        "view_address",
        "view_date_first_contact",
        "view_sex",
        "view_date_created",
        "view_contract",
        "view_channel",
        "view_categories",
        "view_responsible",
        "view_Histories"
      ]
    }
  ],
  caseViewSettingsLists: [
    {
      primary: "view_InfoBlock",
      options: [
        "view_name",
        "view_phone",
        "view_email",
        "view_birthday",
        "view_address",
        "view_date_first_contact",
        "view_sex",
        "view_date_created",
        "view_contract",
        "view_channel",
        "view_categories",
        "view_responsible",
      ]
    }
  ],
  config: {
    notifications: {
      case: {
        created_send_all_users: {
          title: 'Надіслати сповіщення всім користувачам, коли створено кейс',
          description: "",
          type: 'boolean',
          value: true
        },
      },
      event: {
        created_send_all_users: {
          title: 'Надіслати сповіщення всім користувачам, коли створено подію',
          description: "",
          type: 'boolean',
          value: true
        }
      }
    },
    API: {
      telegram_bot: {
        token: {
          title: "Telegram bot token",
          description: "",
          type: 'string',
          value: null
        },
        userID: {
          title: "User ID",
          description: "",
          type: 'string',
          value: null
        }
      }
    },
    administration: {
      twofa: {
        title: "Enabled 2FA",
        description: "",
        type: 'boolean',
        value: true
      },
      system_phone: {
        title: "System Phone number",
        description: "",
        type: 'number',
        value: ''
      },
      system_email: {
        title: "System Email",
        description: "",
        type: 'email',
        value: ''
      }
    },
  },

  userConfig: {
    notifications: {
      case: {
        created_all: {
          title: 'Надіслати спqовіщення, коли створено кейс у програмі',
          description: "",
          type: 'boolean',
          value: true
        },
        switch_responsible: {
          title: 'Надіслати спqовіщення, коли вас назначено відповідальним або змінено',
          description: "",
          type: 'boolean',
          value: true
        },
        change_case_name: {
          title: "Надіслати спqовіщення, коли змінено ім'я кейсу",
          description: "",
          type: 'boolean',
          value: true
        },
        change_case_data: {
          title: "Надіслати спqовіщення, коли редагується кейс",
          description: "",
          type: 'boolean',
          value: true
        },
        case_happy_day: {
          title: "Надіслати спqовіщення, дня народження кейса",
          description: "",
          type: 'boolean',
          value: true
        }
      },
      event: {
        created_all: {
          title: 'Надіслати сповіщення, коли створено подію',
          description: "",
          type: 'boolean',
          value: true
        },
        change_event_data: {
          title: "Надіслати спqовіщення, коли редагується івент/подія",
          description: "",
          type: 'boolean',
          value: true
        },
      }
    },
    API: {
      telegram: {
        userID: {
          title: "User ID",
          description: "",
          type: 'string',
          value: null
        },
        userID: {
          title: "User Name",
          description: "",
          type: 'string',
          value: null
        },
        phone: {
          title: "Phone",
          description: "",
          type: 'string',
          value: null
        }
      }
    }
  },
  defaultConfig: {
    system: [
      {
        config_key: 'system_twofa',
        value: true,
        type: 'boolean',
        description: LANG.CONFIG.system_twofa_description,
        label: LANG.CONFIG.system_twofa_label
      }
    ]
  },
  fields: [
    {
      label: LANG.FIELDS.type_fields.int,
      key: "int"
    },
    {
      label: LANG.FIELDS.type_fields.boolean,
      key: "boolean"
    },
    {
      label: LANG.FIELDS.type_fields.string,
      key: "string"
    },
    {
      label: LANG.FIELDS.type_fields.phone,
      key: "phone"
    },
    {
      label: LANG.FIELDS.type_fields.email,
      key: "email"
    },
    {
      label: LANG.FIELDS.type_fields.date,
      key: "date"
    },
    {
      label: LANG.FIELDS.type_fields.text,
      key: "text"
    },
  ],
  menu: [
    {
      title: LANG.pages.cases,
      link: "/cases",
      icon: "cases",
      access: "a_page_cases"
    },
    {
      title: LANG.pages.addCase,
      link: "/add-case",
      icon: "add_case",
      access: "a_page_case_add"
    },
    // {
    //     title: LANG.pages.contacts,
    //     link: "/contacts"
    // },
    {
      title: LANG.pages.calendar,
      link: "/calendar",
      icon: "calendar",
      access: "a_page_calendar"
    },
    {
      title: LANG.pages.events,
      link: "/events",
      icon: "event",
      access: "a_page_event"
    },
    {
      title: LANG.pages.groups,
      link: "/groups",
      icon: "groups",
      access: 'a_page_groups'
    },
    {
      title: LANG.pages.ancets,
      link: "/ancets",
      icon: "quiz",
      access: 'super'
    },
    {
      title: LANG.pages.statistic,
      link: "/statistic",
      icon: "statistic",
      access: "super"
    },
    {
      title: LANG.pages.transactions,
      link: "/transactions",
      icon: "transaction",
      access: 'super'
    },
    // {
    //   title: LANG.pages.settings,
    //   link: "/settings",
    //   icon: "settings",
    //   access: "a_page_settings"
    // },
    {
      title: LANG.pages.resources,
      link: "/resources",
      icon: "resource",
      access: "a_page_resources"
    },

    // {
    //     title: LANG.pages.cooperation,
    //     link: "/cooperation"
    // },
    {
      title: LANG.pages.users,
      link: "/users",
      icon: "users",
      access: "a_page_settings_tab_users"
    },
    {
      title: LANG.pages.tasks,
      link: "/tasks",
      icon: "task",
      access: "a_task_manager"
    },
    {
      title: LANG.pages.administration,
      icon: "settings",
      type: "settings",
      access: "a_page_settings",
      subMenu: [
        {
          title: LANG.pages.fields,
          link: "/fields",
          icon:"fields"
        },
        {
          title: LANG.pages.settings,
          link: "/settings",
          icon: "settings_2",
          access: "a_page_settings"
        },
        {
          title: LANG.pages.accesses,
          link: "/access",
          icon: "access",
          access: "a_page_access"
        },
      ]
    },
  ],
  rating_scale: {
    10: {
      1: LANG.ratingScale10.one,
      2: LANG.ratingScale10.two,
      3: LANG.ratingScale10.three,
      4: LANG.ratingScale10.four,
      5: LANG.ratingScale10.five,
      6: LANG.ratingScale10.six,
      7: LANG.ratingScale10.seven,
      8: LANG.ratingScale10.eight,
      9: LANG.ratingScale10.nine,
      10: LANG.ratingScale10.ten
    },
    5: {
      1: LANG.ratingScale5.one,
      2: LANG.ratingScale5.two,
      3: LANG.ratingScale5.three,
      4: LANG.ratingScale5.four,
      5: LANG.ratingScale5.five
    }
  },
}