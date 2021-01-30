import React from 'react'
import { useTranslation } from 'react-i18next';

function Header() {
    const { t } = useTranslation();
    return (
        <header>
            <h1>{t('main-page.title')}</h1>
            <img src="/img/logo.png" alt="communication department logo" />
        </header>
    )
}

export default Header