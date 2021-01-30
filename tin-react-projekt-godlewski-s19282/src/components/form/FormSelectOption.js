import React from "react";

function FormSelectOption(props)
{
    const element = props.element
    const fieldA = props.isOwner ? element.firstName : element.make
    const fieldB = props.isOwner ? element.lastName : element.model
    return (
        <React.Fragment>
            <option selected={element.id===props.id} value={element.id}>{fieldA+" "+fieldB}</option>
        </React.Fragment>
    )
}

export default FormSelectOption