import { useEffect, useState } from 'react';
import LoginsButtons from './ui/loginsButtons';
import UserInfo from './ui/userInfo';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userLogged, setUserLogged] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                if (localStorage.getItem('user')) {
                    setIsLoggedIn(true);
                    setTimeout(() => {
                        setUserLogged(true);
                    });
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("error al verificar");
                setIsLoggedIn(false);
            }
        };
        verifyAuth();
    }, []);

    const toggleMenu = () => setMenuOpen((prevMenuOpen) => !prevMenuOpen);

    return (
        <header className="contenedor">
            <div className="logo">
                <img src="/RMA - SVG.svg" alt="logo-red-medical-advisor" width="140" height="140" />
            </div>

            <a className='contenedor-menu-toggle'>
            <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                ☰
            </button>
            </a>

            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <a href="/">Home</a>
                <a href="/Clases">Clases</a>
                <a href="/Recursos">Recursos</a>
                <a href="/Foro">Foro</a>
                <a href="/Tutorias">Tutorias</a>
            </nav>

            {!userLogged ? (
                <LoginsButtons />
            ) : (
                <UserInfo />
            )}
        </header>
    );
};

export default Header;

