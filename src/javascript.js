const Personajes = JSON.parse(localStorage.getItem("Personajes")) || [];
function localSave() {
    localStorage.setItem("Personajes", JSON.stringify(Personajes));
}

function agregarPersonaje() {
    const nombre = document.getElementById("nombre").value
    const elemento = document.getElementById("elemento").value
    const arma = document.getElementById("arma").value
    const region = document.getElementById("region").value

    const nuevoPersonaje = { nombre, elemento, arma, region }

    Personajes.push(nuevoPersonaje)
    localSave()
    updateList()
    document.getElementById("formInsert").reset();
    
}

function updateList() {
    const lista = document.getElementById("listaPersonajes")
    lista.innerHTML = ""

    Personajes.forEach((personaje, index) => {
        const row = lista.insertRow();
        const cellNombre = row.insertCell(0);
        const cellElemento = row.insertCell(1);
        const cellRegion = row.insertCell(2);
        const cellArma = row.insertCell(3);
        const cellAcciones = row.insertCell(4);

        cellNombre.innerHTML = personaje.nombre;
        cellElemento.innerHTML = personaje.elemento;
        cellArma.innerHTML = personaje.arma;
        cellRegion.innerHTML = personaje.region
        cellAcciones.innerHTML = `<button type="button" class="bg-green-400 p-2 text-white rounded-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="seleccionarPersonaje(${index})">
        Editar
        </button>
        <button class="bg-red-700 p-2 text-white rounded-lg" onclick="deletePersonaje(${index})">Eliminar</button>`;
    })
}

let personajeSelect = -1

function seleccionarPersonaje(index) {
    personajeSelect = index
    const personaje = Personajes[index]
    document.getElementById("actualizarNombre").value = personaje.nombre
    document.getElementById("actualizarElemento").value = personaje.elemento
    document.getElementById("actualizarArma").value = personaje.arma
    document.getElementById("actualizarRegion").value = personaje.region
}

function updatePersonaje() {
    if (personajeSelect >= 0) {
        const nombre = document.getElementById("actualizarNombre").value
        const elemento = document.getElementById("actualizarElemento").value
        const arma = document.getElementById("actualizarArma").value
        const region = document.getElementById("actualizarRegion").value

        Personajes[personajeSelect] = { nombre, elemento, arma, region }
        localSave()
        updateList()
        personajeSelect = -1;
        document.getElementById("formUpdate").reset();

    }
}

function deletePersonaje(index) {
    if (confirm("¿Seguro que desea eliminar este personaje?")) {
        Personajes.splice(index, 1);
        localSave()
        updateList();
        personajeSelect = -1;
        document.getElementById("formUpdate").reset();
    }
}

function buscar(){
    const criterio = document.getElementById("criterio").value
    const resultado = Personajes.filter((personaje)=>{
        return(
        personaje.nombre.toLowerCase().includes(criterio.toLowerCase()) ||
        personaje.elemento.toLowerCase().includes(criterio.toLowerCase()) ||
        personaje.arma.toLowerCase().includes(criterio.toLowerCase()) ||
        personaje.region.toLowerCase().includes(criterio.toLowerCase())
        )
    })
    if(resultado.length > 0){
        const resultBusqueda = document.getElementById("results")
        innerHTML = ""
        resultado.forEach((personaje, index) =>{
            const itemsResults = document.createElement("li")
            itemsResults.innerHTML = `${index + 1 } Nombre: ${personaje.nombre}, Elemento: ${personaje.elemento}, Arma: ${personaje.arma}, Region: ${personaje.region}`
            resultBusqueda.appendChild(itemsResults)
        })

    }
}
updateList()