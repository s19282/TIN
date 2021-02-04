import React from 'react'

export function LoginButton(props)
{
    return (
        <div className={"form-buttons"}>
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={this.props.submitButtonLabel} />
        </div>
    )
}