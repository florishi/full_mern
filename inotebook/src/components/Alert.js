import React from 'react'

const Alert = (props) => {
    return (
        <div>
        { props.alert && <div className={`alert alert-${props.alert.type} role= alert`}>
{/* If props.alert is false or null then don't do anything else return <div className="alert alert-success role= alert"></div> */}
                {props.alert.message}
            </div>}

        </div>
    )
}

export default Alert
