import React from "react";
import {useTranslation} from "react-i18next";

function PageNotFound()
{
    const { t } = useTranslation();
    return (
        <main>
            <h1>{t('pageNotFound.msg')}</h1>
            <img id="notFoundImg" src="/img/notFound.png" alt="page not found" />
        </main>
    )
}

export default PageNotFound