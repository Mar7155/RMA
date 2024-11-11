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
                const response = await fetch('/api/controllers/verify.controller', {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.isValid) {
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

            {/* Botón de menú */}
            <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                ☰
            </button>

            {/* Menú de navegación */}
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <a href="/">Home</a>
                <a href="/Clases">Clases</a>
                <a href="/Recursos">Recursos</a>
                <a href="/Foro">Foro</a>
                <a href="/Tutorias">Tutorias</a>
            </nav>

            {/* Mostrar botones de login o información del usuario */}
            {!userLogged ? (
                <LoginsButtons />
            ) : (
                <UserInfo />
            )}
        </header>
    );
};

export default Header;

