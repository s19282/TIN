import React from 'react'
import { useHistory } from "react-router-dom";

export function LoginButton(props)
{
    let history = useHistory();

    function handleClick() {
        history.push("/");
    }
    return (
        <div className={"form-buttons"}>
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" onSubmit={handleClick} value={props.submitButtonLabel} />
        </div>
    )
}
export default LoginButton
