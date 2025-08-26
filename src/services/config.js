import { getLanguage } from "./languages/lang";

export const LANG = getLanguage();
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
    resources_new: {
      title: LANG.pages.resources,
      description: "",
      path: "/resources_new"
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
          icon:"fields",
          access:"a_super"
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
  formats: {
    allowedToUpload: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff', 'heic',
        'mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm', 'pdf', 'doc', 'docx', 'xls', 'xlsx',
            'ppt', 'pptx', 'txt', 'rtf', 'odt', 'ods', 'odp',
            'csv', 'mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'zip', 'rar', '7z', 'tar', 'gz'],
    media: ""
  },
}