import React from 'react';

export default function Home() {
    
    return (
        <section className="home-section">
            <div className="home-content">
                <h1 className="text-5xl font-bold">Bienvenido a RedMedicalAdvisor</h1>
                <p className="home-description">
                    Tu plataforma de aprendizaje para la carrera de Médico Cirujano. Explora, aprende y crece con nosotros.
                </p>
                <a href="#suscripciones">
                    <button className="home-cta-button">Ver Precios</button>
                </a>
            </div>
            {/*<div className="home-image-section">
                <img src="/placeholder.svg?height=400&width=400" alt="Successful learner" className="home-learner-image" />
                <div className="home-testimonial">
                    <p className="home-quote">
                        I started Codecademy in May 2022 and took an ethical hacking
                        course, which was my introduction to cybersecurity, in
                        October. Six months after graduation, I was able to get a job.
                    </p>
                    <p className="home-author">Mario R.</p>
                    <p className="home-role">Pentester</p>
                </div>
            </div>*/}
        </section>
    );
}