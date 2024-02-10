import React, { Component } from "react";
import { addReport, addHistory } from "../../../services/user-api";

export class AddReportHistory extends Component {
  state = {
    date: new Date().toLocaleDateString(),
    title: "",
    dopInfo: "",
  };

  fileInput = React.createRef();

  typeBtn = this.props.typeBtn;

  handleChangeInfo = (event) => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, dopInfo } = this.state;
    const file = this.fileInput.current.files[0];
    const sendData = { title, dopInfo, file };
    if (this.typeBtn === "report") {
      // addReport(sendData);
      this.reset();
    } else {
      //   addHistory(sendData);
      this.reset();
    }

    // alert(`${this.fileInput.current.files[0].name}`);
  };

  reset = () => {
    this.setState({
      title: "",
      dopInfo: "",
    });
  };

  render() {
    const { date, title, dopInfo } = this.state;

    return (
      <>
        {this.typeBtn === "report" ? (
          <h4>Подати звіт</h4>
        ) : (
          <h4>Подати історію</h4>
        )}
        <form onSubmit={this.handleSubmit}>
          <label>
            <div>
              Назва {this.typeBtn === "report" ? <>звіту</> : <>історії</>}
            </div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChangeInfo}
            />
          </label>

          <div>
            Дата подачі {this.typeBtn === "report" ? <>звіту</> : <>історії</>}:
            <span> {date}</span>
          </div>

          <label>
            <div>Додаткова інформація</div>
            <textarea
              name="dopInfo"
              rows="10"
              value={dopInfo}
              onChange={this.handleChangeInfo}
            ></textarea>
          </label>

          <label>
            <div>Завантажте файл</div>
            <input type="file" ref={this.fileInput} />
          </label>
          <button type="submit">Надіслати</button>
        </form>
      </>
    );
  }
}

export default AddReportHistory;
