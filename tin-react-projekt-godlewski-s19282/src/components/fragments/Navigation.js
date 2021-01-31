import React from "react";
import {Link} from "react-router-dom";
import { withTranslation } from 'react-i18next';

class Navigation extends React.Component
{
    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    }

    render()
    {
        const { t } = this.props;
        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li><Link to="/owners">{t('nav.owners')}</Link></li>
                    <li><Link to="/registrations">{t('nav.registrations')}</Link></li>
                    <li><Link to="/vehicles">{t('nav.vehicles')}</Link></li>
                    <li className='lang'><button onClick={() => { this.handleLanguageChange('pl') }}>PL</button></li>
                    <li><button onClick={() => { this.handleLanguageChange('en') }}>EN</button></li>
                </ul>
            </nav>
        )
    }
}


export default withTranslation()(Navigation)