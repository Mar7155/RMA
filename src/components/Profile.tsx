import { Loader2, Upload, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Profile: React.FC = () => {


  const [userDetails, setUserData] = useState<any>(null);
  const [asesories, setAsesories] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const chekAuth = async () => {
      try {
        const data = localStorage.getItem("user");
        if (data) {
          const dataArray = data ? JSON.parse(data) : [];
          setUserData(dataArray);
        }

      } catch (error) {
        console.error('error al verficar usuario')

      }
    }
    chekAuth();
  }, [])

  useEffect(() => {
    const fetchAsesories = async () => {
      try {
        if (userDetails) {
          const UserId = userDetails.id          
          
          const response = (await fetch("http://localhost:3000/getAsesoriesByUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: UserId
            })
          }))

          if (!response.ok) {
            console.error("ha ocurrido un error")
          }

          const asesories = await response.json()
          setAsesories(asesories)
          setLoading(false)
        }
      } catch (error) {
        setError("Error al obtener tus asesorias :(")
      }
    }
    fetchAsesories()
  }, [])

  return (
    <section className="editConten">
      <div className="edit-card">
        <h1 className="edit-title">Tu cuenta</h1>

        {/*<div className="row-group">
          <div className="user-info">
            <img src="/placeholder.svg?height-200&width=300" alt="User Icon" className="user-icon" />
          </div>
          <div className="photo-buttons">
            <button className="save-button" type="button">Cambiar la foto</button>
            <button className="save-button bordered cancel-button" type="button">Quitar la foto</button>
            
          </div>
        </div>*/}

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
        </div>}*/}

        <div className="tutoria-group">
          <div className="divider"></div>
            <div>
              <label className="edit-label">Tutorias</label>    
            </div>
            <div className="tutoria-label-group">  
              {loading ? (
                <>
                <div className='w-full flex justify-center items-center'>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Revisando asesorias
                </div>
                </>
              ):(
                asesories.map((asesory) => (
                  <div key={asesory.asesoriaId} className="tutoria-card">
                    <div className="tutoria-card-header"> 
                      <p><strong>Fecha:</strong> {asesory.fecha} </p>
                      <p><strong>Duración:</strong> {asesory.duracion} </p>
                      <p className="hour-label"><strong className='time-label'>Hora inicio:</strong> {asesory.startTime}<strong className='time-label-left'>Hora fin:</strong> {asesory.endTime}</p>
                    </div>
                    <div className="tutoria-card-body">
                      <p><strong>Tutor:</strong> {asesory.tutor_id.tutor_nombre} {asesory.tutor_id.tutor_apellidos} <strong className="area-label">Área:</strong> {asesory.area.area_nombre} </p>
                    </div>
                    <div className="tutoria-card-description">
                      <p><strong>Descripción: </strong>{asesory.descripcion}</p>
                    </div>
                    <div className="tutoria-card-status">
                      <span className="status-label">{asesory.estado}</span>
                    </div>
                  </div>                
                ))
              )}
          </div>
        </div>
  
      </div>
    </section>
  );
}

export default Profile
