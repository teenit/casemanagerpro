// Стейт з великою вкладеністю

this.state = {
  someProperty: {
    someOtherProperty: {
      anotherProperty: {
        flag: true,
      },
    },
  },
};
this.setState((prevState) => ({
  ...prevState,
  someProperty: {
    ...prevState.someProperty,
    someOtherProperty: {
      ...prevState.someProperty.someOtherProperty,
      anotherProperty: {
        ...prevState.someProperty.someOtherProperty.anotherProperty,
        flag: false,
      },
    },
  },
}));
////
/////
////
////
////
export class ContactForm extends Component {
  state = {
    phones: [{ title: "", number: "" }],
    createItemIdx: 0,
    ...this.props.contact,
  };

  handleChangeTel = (event, index) => {
    const { name, value } = event.currentTarget;
  

    this.setState((prevState) => ({
      phones: [{ ...prevState.phones[index], [name]: value }],
    }));
  };

  createItem = () => {
    this.setState(({ createItemIdx }) => ({
      createItemIdx: createItemIdx + 1,
    }));
  };

  render() {
    const { phones, createItemIdx } = this.state;

    return (
      <form className={style.form_contact} onSubmit={this.handleSubmit}>
        <label>
          <div>Телефон</div>
          <input
            className={style.input_contact}
            type="text"
            name="title"
            value={phones[0].title}
            // value={title}
            onChange={(event) => {
              this.handleChangeTel(event, 0);
            }}
            placeholder="Мобільний, Домашній ..."
            required
          />
          <input
            className={style.input_contact}
            type="number"
            name="number"
            value={phones[0].number}
            // value={number}
            onChange={(event) => {
              this.handleChangeTel(event, 0);
            }}
            required
          />
        </label>

        {[...Array(createItemIdx)].map(() => (
          <label>
            <div>Телефон </div>
            <input
              className={style.input_contact}
              type="text"
              name="title"
              // value={phones[1].title}
              onChange={(event) => {
                this.handleChangeTel(event, 1);
              }}
              placeholder="Мобільний, Домашній ..."
              // required
            />
            <input
              className={style.input_contact}
              type="number"
              name="number"
              // value={phones[1].number}
              onChange={(event) => {
                this.handleChangeTel(event, 1);
              }}
              // required
            />
          </label>
        ))}

        <div>
          <IconButton onClick={this.createItem}>
            <Add width="10" height="10" />
          </IconButton>
        </div>

        <button type="submit">
          {this.state.id ? "Редагувати" : "Зберегти"}
        </button>
      </form>
    );
  }
}
export default ContactForm;
