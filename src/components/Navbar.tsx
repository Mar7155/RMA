import React, { useState, useEffect, useRef } from 'react';


const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  };

const Header: React.FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const subMenuRef = useRef<HTMLDivElement | null>(null);
    const userIconRef = useRef<HTMLButtonElement | null>(null);

    const handleLogout = () => {
        deleteCookie('jwt');    
        console.log('Sesión cerrada');
        window.location.href = "/";
      };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            userIconRef.current &&
            !userIconRef.current.contains(event.target as Node) &&
            subMenuRef.current &&
            !subMenuRef.current.contains(event.target as Node)
        ) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header className="contenedor">
            <div className="logo">
                <img
                    src="/RMA - SVG.svg"
                    alt="logo-red-medical-advisor"
                    width="140"
                    height="140"
                />
            </div>

            <nav className="nav">
                <a href="/">Home</a>
                <a href="/Clases">Clases</a>
                <a href="/Recursos">Recursos</a>
                <a href="/Foro">Foro</a>
                <a href="/Tutorias">Tutorias</a>
            </nav>

            <div className="us">
                <button
                    className="user-icon"
                    onClick={toggleMenu}
                    ref={userIconRef}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 24 24">
                        <path fill="#dc2626" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"></path>
                    </svg>
                </button>

                <div className={`sub-menu-wrap ${isMenuOpen ? 'open-menu' : ''}`} ref={subMenuRef}>
                    <div className="sub-menu">
                        <div className="user-info">
                            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
                                <path fill="#dc2626" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"></path>
                            </svg>
                            <div className="user-details">
                                <h2>ABDIEL AVILA NERI</h2>
                                <p className="user-email">abdiel@example.com</p>
                            </div>
                        </div>
                        <hr />
                        <a href="EditPerfil" className="sub-menu-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                <path fill="#333333" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2z"></path>
                            </svg>
                            <p>Mi Perfil</p>
                        </a>
                        <button onClick={handleLogout} className="sub-menu-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                <path fill="#333333" d="m17 8l-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4zM5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5z"></path>
                            </svg>
                            <p>Cerrar Sesión</p>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
