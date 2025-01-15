import { Upload, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Profile: React.FC = () => {


  const [userDetails, setUserData] = useState<any>(null);

  useEffect(() => {
    const chekAuth = async () => {
      try {
        const data = localStorage.getItem("user");
        if (data) {
          const dataArray = data ? JSON.parse(data) : [];
          setUserData(dataArray);
        }

      } catch (error) {
        console.error('error al verficar usuario', error)

      }
    }
    chekAuth();
  }, [])


  return (
    <section className="editConten">
      <div className="edit-card">
        <h1 className="edit-title">Tu cuenta</h1>

        <div className="row-group">
          <div className="user-info">
            <img src="/placeholder.svg?height-200&width=300" alt="User Icon" className="user-icon" />
          </div>
          <div className="photo-buttons">
            {/*<button className="save-button" type="button">Cambiar la foto</button>
            <button className="save-button bordered cancel-button" type="button">Quitar la foto</button>
            */}
          </div>
        </div>

        <div className="row-group">
          <div className="input-group">
            <label className="edit-label">Nombre(s)</label>
            <div className="value-group">
              <input className="edit-input" type="text" value={userDetails ? userDetails.nombre : 'Cargando...'} readOnly />
              <button className="save-button" type="button">Editar</button>
            </div>
          </div>
          <div className="input-group">
            <label className="edit-label">Apellidos</label>
            <div className="value-group">
              <input className="edit-input" type="text" value={userDetails ? userDetails.apellidos : 'Cargando...'} readOnly />
              <button className="save-button" type="button">Editar</button>
            </div>
          </div>
        </div>

        <div className="row-group">
          <div className="input-group">
            <label className="edit-label">Correo Electronico</label>
            <div className="value-group">
              <input className="edit-input" type="text" value={userDetails ? userDetails.correo : 'Cargando...'} readOnly />
              <button className="save-button" type="button">Editar</button>
            </div>
          </div>
          <div className="input-group">
            <label className="edit-label">Cumpleaños</label>
            <div className="value-group">
              <input className="edit-input" type="email" value={userDetails ? userDetails.cumple : 'Cargando...'} readOnly />
              <button className="save-button" type="button">Editar</button>
            </div>
          </div>
        </div>

        {/*<div className="input-group">
          <label className="edit-label">Contraseña</label>
          <div className="value-group">
            <input className="edit-input full-width" type="password" value="*********" readOnly />
            <button className="save-button bordered" type="button">Editar</button>
          </div>
        </div>*/}

        <div className="input-group tutoria-group">
          <div className="divider"></div>
            <div>
              <label className="edit-label">Tutorias</label>    
            </div>
            <div className="tutoria-label-group">  
                <div className="tutoria-card">
                  <div className="tutoria-card-header">
                    <p><strong>Fecha:</strong> 2024-12-16</p>
                    <p><strong>Duración:</strong> 90 min</p>
                    <p className="hour-label"><strong className='time-label'>Hora inicio:</strong> 17:30:00 <strong className='time-label-left'>Hora fin:</strong> 19:00:00</p>
                  </div>
                  <div className="tutoria-card-body">
                    <p><strong>Tutor:</strong> Mario Lozano Marquez <strong className="area-label">Área:</strong> Anatomía</p>
                  </div>
                  <div className="tutoria-card-description">
                    <p><strong>Descripción: </strong>quiero saber más a profundo del tema</p>
                  </div>
                  <div className="tutoria-card-status">
                    <span className="status-label">En espera</span>
                  </div>
              </div>
          </div>
        </div>
  
      </div>
    </section>
  );
}

export default Profile
