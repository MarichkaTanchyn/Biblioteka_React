import React, {Fragment} from "react";
import logo from "../../assets/jogo2.png";
import bookcase from "../../assets/books.jpeg";
import style from "./Header.module.css";

const Header = () => {
    return <Fragment>
    <header>
        <div className={style['main-header']}>
            <img src={logo} alt="Bibliotekas logo" className={style.logo}/>
            <h1>Nowa Biblioteka</h1>
        </div>
    </header>
    <div className={style['main-image']}>
        <img src={bookcase} alt="bookcase full of books"/>
    </div>
    </Fragment>
}
export default Header;