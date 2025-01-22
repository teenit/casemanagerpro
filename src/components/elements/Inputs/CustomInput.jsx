import React, { Component } from "react";

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "", // Початкове значення передається через props
    };
  }

  // Обробник зміни значення
  handleChange = (event) => {
    const newValue = event.target.value;
    this.setState({ value: newValue });

    // Якщо передано пропс onChange, викликати його
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  };

  // Обробник натискання клавіш
  handleKeyPress = (event) => {
    if (event.key === "Enter" && this.props.onEnter) {
      this.props.onEnter(this.state.value); // Виконати функцію onEnter з поточним значенням
    }
  };

  render() {
    const { value } = this.state;
    const { placeholder, label, type = "text" } = this.props;

    return (
      <div className="custom-input">
        {label && <label>{label}</label>}
        <input
          type={type}
          value={value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default CustomInput;
