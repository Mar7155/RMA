import React from 'react';
import { useState, type FormEvent } from "react";

const Login: React.FC = () => {
    const [responseMessage, setResponseMessage] = useState("");

    async function submit(e: FormEvent<HTMLFormElement>) {
        setResponseMessage("Cargando... ^^")

        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const userData = Object.fromEntries(formData.entries());
        try {
            const response = await fetch("http://localhost:3000/getUser", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            localStorage.setItem('user', JSON.stringify(data.payload));
            window.location.href = data.redirect;
            
            if (!data.ok) {
                setResponseMessage(data.message || "Error en el inicio de sesión");
                return;
            }

            if (data.message) {                
                setResponseMessage(data.message + " espera...");                
            }
        } catch (error) {
            setResponseMessage("Error en la conexión");
            console.log(error);
            
        }
    }

    return (
        <section>
            <div className="login-container">
                
                <h1 className="login-title">Iniciar sesión</h1>
                <form onSubmit={submit} className="login-form">
                    <div className="login-input-group">
                        <input
                            className="login-input"
                            name='email'
                            type="email"
                            id="email"
                            placeholder=" "
                            required
                        />
                        <label className="login-label" htmlFor="email">Correo electrónico</label>
                    </div>
                    <div className="login-input-group">
                        <input
                            className="login-input"
                            name='password'
                            type="password"
                            id="password"
                            placeholder=" "
                            required
                        />
                        <label className="login-label" htmlFor="password">Contraseña</label>
                    </div>
                    <button className="login-button" type="submit">Entrar</button>
                    {responseMessage && <p>{responseMessage}</p>}
                    <div className="sign-Up-Message-Group">
                        <p>¿No tienes una cuenta?<a href="Sign" className="sign-Up-Message"> Regístrate</a></p>
                    </div>
                </form>
            </div>
        </section>
        
    );
};

export default Login;