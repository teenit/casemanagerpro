import React, { Component } from "react";
import { connect } from "react-redux";
import { apiResponse } from "../Functions/get_apiObj";
import { useParams } from "react-router-dom";
import InputBlock from "../elements/Inputs/InputBlock";
import LoadingPage from "../Loading/LoadingPage";
import NotFound from "./NotFound";
import { LANG } from "../../services/config";
import { Button, Divider, MenuItem, Select } from "@mui/material";
import Input from "../elements/Inputs/Input";
import Icon from "../elements/Icons/Icon";
import ModalConfirm from "../Modals/ModalConfirm"
import SmallNotification from "../elements/Notifications/SmallNotification";
class AncetaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anceta: null,
      loader: true,
      questions: [],
      newQuestion: "",
      newType: null,
      confirm_delete: false,
      alert: {
        active: false,
        isSuccess: false,
        message: ""
      }
    };
  }

  componentDidMount = () => {
    this.loadAnceta()
  }
  modalHandler = (key) => {
    this.setState({ [key]: !this.state[key] })
  }
  loadAnceta = () => {
    apiResponse({ anceta_id: this.props.anceta_id }, "ancets/get-by-id.php").then((res) => {
      if (res.status) {
        this.setState({ anceta: res.anceta, questions: res.questions, loader: false })
      } else {
        this.setState({ loader: false })
      }
    })
  }

  updateAncetaField = (field, value) => {
    if (field == "name" && value.trim().length == 0) return this.alertHandler(false, LANG.ANCETS_PAGE.invalid_name)
    apiResponse({ field, value, anceta_id: this.props.anceta_id }, "ancets/update-anceta-field.php").then((res) => {
      if (res.status) {
        this.loadAnceta();
      }
    })
  }

  deleteAnceta = () => {
    apiResponse({ anceta_id: this.props.anceta_id }, "ancets/delete.php").then((res) => {
      if (res.status) {
        window.location.href = "/ancets"
      }
    })
  }

  updateQuestionField = (field, value, id) => {
    apiResponse({ field, value, anceta_id: this.props.anceta_id, question_id: id }, "ancets/update-question-field.php").then((res) => {
      if (res.status) {
        this.loadAnceta();
      }
    })
  }
  alertHandler = (isSuccess = false, message = "") => {
    this.setState({
      alert: {
        active: !this.state.alert.active,
        isSuccess: isSuccess,
        message: message
      }
    })
  }
  addNewQuestion = () => {
    const { newQuestion, newType } = this.state;

    if (!newQuestion || !newType) return;

    apiResponse({ anceta_id: this.props.anceta_id, question: this.state.newQuestion, type: this.state.newType }, "ancets/add-question.php").then((res) => {
      if (res.status) {
        this.setState({ newQuestion: "", newType: null })
        this.loadAnceta();
      }
    })
  }

  render() {
    const { anceta, questions, alert } = this.state
    return anceta ? (
      <div className="AncetaPage">
        <div className="AncetaPage-delete">
          <Button color="error" onClick={() => { this.modalHandler("confirm_delete") }}><Icon icon="delete" />{LANG.ancets.delete_anceta}</Button>
        </div>
        <div className="AncetaPage-title">
          <div className="AncetaPage-title-h2">
            <InputBlock
              value={anceta?.name}
              onChange={(e) => { this.setState({ anceta: { ...anceta, name: e.target.value } }) }}
              icon={""}
              label={anceta?.name}
              inputType={"text"}
              saveHandler={(val) => this.updateAncetaField("name", val)}
            />
          </div>
          <div className="AncetaPage-title-p">
            <InputBlock
              value={anceta?.description}
              onChange={(e) => { this.setState({ anceta: { ...anceta, description: e.target.value } }) }}
              icon={""}
              label={anceta?.description || LANG.GLOBAL.no_description}
              inputType={"text"}
              saveHandler={(val) => this.updateAncetaField("description", val)}
            />
          </div>
        </div>
        <div className="AncetaPage-details">
          <div className="AncetaPage-details-type">{LANG.ancets.type}: {LANG.ancets[anceta.type]}</div>
          <div className="AncetaPage-details-remember">{LANG.ancets.remember} {LANG.ancets.remembers[anceta.remember]}</div>
          <div className="AncetaPage-details-status">{LANG.ancets.status}: {anceta.active == 0 ? LANG.GLOBAL.deactivated
            : LANG.GLOBAL.activated}</div>
          <div className="AncetaPage-details-date">{LANG.ancets.date_created}: {anceta.created_at}</div>
        </div>
        <div className="AncetaPage-title-quest">{`${LANG.ANCETA_PAGE.question}:`}</div>
        <div className="AncetaPage-questions">

          {questions.map((item, index) => {
            return (
              <div key={item.id} className="AncetaPage-questions-question w100">
                {index + 1}
                <div className="title">
                  <InputBlock
                    value={item.question}
                    icon={""}
                    label={item.question}
                    inputType={"text"}
                    addClass="w100"
                    saveHandler={(val) => this.updateQuestionField("question", val, item.id)}
                  />
                </div>
                <div className=""></div>
              </div>
            )
          })}
          <Divider />
          <div className="AncetaPage-questions-new">
            <Input
              value={this.state.newQuestion}
              onChange={(e) => this.setState({ newQuestion: e.target.value })}
              type="text"
              label={LANG.ancets.add_new_question}
              size="small"
              addClass="w100 h100"
            />
            <Select
              value={this.state.newType}
              onChange={(e) => this.setState({ newType: e.target.value })}
              size="small"
              aria-label={"test"}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
            <Button disabled={(!this.state.newQuestion || !this.state.newType || this.state.newQuestion.trim().length == 0)}
              size="small" onClick={this.addNewQuestion}><Icon icon="add" /></Button>
          </div>
        </div>
        {this.state.confirm_delete && <ModalConfirm text={LANG.ANCETA_PAGE.confirm_delete} closeHandler={() => { this.modalHandler("confirm_delete") }}
          successHandler={this.deleteAnceta} />}
        {alert.active && <SmallNotification isSuccess={alert.isSuccess} text={alert.message} close={this.alertHandler} />}
      </div>
    ) : <div>
      {this.state.loader ? <LoadingPage /> : <NotFound />}
    </div>;
  }
}

const mapStateToProps = (state) => {

  return {
    ancets: state.ancets
  }
};


export default connect(mapStateToProps)(AncetaPage);
