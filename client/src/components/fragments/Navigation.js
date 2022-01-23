import React, {Component} from "react";
import style from "./Navigation.module.css";
import {withTranslation} from "react-i18next";

class Navigation extends Component{
    handleLanguageChange = (language) => {
        const {i18n} = this.props;
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        })
    }
    render(){
        const { t } = this.props;
        // const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>{t('main-page.logOut')}</button> : <Link to="/login">{t('main-page.login')}</Link>
        // const registerLink = <Link to="/clubs/add">{t('main-page.register')}</Link>
    return <nav className={style.navbar}>
        <ul>
            <li ><a href="/">{t('nav.main-page')}</a></li>
            <li>
                <a href="/employees">{t('nav.employees')}</a>
            </li>
            <li><a href="/departments">{t('nav.departments')}</a></li>
            <li><a href="/employments">{t('nav.employments')}</a></li>
            <li><button onClick={() => {this.handleLanguageChange('en')}}>EN</button></li>
            <li><button onClick={() => {this.handleLanguageChange('pl')}}>PL</button></li>
        </ul>
    </nav>
}}

export default withTranslation() (Navigation);