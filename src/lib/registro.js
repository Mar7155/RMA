document.getElementById("register-form").addEventListener('submit', async (e) => {
    e.preventDefault();

    const formElements = e.target.elements;

    try {
        const res = await fetch("http://localhost:4321/api/index.ts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Nombre: formElements['nombre'].value,
                Paterno: formElements['apellido-paterno'].value, 
                Materno: formElements['apellido-materno'].value, 
                Email: formElements['email'].value,
                Contraseña: formElements['password'].value
            })
        });

        if (!res.ok) {
            throw new Error('Error en la solicitud: ' + res.status);
        }

        const data = await res.json();
        console.log(data);

    } catch (error) {
        console.error('Error:', error);
    }
});

