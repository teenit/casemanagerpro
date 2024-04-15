import React, { useState } from 'react'
import editImg from '../../../../img/icons/edit.svg'
import Input from '../../../elements/Inputs/Input'


const PlanCard = ({ item, index, plan, onChange }) => {
    const [edit, setEdit] = useState(false)
    const [copyObj, setCopyObj] = useState({ ...item })
    return (
        <div className="plan__viewer__line" key={index}>
            <div className={`${"plan__viewer__data"} ${edit&&"plan__viewer__data__edit"}`}>
                <div>

                    <div className="plan__date__row">
                        {edit? <label htmlFor="">Початок плану<Input type='date'  value={copyObj.strtTime} onChange={(e) => {
                                setCopyObj({ ...copyObj, startTime: e.target.value })
                            }}/></label>: 
                            <p><b>{item.startTime}</b></p>
                        }
                        {edit? <label htmlFor="">Кінець плану<Input type='date' value={copyObj.endTime} onChange={(e) => {
                                setCopyObj({ ...copyObj, endTime: e.target.value })
                            }}/></label>: 
                            <p><b>{item.endTime}</b></p>
                        }
                    </div>
                    {edit? <Input type='text' label='Опис плану' value={copyObj.value} onChange={(e) => {
                                setCopyObj({ ...copyObj, value: e.target.value })
                            }}/>: 
                            <p>{item.value}</p>
                        }
                    <span>{plan.dateCreated}</span>
                </div>

            </div>
            <div className="plan__viewer__mess">
                <div className="notes__viewer__mess__panel">
                    <div className="notes__viewer__mess__panel__edit">
                        <div className="notes__viewer__mess__panel__edit__ico__wrap">
                            <img src={editImg} alt="Редагувати нотатки" onClick={() => { setEdit(true) }} />
                        </div>
                    </div>
                    {edit ?
                        <div className="notes__viewer__mess__panel__edit">
                            <div className="notes__viewer__mess__panel__edit__option" onClick={() => {
                                setEdit(false)
                                onChange(copyObj)
                                console.log(copyObj);
                            }}></div>
                            <div className="notes__viewer__mess__panel__edit__option notes__delete" onClick={() => {
                                setEdit(false)
                            }}></div>
                        </div>
                        :
                        <div className="notes__viewer__mess__panel__edit">

                        </div>
                    }

                </div>
            </div>

        </div>
    )
}

export default PlanCard