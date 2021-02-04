import React from "react";
import {useTranslation} from "react-i18next";
import FormSelectOption from "./FormSelectOption";
import {getValidationErrorKey} from "../../helpers/formHelper";


function FormSelect(props)
{
    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const list = props.list

    const error = props.error
    const errorKey = getValidationErrorKey(error)
    const { t } = useTranslation();
    const translatedErrorMessage = t(errorKey)

    return (
        <>
            <label htmlFor={props.name}>
                {props.label} : {props.required && <abbr title="required" aria-label="required">*</abbr>}
            </label>

            <select
                className={className}
                name={props.name}
                id={props.name}
                onChange={props.onChange}>

                <option value={""} selected={""}>--- Wybierz ---</option>
                {list.map(element =>(
                    <FormSelectOption element={element} isOwner={props.isOwner} id={props.id}/>
                ))}

            </select>
            <span id={errorSpanId} className={"errors-text"} >
                {
                    translatedErrorMessage!=="validation.messages."
                        ? translatedErrorMessage
                        : ""
                }
            </span>
        </>
    )
}

export default FormSelect