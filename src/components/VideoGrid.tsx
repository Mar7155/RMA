import React, { useState ,useEffect } from 'react'

export default function VideoGrid() {

  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/elements.controllers/getData.controller")

        if (!response.ok) {
          throw new Error('no se pudieron cargar los videos :(');
        }

        const data = await response.json();
        console.log(data.videos);
        
        setVideos(data.videos)
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

  return (
    <div className="video-grid-container">
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.videos_id} className="video-card">
            <div className="video-thumbnail-container">
              <img
                src="/placeholder.svg?height-200&width=300"
                alt={video.videos_temas}
                className="video-thumbnail"
              />
              <button className="video-play-button">▶</button>
            </div>
            <div className="video-content">
              <h2 className="video-title">{video.videos_temas}</h2>
              <p className="video-description">{video.videos_descripcion}</p>
              <button className="video-watch-button">Watch Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}