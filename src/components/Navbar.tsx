import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LoginsButtons from './ui/loginsButtons';
import UserInfo from './ui/userInfo';

const Header: React.FC = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch('/api/controllers/verify.controller', {
                    method: 'GET',
                    credentials: 'include'    
                })                
                const data = await response.json();

                if (data.isValid) {
                    setIsLoggedIn(true)
                } else {
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.error("error al verificar el token: ",error);
                setIsLoggedIn(false)
            }
        };
        verifyAuth();
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

            { isLoggedIn ? <UserInfo /> : <LoginsButtons />}
        </header>
    );
};

export default Header;
