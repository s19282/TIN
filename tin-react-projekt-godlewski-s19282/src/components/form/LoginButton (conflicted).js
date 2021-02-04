import React from 'react'
import {Link} from "react-router-dom";
import formMode from '../../helpers/formHelper'
import { useTranslation } from 'react-i18next';

function LoginButton(props)
{
    const { t } = useTranslation();
    return (
        <div className={"form-buttons"}>
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={t('form.actions.login')} />
        </div>
    )
}

export default LoginButton