import { useSelector } from "react-redux";

const AccessCheckCases = (cases, rights, categories) => {

    const userID = localStorage.getItem("id");
        if ((rights.a_super == 1 || rights.a_administartor == 1) && rights.a_blocked != 1) return {look:cases, edit:cases};
    switch (rights["a_cases_get"]) {
        case 0:
            return { look: [], edit: [] };
        case 1: {
            const userCases = cases.filter(item => item.user_id == userID);
            return { look: userCases, edit: userCases };
        }
        case 2: {
            // парсинг
            let lookCatIds = JSON.parse(rights["a_cases_category_look_id"]);
            let editCatIds = JSON.parse(rights["a_cases_category_edit_id"]);
            let lookIds = JSON.parse(rights["a_cases_look_id"].replace(/\\/g, ''));
            let editIds = JSON.parse(rights["a_cases_edit_id"].replace(/\\/g, ''));

            // фильтрация категорий
            lookCatIds = [...new Set([...editCatIds, ...lookCatIds])]
                .filter(item => categories.some(category => category.id === item));
            editCatIds = editCatIds.filter(item => categories.some(category => category.id === item));

            // фильтрация кейсов по id категорий
            const lookCatCases = cases.filter(item => item.categories && item.categories.some(catId => lookCatIds.includes(catId)));
            const editCatCases = cases.filter(item => item.categories && item.categories.some(catId => editCatIds.includes(catId)));

            // фильтрация кейсов по id
            let lookCases = cases.filter(item => lookIds.includes(item.id));
            const editCases = cases.filter(item => editIds.includes(item.id));
            lookCases = [...new Set([...lookCases, ...editCases])];

            // объединение
            const lookMas = [...new Set([...lookCatCases, ...lookCases])].sort((a, b) => a.id - b.id);
            const editMas = [...new Set([...editCatCases, ...editCases])].sort((a, b) => a.id - b.id);

            return { look: lookMas, edit: editMas };
        }
        case 7:
            return { look: cases, edit: [] };
        case 8:
            return { look: cases, edit: cases };
        default:
            return { look: [], edit: [] };
    }
};

export default AccessCheckCases;
