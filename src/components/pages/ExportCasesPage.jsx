import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, selectClasses, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../elements/Inputs/Input";
import { LANG } from "../../services/config";
import CheckboxListAccess from "../elements/CheckBoxes/CheckboxListAccess";
import { apiResponse, getBlobFile } from "../Functions/get_apiObj";

const CASE_DATA = {
    profile_photo: {
        label: "фото (доступно тільки для ПДФ)",
        visible: 'default',
        values: [
            {
                key: 'profile_photo',
                label: 'фото (доступно тільки для ПДФ)',
                type: 'photo'
            }
        ]
    },
    pib: {
        label: "ПІБ, номер кейсу",
        visible: 'default',
        values: [
            {
                key: 'middle_name',
                label: "Прізвище",
                type: "string",
            },
            {
                key: 'first_name',
                label: "Ім'я",
                type: "string",
            },
            {
                key: 'last_name',
                label: "По батькові",
                type: "string",
            },
            {
                key: 'case_id',
                label: "Номер кейсу",
                type: "number",
            },

        ]
    },
    main: {
        label: "Основна інформація (номера телефонів, пошта, спосіб зв'язку, номери договорів)",
        visible: 'default',
        values: [
            {
                key: 'phone1',
                label: 'Номер телефону 1',
                type: "string",
            },
            {
                key: 'phone2',
                label: 'Номер телефону 2',
                type: "string",
            },
            {
                key: 'email',
                label: 'Електронна пошта',
                type: "string",
            },
            {
                key: 'happy_bd',
                label: 'Дата народження',
                type: "date",
            },
            {
                key: 'contract_date',
                label: 'Дата укладання договору',
                type: "date",
            },
            {
                key: 'contract_number',
                label: 'Номер договору',
                type: "string",
            },
            {
                key: 'case_categories',
                label: 'Категорії кейса',
                type: "string",
            },

        ]
    },
    contact: {
        label: "Контактні дані ",
        visible: 'fields',
        key: "contacts",
        values: [],
    },
    work: {
        label: "Робочі дані",
        visible: 'fields',
        key: "works",
        values: [],
    },
    another: {
        label: "Дані по за групою",
        visible: 'fields',
        key: "another",
        values: [],
    },
    details_info: {
        label: "Детальна інформація",
        visible: 'default',
        values: [
            {
                key: 'potreba',
                label: 'Потреба',
                type: "string",
            },
            {
                key: 'family_info',
                label: 'Сімейний стан',
                type: "string",
            },
            {
                key: 'history',
                label: 'Історія сім\'ї / особи',
                type: "string",
            },
            {
                key: 'comment',
                label: 'Коментар до кейсу',
                type: "string",
            },
        ]
    },
}

class ExportCasesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exportFormat: "pdf",
            activeStep: 0,
            exportData: {},
            settings: {
                label: "Встановити пароль на файл",
                selected: false,
                value: ''
            },
            casesList: [],
            selectedCasesList: [],
            loading: false
        };
    }

    componentDidMount = () => {
        this.prepareExportData();
    }

    loadCases = () => {
        apiResponse({}, "case/get/cases-page-list.php").then((res) => {
            if (res.status) {
                this.setState({ casesList: res.list, loading: false })
            }

        });
    }

    prepareExportData = () => {
        const exportData = { ...CASE_DATA };
        const { caseFields } = this.props;

        Object.keys(CASE_DATA).forEach(key => {
            exportData[key].selected = false;

            if (exportData[key].visible == 'default' && exportData[key]?.values?.length) {
                exportData[key].values.forEach((value, index) => {
                    exportData[key].values[index].selected = false;
                })
            } 
            
            if (exportData[key].visible == 'fields'){
                exportData[key].values = caseFields[exportData[key].key].map((item => {
                   return { 
                    label: item.name,
                    field_id: item.id,
                    selected: false,
                    type: item.type,
                    key: item.id,
                    }
                }))
            }
        });

        this.setState({ exportData })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.caseFields !== this.props.caseFields) {
             this.prepareExportData();
        }
    }

    onChangeExportData = (e, key, parentKey) => {
        const selected = e.target.checked;

        this.setState((prevState) => {
            const exportData = { ...prevState.exportData };

            if (parentKey === "all") {
                // клон групи
                const group = { ...exportData[key] };
                group.selected = selected;

                if (Array.isArray(group.values)) {
                    group.values = group.values.map((child) => ({
                        ...child,
                        selected,
                    }));
                }
                exportData[key] = group;
            } else {
                // клон групи
                const parent = { ...exportData[parentKey] };

                if (Array.isArray(parent.values)) {
                    parent.values = parent.values.map((child) => {
                        if (child.key === key) {
                            return { ...child, selected };
                        }
                        return child;
                    });

                    if (!selected) {
                        parent.selected = false;
                    }
                }

                if (Array.isArray(parent.values)) {
                    let selectedAll = true;
                    parent.values.forEach((item) => {
                        if(!item.selected) {
                            selectedAll = false
                        }
                    })
                    parent.selected = selectedAll;
                }
                exportData[parentKey] = parent;
            }

            return { exportData };
        });
    };



    exportToExcel = (data) => {
        getBlobFile({ ...data, action: "cases_list" }, "excel/excel.php").then((res) => {
            const url = window.URL.createObjectURL(new Blob([res]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "cases.xlsx"; // ім'я файлу
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })

        // apiResponse({...data, action: "cases_list"}, "excel/excel.php" ).then((res) => {
        //      console.log(res)
        // })
    }

    export = () => {
        const { exportData } = this.state
        let data = {};
        data.exportData = { ...exportData };
        // Object.entries(exportData).forEach(([key, item]) => {
        //     if (item?.values?.length > 0) {
        //         item.values.forEach((elem)=>{
        //             console.log(elem)
        //             if(elem?.selected) {
        //                 data.exportData[elem.key] = elem.selected;
        //             }
        //         })
        //     } else {
        //         data.exportData[key] = item?.selected;
        //     }     
        // });

        if (this.state.settings.selected && this.state.settings.value) {
            data.documentPassword = this.state.settings.value
        }

        if (this.state.selectedCasesList?.length > 0) {
            data.casesIds = this.state.selectedCasesList;
        } else {
            return false;
        }
        if (this.state.exportFormat == 'excel') {
            return this.exportToExcel(data)
        }

    }



    render() {
        const { exportData, settings } = this.state;
        return (
            <div className="ExportCasesPage">
                <Stepper activeStep={this.state.activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Оберіть формат експорту кейсів</StepLabel>
                        <StepContent>
                            <RadioGroup
                                value={this.state.exportFormat}
                                onChange={(e) => this.setState({ exportFormat: e.target.value })}
                            >
                                <FormControlLabel value={'pdf'} control={<Radio />} label={'PDF'} />
                                <FormControlLabel value={'excel'} control={<Radio />} label={'Excel'} />
                            </RadioGroup>
                            <div>
                                <Button onClick={() => this.setState({ activeStep: 1 })}>Наступний крок</Button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Оберіть дані для експорту</StepLabel>
                        <StepContent>
                            <div className="ExportCasesPage-step2-list">
                                {Object.entries(exportData).map(([key, item]) => (
                                    <div key={key}>
                                        <label>
                                            <Checkbox
                                                size="small"
                                                checked={item.selected}
                                                onChange={(e) => this.onChangeExportData(e, key, 'all')}
                                            />
                                            <span>{item.label}</span>
                                        </label>

                                        {item?.values && Object.keys(item.values).length > 0 && (
                                            <div style={{ paddingLeft: "20px" }}>
                                                {item.values.map((elem) => (
                                                    <div key={elem.key}>
                                                        <label>
                                                            <Checkbox
                                                                size="small"
                                                                checked={elem.selected}
                                                                onChange={(e) => this.onChangeExportData(e, elem.key, key)}
                                                            />
                                                            <span>{elem.label}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div>
                                <Button onClick={() => this.setState({ activeStep: 0 })}>Попередній крок</Button>
                                <Button onClick={() => this.setState({ activeStep: 2 })}>Наступний крок</Button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Налаштування файлу експорту</StepLabel>
                        <StepContent>
                            <div>
                                <label>
                                    <Checkbox size="small" checked={settings.selected} onChange={(e) => {
                                        this.setState({ settings: { ...settings, selected: e.target.checked } })
                                    }} />
                                    <span>{settings.label}</span>
                                </label>
                                {settings.selected &&
                                    <Input label={LANG.exportPDFcasesModal.archive_pass} value={settings.value} onChange={(e) => {
                                        this.setState({ settings: { ...settings, value: e.target.value } })
                                    }} />
                                }
                            </div>
                            <div>
                                <Button onClick={() => this.setState({ activeStep: 1 })}>Попередній крок</Button>
                                <Button onClick={() => {
                                    this.setState({ activeStep: 3, loading: true }, () => {
                                        this.loadCases()
                                    })

                                }}>Наступний крок</Button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Оберіть кейси для експорту</StepLabel>
                        <StepContent>
                            {!this.state.loading &&
                                <CheckboxListAccess checkedAll={true} onCheckedAll={(mas) => this.setState({ selectedCasesList: [...mas] })} checkedMas={this.state.selectedCasesList} allMas={() => { return this.state.casesList }} onChange={(value) => {
                                    let cases = [];
                                    if (this.state.selectedCasesList.includes(value)) {
                                        cases = this.state.selectedCasesList.filter(element => element !== value);
                                    } else {
                                        cases = [...this.state.selectedCasesList, value];
                                    }
                                    this.setState({ selectedCasesList: [...cases] })
                                }} />}
                            <div>
                                <Button onClick={this.export}>Скачати файл</Button>
                            </div>
                        </StepContent>
                    </Step>

                </Stepper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ancets: state.ancets,
        caseFields: state.fields.cases
    }
};

export default connect(mapStateToProps)(ExportCasesPage);