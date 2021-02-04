import React from "react";
import {NavLink} from "react-router-dom";
import { withTranslation } from 'react-i18next';
import {isAdmin, isAuthenticated} from "../../helpers/authHelper";

class Navigation extends React.Component
{
    render()
    {
        const { t } = this.props;
        const loginLogoutLink = isAuthenticated()
            ? <button id="logoutButton" onClick={this.props.handleLogout}>{t('auth.logout')}</button>
            : <NavLink exact={true} activeClassName={"active"} to="/login">{t('form.actions.login')}</NavLink>

        return (
            <nav>
                <ul>
                    <li><NavLink exact={true} activeClassName={"active"} to="/">{t('nav.main-page')}</NavLink></li>
                    <li><NavLink exact={true} activeClassName={"active"} to="/owners">{t('nav.owners')}</NavLink></li>
                    <li><NavLink exact={true} activeClassName={"active"} to="/registrations">{t('nav.registrations')}</NavLink></li>
                    <li><NavLink texact={true} activeClassName={"active"} to="/vehicles">{t('nav.vehicles')}</NavLink></li>
                    {isAdmin() &&
                        <li><NavLink exact={true} activeClassName={"active"} to="/announcements">{t('nav.announcements')}</NavLink></li>
                    }
                    <li className='lang'>{loginLogoutLink}</li>
                    {!isAuthenticated() &&
                        <li><NavLink exact={true} activeClassName={"active"} to="/owner/add">{t('nav.register')}</NavLink></li>
                    }
                </ul>
            </nav>
        )
    }
}


export default withTranslation()(Navigation)