export const LANG = {
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
    add_record_about_provided_assistance: "Додати запис про надану допомогу",
    a_page_case_add:"Створити кейс",
    a_page_case_look:"Переглядати кейс",
    a_page_case_edit_permission:"Доступ до редагуванння кейсів",
    a_page_case_edit_actions:"Редагувати кейс",
    a_page_case_transfer:"Передати кейс іншому користувачу",
    a_page_case_add_notes:"Додавати нотатки до кейсу",
    a_page_case_hidden:"Приховати інформацію", 
    access:{
      add_name:"Назва нового права",
      add_description:"Опис нового права",
    },
    status_plan: {
      0:"Задачу створено",
      1:"Задача в процесі",
      2:"Задача призупинена",
      3:"Задача видалена",
      4:"Задачу завершено не успішно",
      7:"Задача виконана не успішно",
      8:"Задача виконана успішно",
    },
    status_task: "Статус задачі", 
    start_time: "Дата початку",
    end_time: "Дата кінця",
    task_plan:"Задача плану",
    create_plan: "Створити план",
    cancel:"Відмінити",
    save:"Зберегти",
    status:"Статус",
    planing:"Планування",
    gallery:"Додані медіа файли",
    documents:"Додані документи"
  };
export const appConfig = {
    access:{
        case:{
            a_page_case_add: {
              options: [
                { value: '0', label: LANG.forbidden },
                { value: '1', label: LANG.assigned_categories, ids: true, type: 'case_categories', key: "a_id_cases_add_categories" },
                { value: '8', label: LANG.full_access },
              ],
              title: LANG.a_page_case_add,
              key:"a_page_case_add"
            },
            a_page_case_look: {
              options: [
                { value: '0', label: LANG.forbidden },
                { value: '1', label: LANG.only_own },
                { value: '2', label: LANG.assigned_categories, ids: true, type: 'case_categories', key: "a_id_cases_look_categories" },
                { value: '3', label: LANG.only_assigned , ids: true, type: 'cases', key: "a_id_cases"},
                { value: '8', label: LANG.full_access },
              ],
              title: LANG.a_page_case_look,
              key:"a_page_case_look"
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
              key:"a_page_case_edit_permission"
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
              key:"a_page_case_edit_actions"
            },
            a_page_case_transfer: {
              options: [
                { value: '0', label: LANG.forbidden },
                { value: '1', label: LANG.assigned_categories, ids: true, type: 'case_categories' },
                { value: '2', label: LANG.only_own },
                { value: '8', label: LANG.full_access },
              ],
              title: LANG.a_page_case_transfer,
              key:"a_page_case_transfer"
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
              key:"a_page_case_add_notes"
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
              key:"a_page_case_hidden"
            }
          }
    },
    newAccess:{
      access:[
        "a_super",
        "a_administartor",
        "a_blocked"
      ],
      accessCases:[
        "a_page_cases_edit_id", 
        "a_page_cases_look_id", 
        "a_page_cases_category_edit_id", 
        "a_page_cases_category_look_id"
      ],
      case: {
        yes_no:[
          "a_page_case_export", 
          "a_page_case_media_download",
        ],
        view_edit:[
          "a_page_case", 
          "a_page_case_add", 
          "a_page_case_transfer", 
          "a_page_case_notes", 
          "a_page_case_plan", 
          "a_page_case_help", 
          "a_page_case_media", 
          "a_page_case_connection",
          "a_page_case_contact_info",
          "a_page_case_simple_info",
          "a_page_case__info",
        ],
      }
    },
    statusPlan:{
      0:{
        title: LANG.status_plan[0],
        color: "#f2e8cf"
      },
      1:{
        title: LANG.status_plan[1],
        color: "#ffba08"
      },
      2:{
        title: LANG.status_plan[2],
        color: "#ca6702"
      },
      3:{
        title: LANG.status_plan[3],
        color: "#d90429"
      },
      4:{
        title: LANG.status_plan[4],
        color: "#c9184a"
      },
      7:{
        title: LANG.status_plan[7],
        color: "#ff8fa3"
      },
      8:{
        title: LANG.status_plan[8],
        color: "#80ed99"
      },
    }
}