import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Component } from "react";

class SelectUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value
        }
    }
    render() {
        const users = Object.keys(this.props.menuItems)
        return (
            <FormControl fullWidth>
                <InputLabel>{this.props.title}</InputLabel>
                <Select
                    value={this.props.value}
                    label={this.props.title}
                    onChange={this.props.onChange}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 100,
                                overflowY: "auto"
                            }
                        }
                    }}
                >
                    {users.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            {this.props.menuItems[item]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        )
    }
}
export default SelectUsers