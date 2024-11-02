import React from 'react'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
}

const videos: Video[] = [
  {
    id: "1",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height=200&width=300"
  },
  {
    id: "2",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height=200&width=300"
  },
  {
    id: "3",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height=200&width=300"
  },
  {
    id: "4",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height=200&width=300"
  },
  {
    id: "5",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height=200&width=300"
  },
  {
    id: "6",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    thumbnail: "/placeholder.svg?height=200&width=300"
  }
]

export default function VideoGrid() {
  return (
    <div className="video-grid-container">
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail-container">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
              />
              <button className="video-play-button">▶</button>
            </div>
            <div className="video-content">
              <h2 className="video-title">{video.title}</h2>
              <p className="video-description">{video.description}</p>
              <button className="video-watch-button">Watch Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}