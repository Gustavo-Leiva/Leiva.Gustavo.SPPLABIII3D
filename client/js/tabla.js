
//3 metodos que crean cada parte de la tabla.

//crear tabla
export const crearTabla = (data,colorCabecera)=>{    
    if(!Array.isArray(data)) return null;
    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(data[0],colorCabecera));
    tabla.appendChild(crearCuerpo(data)); 
    return tabla;    
}


//crear cabecera
const crearCabecera = (elemento,color)=>{    
    const tHead = document.createElement("thead"),
    headRow = document.createElement("tr");
    headRow.style.setProperty("background-color",color)



    for (const key in elemento){
        if(key === "id") continue;
        const th = document.createElement("th");
        th.textContent = key;
        headRow.appendChild(th);
    }
    tHead.appendChild(headRow);
    return tHead;
}


//crear el cuerpo
const crearCuerpo = (data)=>{

    if(!Array.isArray(data)) return null;

    const tBody = document.createElement("tbody");
    data.forEach((element,index)=>{
        const tr = document.createElement("tr");
        if(index % 2 ==0){
            tr.classList.add("rowPar");
        }
        for(const key in element){
            if(key === "id"){
                //una manera con propiedad
                tr.dataset.id = element[key];  
                //segunda manera //con atributo
                //tr.setAttribute("data-id",element[key]); 
            }
            else{
                const td = document.createElement("td");
                td.textContent = element[key];
                 tr.appendChild(td);

            }
        }
        tBody.appendChild(tr);
    })
    return tBody;
}





export const actualizarTabla = (contenedor, data)=>{

    //limpio el contenedor
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstElementChild);
    }

    //le agrego al contenedor lo que devuelva tabla.
    contenedor.appendChild(crearTabla(data,"coral"));
};