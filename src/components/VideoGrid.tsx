import React, { useState, useEffect } from 'react'

export default function VideoGrid() {

  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await (await fetch("http://localhost:3000/getProductos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoria: "Video"
          })
        }))

        if (!response.ok) {
          setError('no se pudieron cargar los videos ');
        }

        const data = await response.json();

        setVideos(data.Productos)
        setLoading(false)
      } catch (error) {
        console.error(error);

      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return <div>Cargandop... ^^ </div>;
  }

  if (error) {
    return <div>Error: {error} :c</div>;
  }

  const showVideo = (id: string, titulo: string, descripcion: string, link: string, duracion: string) => {
    window.location.href = `/viewsClase/${id}?titulo=${encodeURIComponent(titulo)}&descripcion=${encodeURIComponent(descripcion)}&link=${encodeURIComponent(link)}&duracion=${encodeURIComponent(duracion)}`
  }

  return (
    <div className="video-grid-container">
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.producto_id} className="video-card">
            <div className="video-thumbnail-container">
              <img
                src="/placeholder.svg?height-200&width=300"
                alt={video.producto_nombre}
                className="video-thumbnail"
              />
              <button onClick={() => showVideo(video.producto_id, video.producto_nombre, video.producto_descripcion, video.video_url, video.producto_autor)} className="video-play-button">▶</button>
            </div>
            <div className="video-content">
              <div className='video-info'>
                <div className='video-texts'>
                  <h2 className="video-title">{video.producto_nombre}</h2>
                  <p className="video-description">{video.producto_descripcion} </p>
                </div>
                <div className='video-details'>
                  <div className='video-detail'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#777" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.5-13H11v6l5.2 3.2l.8-1.3l-4.5-2.7z" /></svg>
                    <p>{video.videos_duracion}</p>
                  </div>
                  <div className='video-detail'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#666" d="M12 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3m9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" /></svg>
                    <p>{video.producto_autor}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => showVideo(video.producto_id, video.producto_nombre, video.video_url, video.producto_descripcion, video.producto_autor)} className="video-watch-button">Watch Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}