import React from 'react';

export default function loginsButtons() {
    return (
        <div className="login">
            <a className="in" href="/Login">
                Iniciar Sesion
            </a>
            <a className="reg" href="/Sign">
                Registrate
            </a>
        </div>
    );
}