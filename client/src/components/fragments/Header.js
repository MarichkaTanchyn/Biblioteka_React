import React, {Component, Fragment} from "react";
import logo from "../../assets/jogo2.png";
import bookcase from "../../assets/books.jpeg";
import style from "./Header.module.css";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
import Link from "react-router-dom/es/Link";

class Header extends Component{
    handleLanguageChange = (language) => {
        const {i18n} = this.props;
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        })
    }
render() {
    const {t} = this.props;
    const loginLogoutLink = isAuthenticated() ?
        <button className={style.button} onClick={this.props.handleLogout}>{t('main-page.logOut')}</button> :
        <button className={style.button}><Link to="/login">{t('main-page.login')}</Link></button>
    const registerLink = <button className={style.button}> <Link to="/employees/add">{t('main-page.register')}</Link></button>

    return <Fragment>
    <header>
        <div className={style['main-header']}>
            <div className={style['header-display']}>
                <img src={logo} alt="Bibliotekas logo" className={style.logo}/>
                <h1>Nowa Biblioteka</h1>
            </div>

            <nav className={style.navbar}>
            <ul>
            <li>{registerLink}</li>
                <li>{loginLogoutLink}</li>
                <li>
                    <button className={style.button} onClick={() => {
                        this.handleLanguageChange('en')
                    }}>EN
                    </button>
                </li>
                <li>
                    <button className={style.button} onClick={() => {
                        this.handleLanguageChange('pl')
                    }}>PL
                    </button>
                </li>
            </ul>
            </nav>
        </div>

    </header>
    <div className={style['main-image']}>
        <img src={bookcase} alt="bookcase full of books"/>
    </div>
    </Fragment>
}}
export default withTranslation() (Header);