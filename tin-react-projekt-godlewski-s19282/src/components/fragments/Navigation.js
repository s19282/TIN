import React from "react";
import {Link} from "react-router-dom";
import { withTranslation } from 'react-i18next';
import {isAuthenticated} from "../../helpers/authHelper";

class Navigation extends React.Component
{
    render()
    {
        const { t } = this.props;
        const loginLogoutLink = isAuthenticated()
            ? <button onClick={this.props.handleLogout}>{t('auth.logout')}</button>
            : <Link to="/login">{t('form.actions.login')}</Link>

        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li><Link to="/owners">{t('nav.owners')}</Link></li>
                    <li><Link to="/registrations">{t('nav.registrations')}</Link></li>
                    <li><Link to="/vehicles">{t('nav.vehicles')}</Link></li>
                    <li className='lang'>{loginLogoutLink}</li>
                </ul>
            </nav>
        )
    }
}


export default withTranslation()(Navigation)