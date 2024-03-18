import React from 'react'
import edit from '../../../../img/icons/edit.svg'


const PlanCard = ({item,index,plan}) => {
    return (
        <div className="plan__viewer__line" key={index}>
            <div className="plan__viewer__data">
                <div>

                    <div className="plan__date__row">
                        <p><b>{item.start}</b></p>
                        <p><b>{item.end}</b></p>
                    </div>
                    <p>{item.desc}</p>
                    <span>{plan.dateCreated}</span>
                </div>

            </div>
            <div className="plan__viewer__mess">
                <div className="notes__viewer__mess__panel">
                    <div className="notes__viewer__mess__panel__edit">
                        <div className="notes__viewer__mess__panel__edit__ico__wrap">
                            <img src={edit} alt="Редагувати нотатки" />
                        </div>
                    </div>
                    <div className="notes__viewer__mess__panel__edit">
                        <div className="notes__viewer__mess__panel__edit__option"></div>
                        <div className="notes__viewer__mess__panel__edit__option notes__delete"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PlanCard