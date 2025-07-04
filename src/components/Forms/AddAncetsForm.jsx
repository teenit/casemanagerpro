import { Button, MenuItem, Select } from "@mui/material";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "../elements/Icons/Icon";
import Modal from "../Modals/Modal";
import FooterDefaultModal from "../Modals/FooterDefaultModal";
import Input from "../elements/Inputs/Input";
import { LANG } from "../../services/config";
import Textarea from "../elements/Inputs/Textarea";
import SmallNotification from "../elements/Notifications/SmallNotification"
class AddAncetsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            type: "cases",
            remember: "month",
            questions: [],
            alert: {
                active: false,
                isSuccess: false,
                message: ""
            }
        };
    }
    alertHandler = (isSuccess = false, message = "") => {
        this.setState({
            alert: {
                ...this.state.alert,
                active: !this.state.alert.active,
                isSuccess: isSuccess,
                message: message
            }
        })
    }
    createQuestion = () => {
        this.setState((prevState) => ({
            questions: [
                ...prevState.questions,
                { question: "", type: 5 }
            ]
        }));
    };

    save = () => {
        if (this.state.name.trim().length == 0) return this.alertHandler(false, LANG.ANCETS_PAGE.invalid_name)
        this.props.success(this.state);
    };

    updateQuestion = (index, value) => {
        this.setState((prevState) => {
            const updatedQuestions = [...prevState.questions];
            updatedQuestions[index].question = value;
            return { questions: updatedQuestions };
        });
    };

    updateQuestionType = (index, value) => {
        this.setState((prevState) => {
            const updatedQuestions = [...prevState.questions];
            updatedQuestions[index].type = value;
            return { questions: updatedQuestions };
        });
    };

    removeQuestion = (index) => {
        this.setState((prevState) => ({
            questions: prevState.questions.filter((_, i) => i !== index)
        }));
    };

    render() {
        const { close } = this.props;
        const { questions, alert } = this.state;

        return (
            <Modal closeHandler={close}
                header={LANG.ancets.add}
                footer={<FooterDefaultModal close={close} success={this.save} />}
            >
                <div>
                    <Input
                        addClass="w100"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        type="text"
                        label={LANG.GLOBAL.title}
                        size="small"
                    />
                </div>
                <div>
                    <Textarea addClass="w100"
                        value={this.state.description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                        type="textarea"
                        label={LANG.GLOBAL.description}
                        size="small"
                        multiline
                    />
                </div>
                <div>
                    <Select
                        value={this.state.type}
                        onChange={(e) => this.setState({ type: e.target.value })}
                        size="small"
                        className="w100"
                    >
                        <MenuItem value={'cases'}>{LANG.ancets.for_cases}</MenuItem>
                    </Select>
                </div>
                <div>
                    {LANG.ancets.remind}
                    <Select
                        value={this.state.remember}
                        onChange={(e) => this.setState({ remember: e.target.value })}
                        size="small"
                        className="w100"
                    >
                        <MenuItem value={'week'}>{LANG.ancets.remembers.week}</MenuItem>
                        <MenuItem value={'month'}>{LANG.ancets.remembers.month}</MenuItem>
                        <MenuItem value={'cvartal'}>{LANG.ancets.remembers.cvartal}</MenuItem>
                        <MenuItem value={'year'}>{LANG.ancets.remembers.year}</MenuItem>
                    </Select>
                </div>
                <div>
                    <Button size="small" onClick={this.createQuestion}>
                        <Icon icon="add" /> {LANG.ancets.create_question}
                    </Button>
                </div>
                <div className="AncetsPage-modal-questions">
                    {questions.map((item, index) => (
                        <div key={index} className="flex w100" style={{ gap: "10px" }}>
                            <Input
                                value={item.question}
                                onChange={(e) => this.updateQuestion(index, e.target.value)}
                                type="text"
                                label={`${LANG.GLOBAL.question} ${index + 1}`}
                                size="small"
                                addClass="w100"
                            />
                            <Select
                                value={item.type}
                                onChange={(e) => this.updateQuestionType(index, e.target.value)}
                                size="small"
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                            <Button size="small" color="error" onClick={() => this.removeQuestion(index)}>
                                <Icon icon="delete" />
                            </Button>
                        </div>
                    ))}
                    {alert.active && <SmallNotification isSuccess={alert.isSuccess} text={alert.message} close={() => { this.alertHandler() }} />}
                </div>
            </Modal>
        );
    }
}

AddAncetsForm.propTypes = {
    close: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    ancets: state.ancets
});

export default connect(mapStateToProps)(AddAncetsForm);
