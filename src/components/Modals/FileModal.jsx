import React from 'react'
import RootPortal from '../Portals/RootPortal'


const FileModal = ({close, title, value}) => {
    return (
        <RootPortal>
            <div className="FileModal">
                <div className="FileModal--outside" onClick={close} />
                <div className="FileModal--inner">
                    <div className="FileModal--head">
                        <div className='FileModal--head-title'>{title}</div>
                        <div className="FileModal--head-close" onClick={close}>
                            <span className="FileModal--head-close-s1"></span>
                            <span className="FileModal--head-close-s2"></span>
                        </div>
                    </div>
                    <div className="FileModal--body">
                        {/* {value} */}
                    </div>
                </div>
            </div>
        </RootPortal>
    )
}

export default FileModal