import style from './header.module.css';

const Header = () => {
    return (
        <header className={style.divHeader}>
            <div className={style.divlogo}>
                <img
                    src="assets/logoMinhaBibliotecaBranca.svg"
                    alt="Ícone minhabiblioteca"
                    className={style.iconLogo}
                />
            </div>
        </header>
    );
}

export default Header;
