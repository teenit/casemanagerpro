import React, { useState } from "react";
import CustomInput from "../elements/Inputs/CustomInput";
import { Button } from "@mui/material";
import moment from "moment/moment";
import { apiResponse } from "../Functions/get_apiObj";
import Input from "../elements/Inputs/Input";

const TestPage = () => {
    const [state, setState] = useState([
        {
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },
        {
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },
        {
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },
        {
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },{
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },{
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },{
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },{
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },{
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },{
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },{
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        },{
            office:"Office1",
            departments: [
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                },
                {
                    department:"Department1",
                    teams: [
                        {
                            team: "Team1"
                        },
                        {
                            team: "Team2"
                        },
                        {
                            team: "Team3"
                        },  
                    ]
                }
            ]
        }
    ])
    const [taskId, setTaskId] = useState(1)

    const createTask = () => {
        let obj = {
            from: 1,
            to: 2,
            title: "test_" + Math.random(),
            description: "descript_test" + Math.random(),
            dead_line: '2025-06-20 17:00',
            status: 1,
            reviewer_id: 1,
            action: "add_task"
        }

        apiResponse({...obj}, 'tasks/task.php').then((res)=>{
        })
    }

    const getTask = () => {
        let obj = {
            action: "get_tasks",
            task_id: taskId
        }
        apiResponse({...obj}, 'tasks/task.php').then((res)=>{
        })
    }
    return(
        <div className="TestPage">
            {/* <div className="main">Структура компанії</div>
            <div className="main-line" ></div>
            <div className="offices">
                {
                    state.map((office)=>{

                        return(
                            <div className="office-container">
                                <div className="office">{office.office}</div>
                                <div className="line-from-office"></div>
                                {
                                    office.departments.length > 0 && (
                                        <div className="departments">
                                    {
                                        office.departments.map((department)=>{
                                            return(
                                                <div className="department-container">
                                                    <div className="department">{department.department}</div>
                                                    <div className="teams">
                                                        {
                                                            department.teams.map((team)=>{
                                                                return(
                                                                    <div className="team-container">
                                                                        <div className="team">{team.team}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                    )
                                }
                                
                            </div>
                        )
                    })
                }
            </div> */}

            {/* <CustomInput 
                label={"Тест лабел"} 
            /> */}
            <Button onClick={createTask}>
                Create task
            </Button>
            <div>
            <Button onClick={getTask}>
                Get task
            </Button>
            <Input value={taskId} onChange={(e)=>{
                setTaskId(e.target.value)
            }}/>
            </div>
           
        </div>
    )
}

export default TestPage