// fetchMonstruos.js (funciona)

export const getMonstruos = async () => {
    const loader = document.querySelector("#loader");
    const URL = "http://localhost:4001/monstruos";
  
    loader.classList.remove("oculto");
  
    try {
      const res = await fetch(URL);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      console.log(data);
  
      return data; // Devolver los datos obtenidos
    } catch (res) {
      console.error(`Error ${res.status}: ${res.statusText}`);
    } finally {
      loader.classList.add("oculto");
    }
  };
  
  // Otras funciones o código relacionado con la gestión de monstruos
  