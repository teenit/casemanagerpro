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
        this.props.handler(this.state.value)
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