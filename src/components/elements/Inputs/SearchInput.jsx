import { Component } from "react";
import Input from "./Input";
import { apiResponse } from "../../Functions/get_apiObj";
import { Button } from "@mui/material";
import { LANG } from "../../../services/config";

class SearchInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
        }
    }
    changeHandler = (val) => {
        this.setState({ value: val })

    }
    search = () => {
        apiResponse({ val: this.state.value }, "user/search.php")
            .then((data) => {
                this.props.handler(data)
            })
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <div className="SearchInput">
                <Input value={this.state.value} onChange={(e) => { this.changeHandler(e.target.value) }} label={LANG.GLOBAL.search} />
                <Button variant="contained" onClick={this.search}>Пошук</Button>
            </div>
        )
    }
}
export default SearchInput