import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtVerify } from 'jose';
import LoginsButtons from './ui/loginsButtons';
import UserInfo from './ui/userInfo';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get("jwt");
        if (token) {
            verifyToken(token)
                .then(isValid => setIsLoggedIn(isValid))
                .catch(() => setIsLoggedIn(false));            
        }
    }, []); 

    const verifyToken = async (token?: string): Promise<boolean> => {
        if (!token) {
            return false; 
        }

        try {
            const secret = import.meta.env.PUBLIC_JWT_SECRET
            console.log(secret);
            
            const encodedSecret = new TextEncoder().encode(secret); 

            await jwtVerify(token, encodedSecret);
            return true;

        } catch (err) {
            if (err instanceof Error) {
                console.error('Error en la verificación del token:', err.message);
                return false;
            }

            console.debug(err);
            return false;
        }
    };

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

            {isLoggedIn ? <UserInfo /> : <LoginsButtons />}
        </header>
    );
};

export default Header;
