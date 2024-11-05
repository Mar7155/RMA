import React from 'react';
import { useState, type FormEvent } from "react";

const Login: React.FC = () => {
    const [responseMessage, setResponseMessage] = useState("");
    const [userData, setUserData] = useState<any>(null);

    async function submit(e: FormEvent<HTMLFormElement>) {
        console.log("oal");
        
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
    
        try {
            const response = await fetch("/api/controllers/login.controller", {
                method: "POST",
                body: formData,        
                credentials: "include",    
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setResponseMessage(errorData.message || "Error en el inicio de sesión");
                return;
            }
            
            const resJson = await response.json();
            
            console.log(response);           

            if (resJson.redirect) {
                window.location.href = resJson.redirect;
            } 
            if (resJson.message) {
                setResponseMessage(resJson.message);
            }
            if(resJson.user) {
                setUserData(resJson.user);
                console.log(resJson.user.nombre);
                
            }
        } catch (error) {
            setResponseMessage("Error en la conexión");
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