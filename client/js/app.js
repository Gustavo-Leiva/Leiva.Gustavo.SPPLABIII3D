// import { monstruos } from "../data/data.js";



import {actualizarTabla} from "./tabla.js";
import {Monstruo} from "./monstruo.js";


const URL = "http://localhost:4001/monstruos";
const loader = document.querySelector("#loader");
const monstruos = getMonstruos() || [];
// lo ubico en primer lugar para que este cargado
const $seccionTabla= document.getElementById("tabla");
const $formulario = document.forms[0];

const $selectTipo = $formulario.txtTipo;
const tiposMonstruos = ["vampiro", "hombre-lobo", "fantasma", "bruja"];
cargarTiposMonstruosEnSelect();
ocultarBotonEliminar();


// con esto registro el evento click a toda la ventana del navegador (delegacion de eventos)
window.addEventListener("click",function(e){

    //uso este metodo matches para que cuando haga un click en td realice el evento.
    //este es la mejor manera de hacerlo
    if(e.target.matches("td")){
        // const tr = e.target.parentElement.dataset.id;
        const id = e.target.parentElement.getAttribute("data-id");
       
      //lo dejo en una linea porque es una array function
        const selectedMonstruo = monstruos.find((mons)=>mons.id == id);        
        cargarForMonstruo($formulario, selectedMonstruo);   
        cambiarBotonAModificar();
        mostrarBotonEliminar();
        
         

    }

    else if(e.target.matches("input[value='Eliminar']")){  
         
        const id= parseInt($formulario.txtId.value);
        handlerDelete(id);
     
        $formulario.txtId.value='';
        $formulario.reset();
    }
    
});




//si el largo es > 0 actualizo y muestro la tarjeta
if(monstruos.length) {    
    actualizarTabla($seccionTabla,monstruos);
}


$formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
   
    const {txtId,txtNombre,txtTipo,txtAlias,txtMiedo,rdoDefensa} = $formulario;
   

    if(txtId.value === ""){
        // alta monstruo
        const newMonstruo = new Monstruo(Date.now(),txtNombre.value, txtTipo.value,txtAlias.value, parseInt(txtMiedo.value),rdoDefensa.value);
        handlerCreate(newMonstruo); 
        $formulario.txtId.value='';
        $formulario.reset();
        
    }




 
    else{
        // modificar(update) monstruo
        const updateMonstruo = new Monstruo(parseInt(txtId.value),txtNombre.value,txtTipo.value, txtAlias.value,parseInt(txtMiedo.value),rdoDefensa.value);
        handlerUpdate(updateMonstruo);
        cambiarBotonAGuardar();
        mostrarBotonEliminar();
        $formulario.txtId.value='';
        $formulario.reset();

    }

})


//Ajax funciona
function handlerCreate(nuevoMonstruo) {
    
    const xhr = new XMLHttpRequest();
    loader.classList.remove("oculto");
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            } else {
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }
    
    xhr.open("POST", URL, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    try {
        xhr.send(JSON.stringify(nuevoMonstruo));  // Aquí es la variable correcta
    } catch (error) {
        console.log(error);
    }
    
    monstruos.push(nuevoMonstruo);
    // actualizarStorage("monstruos", monstruos);
    actualizarTabla($seccionTabla, monstruos);
}

//Ajax funciona
function handlerUpdate(editMonstruo){
    // let index = monstruos.findIndex((mons)=>mons.id == editMonstruo.id);
    
    let existeMonstruo = monstruos.find((mons) => mons.id == editMonstruo.id);

      if (existeMonstruo) {
        // Actualizar propiedades del monstruo existente
        Object.assign(existeMonstruo, editMonstruo);
    } else {
        // Agregar el nuevo monstruo al array
        monstruos.push(editMonstruo);
    }
    //voy a lista de monstruos y piso los datos
    // monstruos.splice(index,1,editMonstruo);//hace desparecer el dato seleccionado y lo reemplaza.
        
    
    const xhr = new XMLHttpRequest();
   
  
    loader.classList.remove("oculto");
    //setear evento ready state change
  
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }
    
    
    //open peticion configura    
    xhr.open("PUT", URL + `/${editMonstruo.id}`, true);    
    //seteo la cabecera  
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");  
    //enviar
    try{
        xhr.send(JSON.stringify(editMonstruo));
    }
    catch(error){
        console.log(error);
    }

    actualizarTabla($seccionTabla,monstruos);
}


//axios funciona
function handlerDelete(id){
    
    loader.classList.remove("oculto");

    axios.delete(URL + `/${id}`)
    .then(({data})=>{
        // const {data} = res;
        console.log(data);
    })
    .catch(({message})=>{
        console.error(message);
    })
    .finally(()=>{
        loader.classList.add("oculto");
    })
}

//usar para este fetch
function getMonstruos(){

    const xhr = new XMLHttpRequest();  
    loader.classList.remove("oculto");
    
    // setear evento ready state change
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
  
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                monstruos.length = 0;
                monstruos.push(...data);
                actualizarTabla($seccionTabla, monstruos);
                // console.log(data);
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }
  
    //open peticion configura
    xhr.open("GET", URL, true);
  
    //enviar
    try{
        xhr.send();
    }
    catch(error){
        console.log(error);
    }
  }



// para carga el formulario
function cargarForMonstruo(formulario,monstruo){

    formulario.txtId.value = monstruo.id;
    formulario.txtNombre.value = monstruo.nombre;    
    formulario.txtTipo.value = monstruo.tipo;
    formulario.txtAlias.value = monstruo.alias;
    formulario.txtMiedo.value = monstruo.miedo;
    formulario.rdoDefensa.value = monstruo.defensa;

    
}


//funciones cambiar nombre de los botones guardar-modificar
function cambiarBotonAModificar(){
    const botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.value = "Modificar";
}

function cambiarBotonAGuardar(){
    const botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.value = "Guardar";
}


function ocultarBotonEliminar() {
    const botonEliminar = document.getElementById("btnEliminar");
    botonEliminar.style.display = "none";
}

function mostrarBotonEliminar() {
    const botonEliminar = document.getElementById("btnEliminar");
    botonEliminar.style.display = "block";
}


function cargarTiposMonstruosEnSelect() {
    // Limpiar opciones actuales
    $selectTipo.innerHTML = '';

    // Crear y agregar opciones al select
    tiposMonstruos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        $selectTipo.appendChild(option);
    });
}









