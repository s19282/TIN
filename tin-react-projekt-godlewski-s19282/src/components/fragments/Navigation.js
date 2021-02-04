import React from "react";
import {Link} from "react-router-dom";
import { withTranslation } from 'react-i18next';
import {isAdmin, isAuthenticated} from "../../helpers/authHelper";

class Navigation extends React.Component
{
    render()
    {
        const { t } = this.props;
        const loginLogoutLink = isAuthenticated()
            //todo: remove a and format button in css
            ? <button id="logoutButton" onClick={this.props.handleLogout}>{t('auth.logout')}</button>
            : <Link to="/login">{t('form.actions.login')}</Link>

        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li><Link to="/owners">{t('nav.owners')}</Link></li>
                    <li><Link to="/registrations">{t('nav.registrations')}</Link></li>
                    <li><Link to="/vehicles">{t('nav.vehicles')}</Link></li>
                    {isAdmin() &&
                        <li><Link to="/announcements">{t('nav.announcements')}</Link></li>
                    }
                    <li className='lang'>{loginLogoutLink}</li>
                    {!isAuthenticated() &&
                        <li><Link to="/owner/add">{t('nav.register')}</Link></li>
                    }
                </ul>
            </nav>
        )
    }
}


export default withTranslation()(Navigation)