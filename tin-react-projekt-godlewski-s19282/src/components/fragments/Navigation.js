import React from "react";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Navigation() {
    const { t } = useTranslation();
    return (
        <nav>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/owners">{t('nav.owners')}</Link></li>
                <li><Link to="/registrations">{t('nav.registrations')}</Link></li>
                <li><Link to="/vehicles">{t('nav.vehicles')}</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation