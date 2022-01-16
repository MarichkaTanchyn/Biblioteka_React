import React from "react";
import style from "./Navigation.module.css";
const Navigation = () => {
    return <nav className={style.navbar}>
        <ul>
            <li ><a href="/">Strona główna</a></li>
            <li>
                <a href="/employees">Pracownicy</a>
            </li>
            <li><a href="/departments">Departamenty</a></li>
            <li><a href="/employments">Zatrudnienie</a></li>
        </ul>
    </nav>
}

export default Navigation;