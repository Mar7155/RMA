import React from 'react';
import { useState, type FormEvent } from "react";

const Register: React.FC = () => {
    const [responseMessage, setResponseMessage] = useState("");
    const [isOtpVisible, setIsOtpVisible] = useState(false);
    const [otpVerify, setOtpCode] = useState("");
    const [userData, setUserData] = useState<Record<string, FormDataEntryValue> | null>(null);
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));


    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        setResponseMessage("Cargando... ^^")
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const Contraseña = formData.get("password") as string
        const ConfirmContraseña = formData.get("confirm-password") as string

        if (Contraseña !== ConfirmContraseña) {
            setResponseMessage("Las contraseñas no coinciden.");
            return;
        }

        const fromEntries = Object.fromEntries(formData.entries());

        const response = await fetch("http://localhost:3000/generateOtpCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fromEntries)
        });

        const data = await response.json();
        (data);

        if (!response.ok) {
            setResponseMessage(data.message);
            return;
        }

        setOtpCode(data.code)
        setUserData(fromEntries);
        setResponseMessage("")

        setIsOtpVisible(true)
    }

    const handleOtpSubmit = async () => {
        (userData);
        setResponseMessage("Cargando... ^^")
        const otp = otpValues.join("");

        if (!userData) {
            setResponseMessage("Porfavor completa los campos")
            return;
        }

        if (otp !== otpVerify) {
            setResponseMessage("El codigo no coincide");
            return;
        }

        const response = await fetch("http://localhost:3000/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();

        if (data.message) {
            setResponseMessage(data.message);
        }

        (data);

        if (data.redirect) {
            window.location.href = data.redirect;
        }

        if (!response.ok) {
            setResponseMessage("Hubo un error al registrar la cuenta. " + data.message);
        }
    }

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1); // Asegura un solo dígito
        const newValues = [...otpValues];
        newValues[index] = value;
        setOtpValues(newValues);
    };

    return (

        <section className='register-content'>
            {isOtpVisible ? (
                < div >
                    <div className="otp-container">
                        <div className="svg-container">
                            <svg
                                width="110px"
                                height="110px"
                                viewBox="0 0 1024 1024"
                                className="icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M913.871918 369.867311c-6.433071-6.433071-14.863743-9.649095-23.289295-9.649095h-230.077272l51.34273-67.684964a24.706353 24.706353 0 0 0 2.444014-25.927848c-4.180524-8.429648-12.738157-13.706753-22.133329-13.706753h-72.31702V120.10482c0-13.641224-11.065129-24.706353-24.706353-24.706353H429.657094c-13.641224 0-24.706353 11.065129-24.706352 24.706353v132.793831h-73.605069a24.657206 24.657206 0 0 0-22.133329 13.706753 24.714544 24.714544 0 0 0 2.447086 25.927848l51.277201 67.684964H132.924888c-8.429648 0-16.856224 3.215-23.293391 9.649095-6.433071 6.433071-9.649095 14.863743-9.649095 23.292367v498.113043c0 8.426576 3.215 16.856224 9.649095 23.289296a32.849313 32.849313 0 0 0 23.293391 9.652167h757.656711c8.426576 0 16.856224-3.218072 23.289295-9.652167a32.840098 32.840098 0 0 0 9.652167-23.289296V393.159678a32.834978 32.834978 0 0 0-9.651143-23.292367z"
                                        fill="#27323A"
                                    ></path>
                                    <path
                                        d="M429.657094 302.310333c13.641224 0 24.706353-11.065129 24.706353-24.706353V144.810149H570.430064v132.793831c0 13.641224 11.0682 24.706353 24.706353 24.706353h47.291215c-36.351001 47.805206-105.258483 138.717008-130.672341 172.23799-25.414882-33.520982-94.387893-124.367255-130.67234-172.23799h48.574143z"
                                        fill="#FFFFFF"
                                    ></path>
                                    <path
                                        d="M400.447694 409.630921l91.617259 120.69765c4.697586 6.1771 11.968196 9.780153 19.689315 9.780153s15.054186-3.604076 19.686243-9.780153l91.554802-120.69765H832.288736L510.209225 687.253332 190.76417 409.630921h209.683524z"
                                        fill="#ff3131"
                                    ></path>
                                    <path
                                        d="M149.396132 439.097317l170.047898 147.78556-170.047898 236.059833zM172.942422 874.802502L356.88854 619.439359l120.892189 105.067016c9.395172 8.23511 21.4248 12.738157 33.972515 12.738158 12.481162 0 24.577343-4.503048 33.906986-12.675701l120.958741-105.129473 183.943046 255.363143H172.942422zM874.11138 822.94271L704.063481 586.882877l170.047899-147.78556z"
                                        fill="#ffda85"
                                    ></path>
                                </g>
                            </svg>
                        </div>

                        <h1>Ingresa tu código OTP</h1>
                        <p>Hemos enviado un código al correo <strong>{userData?.email as string} </strong>para verificarlo</p>

                        <div className="otp-inputs">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={otpValues[index]}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    maxLength={1}
                                    className="otp_input"
                                />
                            ))}
                        </div>

                        <button className="otp-verify" onClick={handleOtpSubmit}>Verificar</button>
                        {responseMessage && <p>{responseMessage}</p>}
                    </div>
                </div>
            ) : (
                <div className={``}>
                    <div className="register-container">
                        <h1 className="register-title">Registrar Cuenta</h1>
                        <form onSubmit={handleRegister} id="register-form" className="register-form" method="post">
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
                                    name="apellidos"
                                    type="text"
                                    id="apellidos"
                                    required
                                    placeholder=''
                                />
                                <label className="register-label" htmlFor="apellidos">Apellidos</label>
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
                                <label className="register-label" htmlFor="email">Correo Electronico</label>
                            </div>
                            <div className="register-input-group">
                                <input
                                    className="register-input"
                                    minLength={8}
                                    maxLength={20}
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\.])[A-Za-z\d_\.]{8,20}$"
                                    title="Debe contener al menos una letra, un número, un carácter especial (@, $, !, %, *, ?, &, -), y puede incluir guiones."
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
                                    name="confirm-password"
                                    type="password"
                                    id="confirm-password"
                                    required
                                    placeholder=''
                                />
                                <label className="register-label" htmlFor="confirm-password">Confirmar Contraseña</label>
                            </div>
                            <div className="register-input-group">
                                <input
                                    className="register-input"
                                    type="date"
                                    min="1960-01-01" max="2007-12-31"
                                    name="birthday"
                                    id="birthday"
                                    required
                                    placeholder=''
                                />
                                <label className="register-label" htmlFor="birthday">Fecha De Nacimiento</label>
                            </div>
                            <button type="submit" id="registroForm" className="register-button">Registrarse</button>
                            {responseMessage && <p>{responseMessage}</p>}
                            <div className="register-message-group">
                                <p>¿Ya tienes una cuenta? <a href="Login" className="register-message">Inicia sesión</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </section >
    );
};

export default Register;