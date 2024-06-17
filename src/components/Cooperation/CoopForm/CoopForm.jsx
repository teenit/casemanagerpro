import React, { useState } from "react";
import s from './CoopForm.module.css';
import { Autocomplete, Button, FormControl, FormControlLabel, FormLabel, InputBase, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, StepLabel, Switch, TextField, TextareaAutosize } from "@mui/material";
import { TextFields } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
const CoopForm = ({userData,close})=>{
const startState = {
    name:"",
    surname:"",
    secondName:"",
    email:"",
    phone1:"",
    phone2:"",
    happybd:"0000-00-00",
    userType:"",
    comment:"",
    familyStan:"",
    familySclad:"",
    numberDogovir:"",
    pasportSeria:"",
    pasportNumber:"",
    inn:"",
    zgoda:{
        value:"no",
        date:"0000-00-00"
    }, 
    adressPropiska:"",
    adressFact:"",
    religion:{
        title:"",
        value:""
    },
    workState:"",
    education:"",
    sex:"",
    driverLicence:[],
    dogovir:{
        value:"no",
        date:"0000-00-00",
        number:""
    }
    
}
const [state, setState] = useState({...startState,...userData})

const driverLicence = [
    {
        title:'A'
    },
    {
        title:'A1'
    },
    {
        title:'B'
    },
    {
        title:'C'
    },
    {
        title:'C1'
    },
    {
        title:'D'
    },
    {
        title:'E'
    },
]
const religion = [
    {
        title:"Православ'я",
        value:"pravoslavie",
    },
    {
        title:"Католіцизм",
        value:"catolic",
    },
    {
        title:"Протестантизм",
        value:"protest",
    },
    {
        title:"Іудаїзм",
        value:"iudaizm",
    },
    {
        title:"Агностицизм",
        value:"agnostiq",
    },
    {
        title:"Атеїзм",
        value:"ateist",
    },
    {
        title:"Інша релігія",
        value:"another",
    }
]


const handleClose = ()=>{
}


    return(
       <div className={s.wrap}>
        <div className={s.cont__line}>
            <CloseIcon onClick={close} className={s.close__icon} />
        </div>
            <div className={s.wrap__form}>
                <h2>Додати до коаліції</h2>
                <div className={s.inner__form}>
                    <form action="" onSubmit={handleClose}>
                        <div className={s.form__container}>
                        <div className={s.g__3}>
                            <TextField required label="Прізвище" type="text" variant="standard" value={state.surname} onChange={(e)=>setState({...state,surname:e.target.value})}/>
                            <TextField required label="Ім'я" type="text" variant="standard" value={state.name} onChange={(e)=>setState({...state,name:e.target.value})}/>
                            <TextField label="По батькові" type="text" variant="standard" value={state.secondName} onChange={(e)=>setState({...state,secondName:e.target.value})}/>
                        </div>
                        <div className={s.g__3}>
                            <TextField required label="Телефон 1" type="text" variant="standard" value={state.phone1} onChange={(e)=>setState({...state,phone1:e.target.value})}/>
                            <TextField label="Телефон 2" type="text" variant="standard" value={state.phone2} onChange={(e)=>setState({...state,phone2:e.target.value})}/>
                            <TextField label="E-mail" type="email" variant="standard" value={state.email} onChange={(e)=>setState({...state,email:e.target.value})}/>
                        </div>
                        <div className={s.g__3}>
                            <TextField label="Дата народження" type="date" variant="standard" value={state.happybd} onChange={(e)=>setState({...state,happybd:e.target.value})}/>

                            <FormControl>
                                <InputLabel id="sex-label">Стать</InputLabel>
                                <Select 
                                labelId="sex-label"
                                label = "Стать"
                                value={state.sex}
                                onChange={(e)=>{setState({...state,sex:e.target.value})}}
                                variant="standard"
                                >
                                    <MenuItem value='m'>Чол</MenuItem>
                                    <MenuItem value='zh'>Жін</MenuItem>
                                    <MenuItem value='n'>Не знаю</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel required id="user-type-label">Тип користувача</InputLabel>
                                <Select 
                                labelId="user-type-label"
                                label = "Тип користувача"
                                value={state.userType}
                                onChange={(e)=>{setState({...state,userType:e.target.value})}}
                                variant="standard"
                                >
                                    <MenuItem value='volunteer'>Волонтер</MenuItem>
                                    <MenuItem value='partner'>Партнер</MenuItem>
                                    <MenuItem value='worker'>Працівник</MenuItem>
                                    <MenuItem value='specialist'>Залучений спеціаліст</MenuItem>
                                    <MenuItem value='donor'>Спонсор</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel required id="family-stat">Сімейний статус</InputLabel>
                                <Select 
                                labelId="family-stat"
                                label = "Сімейний статус"
                                value={state.familyStan}
                                onChange={(e)=>{setState({...state,familyStan:e.target.value})}}
                                variant="standard"
                                >
                                    <MenuItem value='married'>Одружен(ий/а)</MenuItem>
                                    <MenuItem value='notmarried'>Неодружен(ий/а)</MenuItem>
                                    <MenuItem value='not'>Не знаю</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <StepLabel>Склад сім'ї</StepLabel>
                                <TextareaAutosize 
                                placeholder="Загальна інформація про сім'ю"
                                className={s.textarea}
                                variant="standard" value={state.familySclad} onChange={(e)=>setState({...state,familySclad:e.target.value})}/>
                            </FormControl>
                            <TextField label="Адреса проживання (фактична)" type="text" variant="standard" value={state.adressFact} onChange={(e)=>setState({...state,adressFact:e.target.value})}/>
                        </div>
                        <div className={s.g__3}>
                       
                        <TextField label="Адреса за пропискою" type="text" variant="standard" value={state.adressPropiska} onChange={(e)=>setState({...state,adressPropiska:e.target.value})}/>
                        <TextField label="Місце роботи" type="text" variant="standard" value={state.workState} onChange={(e)=>setState({...state,workState:e.target.value})}/>
                        <TextField label="Освіта, спеціальність" type="text" variant="standard" value={state.education} onChange={(e)=>setState({...state,education:e.target.value})}/>

                        </div>
                        <div className={s.g__3}>
                        
                            <FormControl>
                                <FormLabel required id="zgoda">Підписано згоду на використання персональних даних</FormLabel>
                                <RadioGroup 
                                aria-labelledby="zgoda"
                                defaultValue={'no'}
                                value={state.zgoda.value}
                                onChange={(e)=>setState({...state,zgoda:{...state.zgoda,value:e.target.value}})}>
                                    <FormControlLabel value={'no'} control={<Radio />} label={'Ні'}/>
                                    <FormControlLabel value={'yes'} control={<Radio />} label={'Так'}/>
                                    {
                                        state.zgoda.value === 'yes' ?
                                    
                                    <TextField label="Дата укладання" type="date" variant="standard" value={state.zgoda.date} onChange={(e)=>setState({...state,zgoda:{...state.zgoda,date:e.target.value}})}/>
                                    :null}
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel required id="dogovir">Укладено договір</FormLabel>
                                <RadioGroup 
                                aria-labelledby="dogovir"
                                defaultValue={'no'}
                                value={state.dogovir.value}
                                onChange={(e)=>setState({...state,dogovir:{...state.dogovir,value:e.target.value}})}>
                                    <FormControlLabel value={'no'} control={<Radio />} label={'Ні'}/>
                                    <FormControlLabel value={'yes'} control={<Radio />} label={'Так'}/>
                                    {
                                        state.dogovir.value === 'yes' ?
                                    <>
                                        <TextField required label="Дата укладання" type="date" variant="standard" value={state.dogovir.date} onChange={(e)=>setState({...state,zgoda:{...state.dogovir,date:e.target.value}})}/>
                                        <TextField required label="Номер договору" type="text" variant="standard" value={state.dogovir.number} onChange={(e)=>setState({...state,number:{...state.dogovir,number:e.target.value}})} />
                                    </>
                                    :null}
                                </RadioGroup>
                            </FormControl>
                            <Stack spacing={3}>
                                <Autocomplete
                                    multiple
                                    id="driverLicence"
                                    options={driverLicence}
                                    getOptionLabel={(option) => option.title}
                                    defaultValue={[driverLicence[0]]}
                                    onChange={(e,newVal)=>{
                                        setState({...state,driverLicence:newVal})
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                        option.title === value.title
                                      }
                                    renderInput={(params) => (
                                       
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Категорія водія"
                                        placeholder="Обрати"
                                    />
                                    )}
                                />
                            </Stack>
                        </div>
                        <div className={s.g__3}>
                        <FormControl>
                                <InputLabel id="user-beliver">Віросповідання</InputLabel>
                                <Select 
                                labelId="user-beliver"
                                label = "Віросповідання"
                                value={state.religion.value}
                                name={state.religion.title}

                                onChange={(e,t)=>{setState({...state,religion:{value:e.target.value,title:t.props.children}})}}
                                variant="standard"
                                >
                                    {
                                        religion.map((e,index)=>{
                                            return(
                                                <MenuItem key={index} value={e.value}>{e.title}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className={s.g__3}>
                            <FormControl>
                                <TextField label="Серія паспорту" type="text" variant="standard" value={state.pasportSeria} onChange={(e)=>setState({...state,pasportSeria:e.target.value})}/>
                                <TextField label="Номер паспорту" type="text" variant="standard" value={state.pasportNumber} onChange={(e)=>setState({...state,pasportNumber:e.target.value})}/>
                                <TextField label="Ідентифікаційний код" type="text" variant="standard" value={state.inn} onChange={(e)=>setState({...state,inn:e.target.value})}/>
                            </FormControl>
                            <FormControl>
                                <StepLabel>Коментар</StepLabel>
                                <TextareaAutosize 
                                placeholder="Додати коментар до анкети"
                                className={s.textarea}
                                variant="standard" value={state.comment} onChange={(e)=>setState({...state,comment:e.target.value})}/>
                            </FormControl>
                        </div>
                        
                        <Button variant="contained" onClick={handleClose}>Зберегти</Button>
                        <div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
       </div>
    )
}

export default CoopForm