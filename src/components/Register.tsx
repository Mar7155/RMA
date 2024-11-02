import React from 'react';
import { useState, type FormEvent } from "react";

const Register: React.FC = () => {
    const [responseMessage, setResponseMessage] = useState("");

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const Contraseña = formData.get("password")
        const ConfirmContraseña = formData.get("confirm-password")

        if (Contraseña !== ConfirmContraseña) {
            setResponseMessage("Las contraseñas no coinciden.");
            return;
        }

        const response = await fetch("/api/controllers/register.controller", {
            method: "POST",
            body: formData,            
        });
        const data = await response.json();
        if (data.message) {
            setResponseMessage(data.message);
        }
        if (!response.ok) return

        const resJson = await response.json();

        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        }
    }
    return (
        <section>
            <div>
                <div className="register-container">
                    <h1 className="register-title">Registrar Cuenta</h1>
                    <form onSubmit={submit} id="register-form" className="register-form" method="post">
                        <div className="register-input-group">
                            <input
                                className="register-input"
                                name="nombre"
                                type="text"
                                id="nombre"
                                required
                                placeholder=''
                            />
                            <label className="register-label" htmlFor="nombre">Nombre(s)</label>
                        </div>
                        <div className="register-input-group">
                            <input
                                className="register-input"
                                name="apellido-paterno"
                                type="text"
                                id="apellido-paterno"
                                required
                                placeholder=''
                            />
                            <label className="register-label" htmlFor="apellido-paterno">Apellido Paterno</label>
                        </div>
                        <div className="register-input-group">
                            <input
                                className="register-input"
                                name="apellido-materno"
                                type="text"
                                id="apellido-materno"
                                required
                                placeholder=''
                            />
                            <label className="register-label" htmlFor="apellido-materno">Apellido Materno</label>
                        </div>
                        <div className="register-input-group">
                            <input
                                className="register-input"
                                name="email"
                                type="email"
                                id="email"
                                required
                                placeholder=''
                            />
                            <label className="register-label" htmlFor="email">Correo Electrónico</label>
                        </div>
                        <div className="register-input-group">
                            <input
                                className="register-input"
                                name="password"
                                type="password"
                                id="password"
                                required
                                placeholder=''
                            />
                            <label className="register-label" htmlFor="password">Contraseña</label>
                        </div>
                        <div className="register-input-group">
                            <input
                                className="register-input"
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                required
                                placeholder=''
                            />
                            <label className="register-label" htmlFor="confirm-password">Confirmar Contraseña</label>
                        </div>
                        <button id="registroForm" className="register-button" type="submit">Registrarse</button>
                        {responseMessage && <p>{responseMessage}</p>}
                        <div className="register-message-group">
                            <p>¿Ya tienes una cuenta? <a href="Login" className="register-message">Inicia sesión</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;