import { Link } from "react-router-dom";
import style from './header.module.css';

const Header = () => {
    return (
        <header className={style.divHeader}>
            <Link to="/home">
                <div className={style.divlogo}>
                    <img
                        src="/assets/logoMinhaBibliotecaBranca.svg"
                        alt="Ícone minhabiblioteca"
                        className={style.iconLogo}
                    />
                </div>
            </Link>
        </header>
    );
}

export default Header;