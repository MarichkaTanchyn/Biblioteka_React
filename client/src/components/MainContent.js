import React from "react";
import style from "./MainContent.module.css";
import {withTranslation} from "react-i18next";
const MainContent = (props) => {
    const {t} = props;
    return <main className={style.main}>
        <h2>{t('main-page.content')}</h2>
        <p>
            {t('main-page.text')}
        </p>
    </main>
}

export default withTranslation() (MainContent);