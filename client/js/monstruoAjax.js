document.addEventListener("DOMContentLoaded", function () {
    // Obtener los monstruos desde la API usando XMLHttpRequest
     obtenerMonstruosDesdeAPI();

});

function mostrarTarjetas(monstruos) {
    const contenedorTarjetas = document.getElementById('tarjetas');
    contenedorTarjetas.innerHTML = ''; // Limpiar contenido existente

    monstruos.forEach(monstruo => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-monstruo');

        // Agregar información del monstruo a la tarjeta
        tarjeta.innerHTML = `
            <h3>${monstruo.nombre}</h3>
            <p>Tipo: ${monstruo.tipo}</p>
            <p>Alias: ${monstruo.alias}</p>
            <p>Miedo: ${monstruo.miedo}</p>
            <p>Defensa: ${monstruo.defensa}</p>
        `;

        contenedorTarjetas.appendChild(tarjeta);
    });
}

function obtenerMonstruosDesdeAPI() {
    const URL = "http://localhost:4001/monstruos";

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const monstruos = JSON.parse(xhr.responseText);
                mostrarTarjetas(monstruos);
            } else {
                console.error(`Error al obtener monstruos: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    };

    xhr.open("GET", URL, true);
    xhr.send();
}
