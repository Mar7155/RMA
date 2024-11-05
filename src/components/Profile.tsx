import { Upload, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ProfileEditor: React.FC = () => {


    const [userDetails, setUserData] = useState<any>(null);

    useEffect(() => {
        const chekAuth = async () => {
            try {
                const response = await fetch('/api/controllers/verify.controller', {
                    method: 'GET',
                    credentials: 'include',
                })

                const data = await response.json();
                if (data.isValid) {
                    setUserData(data.userData);
                }

            } catch (error) {
                console.error('error al verficar usuario', error)

            }
        }
        chekAuth();
    }, [])


    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-card-header">
                    <h2 className="profile-card-title">Perfil</h2>
                </div>
                <div className="profile-card-content">
                    <div className="profile-flex profile-flex-col profile-md:flex-row profile-items-center profile-justify-between profile-space-y-4 profile-md:space-y-0 profile-md:space-x-6">
                        <div className="profile-flex profile-flex-col profile-items-center profile-space-y-3">
                            <div className="profile-picture">
                                <img
                                    src='/placeholder.svg?height-120&width=120'
                                    alt='foto de perfil'
                                    width={120}
                                    height={120}
                                />
                            </div>
                        </div>
                        <div className="profile-flex profile-space-x-2">
                            <button className="profile-btn profile-btn-outline">
                                <Upload className="h-4 w-4 mr-2" />
                                Cambiar foto
                            </button>
                            <button className="profile-btn profile-btn-outline">
                                <X className="h-4 w-4 mr-2" />
                                Quitar foto
                            </button>
                        </div>
                    </div>

                    <div className="profile-grid profile-md:grid-cols-2 profile-space-y-4 profile-md:space-y-0 profile-gap-6 mt-6">
                        <div className="profile-form-group">
                            <label htmlFor="nombres" className="profile-form-label">Nombre(s)</label>
                            <div className="profile-flex profile-space-x-2">
                                <input id="nombres" className="profile-form-input" defaultValue="Braulio Ivan" readOnly />
                                <button className="profile-btn profile-btn-outline">
                                    Editar
                                </button>
                            </div>
                        </div>

                        <div className="profile-form-group">
                            <label htmlFor="apellido-paterno" className="profile-form-label">Apellido Paterno</label>
                            <div className="profile-flex profile-space-x-2">
                                <input id="apellido-paterno" className="profile-form-input" defaultValue="Rojo" readOnly />
                                <button className="profile-btn profile-btn-outline">
                                    Editar
                                </button>
                            </div>
                        </div>

                        <div className="profile-form-group">
                            <label htmlFor="apellido-materno" className="profile-form-label">Apellido Materno</label>
                            <div className="profile-flex profile-space-x-2">
                                <input id="apellido-materno" className="profile-form-input" defaultValue="Chavez" readOnly />
                                <button className="profile-btn profile-btn-outline">
                                    Editar
                                </button>
                            </div>
                        </div>

                        <div className="profile-form-group">
                            <label htmlFor="email" className="profile-form-label">Correo Electrónico</label>
                            <div className="profile-flex profile-space-x-2">
                                <input id="email" type="email" className="profile-form-input" defaultValue="correo@example.com" readOnly />
                                <button className="profile-btn profile-btn-outline">
                                    Editar
                                </button>
                            </div>
                        </div>

                        <div className="profile-form-group profile-md:col-span-2">
                            <label htmlFor="password" className="profile-form-label">Contraseña</label>
                            <div className="profile-flex profile-space-x-2">
                                <input id="password" type="password" className="profile-form-input" defaultValue="********" readOnly />
                                <button className="profile-btn profile-btn-outline">
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="profile-flex profile-flex-col profile-md:flex-row profile-justify-between profile-items-center profile-space-y-4 profile-md:space-y-0 mt-6 pt-6 border-t">
                        <div>
                            <p className="text-sm font-medium">Plan</p>
                            <p className="text-sm text-muted-foreground">General</p>
                        </div>
                        <button className="profile-btn profile-btn-link">
                            Iniciar Sesion Registrate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditor