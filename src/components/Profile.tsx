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

        <div className="input-group plan-group">
          <div className="divider"></div>
          <div className="plan-label-group">
            <div>
              <label className="edit-label2">Plan</label>
              <p className="example-text">{userDetails ? userDetails.plan : 'Cargando...'}</p>
            </div>
            <div className="value-group">
              <button className="save-button bordered cancel-button" type="button">Cancelar</button>
              <button className="confirm-button" type="submit">Cambiar plan</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile