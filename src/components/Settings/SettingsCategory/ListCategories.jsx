import React, { useState } from "react";
import Icon from "../../elements/Icons/Icon";
import Modal from "../../Modals/Modal";
import { Button } from "@mui/material";
import Input from "../../elements/Inputs/Input";
import InputColor from "../../elements/Inputs/InputColor";
import Textarea from "../../elements/Inputs/Textarea";
import { apiResponse } from "../../Functions/get_apiObj";
import ModalConfirm from "../../Modals/ModalConfirm";
import ActionMenu from "../../Portals/ActionMenu";
import { LANG } from "../../../services/config";

const ListCategories = ({ categories, loadCategories }) => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [modals, setModals] = useState({
        edit: false,
        confirm_delete: false,
    });
    const [totalConnection, setTotalConnection] = useState(0)

    const modalHandler = (key, value = null) => {
        setModals({ ...modals, [key]: !modals[key] });
        if (value) {
            setCurrentCategory({ ...value });
        }
    };

    const changeHandler = (val, key) => {
        setCurrentCategory({ ...currentCategory, [key]: val });
    };

    const editCategory = () => {
        const obj = {
            categoryName: currentCategory.name,
            categoryDescription: currentCategory.description,
            categoryColor: currentCategory.color,
            categoryKey: currentCategory.key,
            category_id: currentCategory.id,
        };
        apiResponse({ ...obj, action: "edit_category" }, "manage/category.php").then(() => {
            loadCategories();
            modalHandler("edit");
        });
    };

    const deleteCategory = () => {
        apiResponse({ category_id: currentCategory.id, action: "delete_category" }, "manage/category.php").then(() => {
            loadCategories();
            modalHandler("confirm_delete");
        });
    };

    const getAmountConnections = (category_id) => {

         apiResponse({ category_id, action: "get_amount_connection" }, "manage/category.php").then((res) => {
            if (res.status) {
                setTotalConnection(res.data.count);
            }
        });
    }

    return (
        <div className="ListCategories">
            {categories.map((item, ind) => {
                const menuItems = [
                    {
                        title: LANG.GLOBAL.edit,
                        isHidden: false,
                        icon: "edit",
                        click: () => modalHandler("edit", item),
                    },
                    { itemType: "divider" },
                    {
                        title: LANG.GLOBAL.delete,
                        isHidden: false,
                        icon: "delete",
                        color: "error",
                        click: () => {
                            modalHandler("confirm_delete", item);
                            getAmountConnections(item.id);
                        },
                    },
                ];

                return (
                    <div className="ListCategories--item" key={item.id} title={item.description}>
                        <div className="ListCategories--item-info">
                            <div className="ListCategories--item-number">{ind + 1}.</div>
                            <div className="ListCategories--item-circle" style={{ backgroundColor: item.color }}></div>
                            <div className="ListCategories--item-title">{item.name}</div>
                        </div>
                        <ActionMenu menuItems={menuItems} />
                    </div>
                );
            })}

            {modals.edit && currentCategory && (
                <Modal
                    header={LANG.SETTINGS.edit}
                    closeHandler={() => modalHandler("edit")}
                    footer={
                        <Button
                            disabled={!currentCategory.name}
                            variant="contained"
                            onClick={editCategory}
                        >
                            {LANG.GLOBAL.save}
                        </Button>
                    }
                >
                    <div className="SettingsCategory--form">
                        <div className="SettingsCategory--form-inputs">
                            <Input
                                label={LANG.SETTINGS.title_category}
                                value={currentCategory.name}
                                onChange={(e) => changeHandler(e.target.value, "name")}
                            />
                            <InputColor
                                className="w50"
                                format="hex"
                                value={currentCategory.color}
                                onChange={(e) => changeHandler(e.target.value, "color")}
                            />
                        </div>
                        <div className="SettingsCategory--form-textarea">
                            <Textarea
                                label={LANG.SETTINGS.description_category}
                                value={currentCategory.description}
                                onChange={(e) => changeHandler(e.target.value, "description")}
                                minRows={3}
                            />
                        </div>
                    </div>
                </Modal>
            )}

            {modals.confirm_delete && currentCategory && (
                <ModalConfirm
                    text={LANG.SETTINGS.confirm_delete + ". Всього зв'язків за цією категорією: " + totalConnection}
                    closeHandler={() => modalHandler("confirm_delete")}
                    successHandler={deleteCategory}
                />
            )}
        </div>
    );
};

export default ListCategories;
