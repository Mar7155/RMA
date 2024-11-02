import { Heart, Stethoscope, Brain, Bone, Microscope } from "lucide-react"

export default function PopularTopics() {
  return (
    <section className="popular-topics">
      <div className="topics-container">
        <h2 className="topics-title">Temas populares</h2>
        <p className="topics-subtitle">Explora nuestros más populares temas</p>
        
        <div className="topics-grid">
          {[
            { icon: Heart, name: "Cardiologia" },
            { icon: Stethoscope, name: "Pulmonologia" },
            { icon: Brain, name: "Neurologia" },
            { icon: Bone, name: "Ortopedia" },
            { icon: Microscope, name: "Microbiologia" },
          ].map((topic, index) => (
            <div key={index} className="topic-card">
              <topic.icon className="topic-icon" />
              <h3 className="topic-name">{topic.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="topics-button-container">
          <button className="topics-browse-button">
            Ver más 
          </button>
        </div>
      </div>
    </section>
  )
}