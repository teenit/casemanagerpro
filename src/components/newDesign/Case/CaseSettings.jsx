import React, { useEffect, useState } from "react";
import { LANG, appConfig } from "../../../services/config";
import { Button, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Icon from "../../elements/Icons/Icon";

const BlueCheckbox = withStyles({
    root: {
        color: "#1976d2",
        '&$checked': {
            color: "#1976d2",
        },
        '&:hover': {
            color: "#005bb5",
        },
    },
    checked: {},
})(Checkbox);

const BlueButton = withStyles({
    root: {
        backgroundColor: "#1976d2",
        color: "#fff",
        '&:hover': {
            backgroundColor: "#005bb5",
        },
    },
})(Button);

const CaseSettings = ({ views, successHandler }) => {
    const { caseViewSettings, caseViewSettingsLists } = appConfig;
    const [state, setState] = useState({});
    const [lists, setLists] = useState([]);

    useEffect(() => {
        setState({ ...views });

        const initialLists = caseViewSettingsLists.map(item => {
            const options = item.options.reduce((acc, option) => {
                acc[option] = false;
                return acc;
            }, {});
            return { [item.primary]: options };
        });

        setLists(initialLists);
    }, [views]);

    const changeHandler = (key, value) => {
        setState(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const listChangeHandler = (parentKey, key, value) => {
        setLists(prevLists => prevLists.map(list => {
            if (list[parentKey]) {
                return {
                    [parentKey]: {
                        ...list[parentKey],
                        [key]: value
                    }
                };
            }
            return list;
        }));
    };

    const List = ({ parentKey, listItems }) => {
        const [show, setShow] = useState(true);
        const parentState = state[parentKey] ?? {};

        return (
            <div>
                <div className="CaseSettings-list">
                    <label>
                        <BlueCheckbox
                            onChange={(e) => { changeHandler(parentKey, e.target.checked); }}
                            checked={parentState === undefined ? true : parentState}
                        />
                        {LANG.case_view_settings[parentKey]}
                    </label>
                    {/* <Icon icon={"arrow_down"} onClick={() => { setShow(!show); }} /> */}
                </div>
                {show && <div className="CaseSettings" style={{ paddingLeft: '20px' }}>
                    {listItems.map((listItem, listIndex) => (
                        <label key={listItem}>
                            <BlueCheckbox
                                onChange={(e) => { listChangeHandler(parentKey, listItem, e.target.checked); }}
                                checked={parentState[listItem] === undefined ? true : parentState[listItem]}
                            />
                            {LANG.case_view_settings[listItem]}
                        </label>
                    ))}
                </div>}
            </div>
        );
    };

    const handleSave = () => {
        successHandler(lists.push(state));
    };

    return (
        <div className="CaseSettings">
            {caseViewSettings.map((item, index) => (
                <label key={item}>
                    <BlueCheckbox
                        onChange={(e) => { changeHandler(item, e.target.checked); }}
                        checked={state[item] === undefined ? true : state[item]}
                    />
                    {LANG.case_view_settings[item]}
                </label>
            ))}
            {caseViewSettingsLists.map((item, index) => {
                const parentKey = item.primary;
                const listItems = item.options;
                return <List key={parentKey} parentKey={parentKey} listItems={listItems} />;
            })}
            <BlueButton variant="contained" onClick={handleSave}>{LANG.GLOBAL.save}</BlueButton>
        </div>
    );
};

export default CaseSettings;
