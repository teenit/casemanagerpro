import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Component } from "react";
import { apiResponse } from "../../Functions/get_apiObj";

class SelectUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            users:[]
        }
    }
    getActivatedUsers = () => {
        apiResponse({}, "user/get-users.php").then((res) => {
            const activatedUsers = res.filter((item => item.active==="true"))
            this.setState({ users: activatedUsers })
        }).catch((err) => {
            console.error(err)
        })
    }
    componentDidMount(){
        this.getActivatedUsers()
    }
    render() {
        const {users} = this.state
        return (
            <FormControl fullWidth>
                <InputLabel>{this.props.title}</InputLabel>
                <Select size="small"
                    value={this.props.value}
                    label={this.props.title}
                    onChange={this.props.onChange}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 100,
                                overflowY: "auto",
                            }
                        }
                    }}
                >
                    {users.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                            {item.userName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        )
    }
}
export default SelectUsers