import React, { useEffect, useState } from "react";
import { LANG, appConfig } from "../../../services/config";
import Checkbox from '@mui/material/Checkbox';
import { Switch } from "@mui/material";

const AccessDefaultBlock = (props) => {
    const [state, setState] = useState(props);
    const access = appConfig.newAccess[state.type];

    useEffect(() => {
        setState(props);
    }, [props]);

    const handleShowChange = (e, item) => {
        if (e.target.checked) {
            state.changeAccess(state.accesses[item] == 2 ? 2 : 1, item);
        } else {
            state.changeAccess(0, item);
        }
    };

    const handleEditChange = (e, item) => {
        if (e.target.checked) {
            state.changeAccess(2, item);
        } else if (state.accesses[item] == 2) {
            state.changeAccess(1, item);
        }
    };

    return (
        <div className="AccessDefaultBlock">
            <hr />
            <div className="AccessDefaultBlock-container">
                {access?.yes_no.map((item) => {
                    return (
                        <div className="line-yes" key={item}>
                            <div className="title">{LANG.access[item]}</div>
                            <Switch checked={!!state.accesses[item]} onChange={(e) => {
                                if (e.target.checked) {
                                    state.changeAccess(1, item);
                                } else {
                                    state.changeAccess(0, item);
                                }
                            }} />
                        </div>
                    );
                })}
            </div>
            <div className="AccessDefaultBlock-container">
                {access?.view_edit.length > 0 && (
                    <div className="line">
                        <div className="title"></div>
                        <div className="show">Відображати</div>
                        <div className="edit">Редагувати</div>
                    </div>
                )}
                {access?.view_edit.map((item) => {
                    return (
                        <div key={item} className="line">
                            <div className="title">{LANG.access[item]}</div>
                            <div className="show">
                                <Checkbox
                                    checked={state.accesses[item] === 1 || state.accesses[item] === 2}
                                    onChange={(e) => handleShowChange(e, item)}
                                />
                            </div>
                            <div className="edit">
                                <Checkbox
                                    checked={state.accesses[item] === 2}
                                    onChange={(e) => handleEditChange(e, item)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AccessDefaultBlock;
