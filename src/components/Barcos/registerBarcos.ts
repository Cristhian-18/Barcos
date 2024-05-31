
import { TlistaBarco } from '../../services/Clases/Barcos/ListasBarcos';
import { Barco } from "../../services/Clases/Barcos/Barcos";
import { TlistaPersona } from "../../services/Clases/Socio/ListasPersona";

const nombreM = document.querySelector("#numeroM") as HTMLInputElement;
const nombre = document.querySelector("#nombre") as HTMLInputElement;
const numeroA = document.querySelector("#numeroA") as HTMLInputElement;
const cuota = document.querySelector("#cuota") as HTMLInputElement;

const form = document.querySelector("#frmEdit") as HTMLFormElement;
const socio = document.querySelector(
  "#socioL"
) as HTMLInputElement;
let banderainsert = false;
let posedit = 0;


const crud = new TlistaBarco();
const crude = new TlistaPersona();

Listar(crud);

export function cargarcomboxE() {
  document.addEventListener("DOMContentLoaded", () => {
    const selectCategoriaRevistas = document.getElementById(
      "socioL"
    ) as HTMLSelectElement;
  
    selectCategoriaRevistas.addEventListener("change", () => {
      //indexE = selectCategoriaRevistas.selectedIndex - 1;
    });
  
    crude.ListaPersonaF.forEach((estudiante, index) => {
      const option = document.createElement("option");
      option.value = JSON.stringify(estudiante);
      option.textContent = `${estudiante.nombre} ${estudiante.apellido}`;
      selectCategoriaRevistas.appendChild(option);
    });
  });
}

cargarcomboxE();


document
  .querySelector(".btn-guardar")!
  .addEventListener("click", () => Guardar());

document
  .querySelector(".btn-cerrar")!
  .addEventListener("click", () => limpiarCampos());

export function Guardar() {
  if (banderainsert == true) {
    const socioJSON = JSON.parse(socio.value);
    const aux = new Barco(
     nombreM.value,
     nombre.value,
     numeroA.value,
     cuota.value
    );
    aux.duenoB.push(socioJSON)
    crud.Modificar(posedit, aux);

    limpiarCampos();

    const body = document.querySelector("tbody")!;
    body.innerHTML = ""; 
    Listar(crud); 
    banderainsert = false;
    
  } else {
    insertar();
    limpiarCampos();
  }
}

export function insertar() {
  const socioJSON = JSON.parse(socio.value);
  const op = new Barco(
   nombreM.value,
   nombre.value,
   numeroA.value,
   cuota.value
  );
  op.duenoB.push(socioJSON)
  crud.Insertar(op);
  Listar(crud);

 
}

function limpiarCampos() {
  nombreM.value ="";
  nombre.value ="";
  numeroA.value ="";
  cuota.value ="";
  banderainsert = false;
}

export function cargar(pos: number, op: any) {

  const socioSelect = document.querySelector("#socioL") as HTMLSelectElement;


  nombreM.value = op.numeroMatricula;
  nombre.value = op.nombre;
  numeroA.value = op.numeroAmarre;
  cuota.value = op.cuota;

  
  if (op.duenoB.length > 0) {
    const dueno = op.duenoB[0]; 

    for (let i = 0; i < socioSelect.options.length; i++) {
      const option = socioSelect.options[i];
      try {
        const optionValue = JSON.parse(option.value);

        if (optionValue.cedula === dueno.cedula) {
          socioSelect.selectedIndex = i;
          break;
        }
      } catch (error) {
        
      }
    }
  }

  posedit = pos;
  banderainsert = true;
}


export function eliminar(pos: number) {
  crud.Eliminar(pos);
  Listar(crud);
 
}

// Función para agregar o actualizar un producto en la tabla
export function Listar(op: TlistaBarco) {
  const body = document.querySelector("tbody")!;
  body.innerHTML = ""; 
  const clase =
    "px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200";

  op.ListaBarcoF.forEach((libro, index) => {
   
    const tabla = document.createElement("tr");

    const cod = document.createElement("td");
    cod.className = clase;
    cod.textContent = libro.numeroMatricula;

    const nom = document.createElement("td");
    nom.className = clase;
    nom.textContent = libro.nombre;
    const dueno = document.createElement("td");
    dueno.className = clase;
    dueno.textContent = libro.duenoB[0].nombre +" "+ libro.duenoB[0].apellido;

    const auto = document.createElement("td");
    auto.className = clase;
    auto.textContent = libro.numeroAmarre;

    const edito = document.createElement("td");
    edito.className = clase;
    edito.textContent = libro.cuota;

  


    const edit = document.createElement("td");
    const botonContainer = document.createElement("div");
    const botonEditar = document.createElement("button");
    botonEditar.className =
      "btnEditar btn btn-secondary focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
    botonEditar.innerHTML = "Editar";
    const botonEliminar = document.createElement("button");
    botonEliminar.className =
      "btnBorrar btn btn-danger focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
    botonEliminar.innerHTML = "Eliminar";

    botonContainer.appendChild(botonEditar);
    botonContainer.appendChild(botonEliminar);

    edit.appendChild(botonContainer);

    botonContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      if (target === botonEditar) {
        cargar(index, libro);
        const botonAgregar = document.getElementById("btnNuevo");
        if (botonAgregar) {
          console.log("s");
          botonAgregar.click();
        }
      } else if (target === botonEliminar) {
        console.log("Eliminando libro en la posición:", index);
        eliminar(index);
      }
    });

    tabla.append(cod, nom, dueno,auto, edito,edit);

    const body = document.querySelector("tbody")!;
    body.prepend(tabla);
  });
}
