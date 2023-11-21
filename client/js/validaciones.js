export function validarLongitudNombre(campo, mensajeError, longitudMaxima) {
    if (campo.length > longitudMaxima) {
        // Mostrar mensaje de error en el elemento span
        const errorElement = document.getElementById("errorNombre");
        errorElement.textContent = `El ${mensajeError.toLowerCase()} no puede tener más de ${longitudMaxima} caracteres`;
        return false;  // Detener la ejecución si la validación falla
    }
    return true;  // La validación es exitosa
}

export function validarLongitudAlias(campo, mensajeError, longitudMaxima) {
    if (campo.length > longitudMaxima) {
        // Mostrar mensaje de error en el elemento span
        const errorElement = document.getElementById("errorAlias");
        errorElement.textContent = `El ${mensajeError.toLowerCase()} no puede tener más de ${longitudMaxima} caracteres`;
        return false;  // Detener la ejecución si la validación falla
    }
    return true;  // La validación es exitosa
}

