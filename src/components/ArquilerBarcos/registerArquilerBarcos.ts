import { TlistaPersona } from "../../services/Clases/Socio/ListasPersona";
import { TlistaConductor } from "../../services/Clases/Conductor/ListasConductor";
import { AqrquilerBarco } from "../../services/Clases/ArquilerBarcos/ArquilerBarcos";
import { TlistaAqrquilerBarco } from "../../services/Clases/ArquilerBarcos/ListasArquilerBarcos";
import { TlistaBarco } from "../../services/Clases/Barcos/ListasBarcos";

const conductor = document.querySelector("#conductor") as HTMLInputElement;
const socios = document.querySelector("#socioL") as HTMLInputElement;
const barcos = document.querySelector("#barcos") as HTMLInputElement;
const destinos = document.querySelector("#destinos") as HTMLInputElement;
const fecha = document.querySelector("#fecha_inicio") as HTMLInputElement;
const form = document.querySelector("#frmEdit") as HTMLFormElement;

let banderainsert = false;
let posedit = 0;
var cuota = 0;

const crud = new TlistaAqrquilerBarco();
const crude = new TlistaPersona();
const crudc = new TlistaConductor();
const crudb = new TlistaBarco();

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

export function cargarcomboxB() {
  document.addEventListener("DOMContentLoaded", () => {
    const selectCategoriaRevistas = document.getElementById(
      "barcos"
    ) as HTMLSelectElement;

    selectCategoriaRevistas.addEventListener("change", () => {
      //indexE = selectCategoriaRevistas.selectedIndex - 1;
    });

    crudb.ListaBarcoF.forEach((estudiante, index) => {
      const option = document.createElement("option");
      option.value = JSON.stringify(estudiante);
      option.textContent = `${estudiante.numeroMatricula}`;
      selectCategoriaRevistas.appendChild(option);
    });
  });
}
cargarcomboxB();

export function cargarcomboxC() {
  document.addEventListener("DOMContentLoaded", () => {
    const selectCategoriaRevistas = document.getElementById(
      "conductor"
    ) as HTMLSelectElement;

    selectCategoriaRevistas.addEventListener("change", () => {
      //indexE = selectCategoriaRevistas.selectedIndex - 1;
    });

    crudc.ListaConductorF.forEach((estudiante, index) => {
      const option = document.createElement("option");
      option.value = JSON.stringify(estudiante);
      option.textContent = `${estudiante.nombre} ${estudiante.apellido}`;
      selectCategoriaRevistas.appendChild(option);
    });
  });
}
cargarcomboxC();

const divprecionfin = document.getElementById("TRecaudado");
const divprecionfinH1 = document.createElement("h1");
divprecionfinH1.className = "text-2xl font-medium text-gray-700";
divprecionfinH1.textContent = "0,00";
divprecionfin!.appendChild(divprecionfinH1);

const divTViajes = document.getElementById("TViajes");
const divTViajesH1 = document.createElement("h1");
divTViajesH1.className = "text-2xl font-medium text-gray-700";
divTViajesH1.textContent =
  "Numero de Viajes: " + crud.ListaAqrquilerBarcoF.length.toString();
divTViajes!.appendChild(divTViajesH1);

const divMayorF = document.getElementById("MayorF");
const divMayorFH1 = document.createElement("h1");
divMayorFH1.className = "text-2xl font-medium text-gray-700";
divMayorFH1.textContent = "---";
divMayorF!.appendChild(divMayorFH1);
BarcoNumeroV();
TotalRecaudato();

document
  .querySelector(".btn-guardar")!
  .addEventListener("click", () => Guardar());

document
  .querySelector(".btn-cerrar")!
  .addEventListener("click", () => limpiarCampos());

export function Guardar() {
  if (banderainsert == true) {
    const conduJSON = JSON.parse(conductor.value);
    const socioJSON = JSON.parse(socios.value);
    const barcoJSON = JSON.parse(barcos.value);
    if (socioJSON.tipo == "Socio") {
      cuota = 0;
    } else {
      cuotaPagar();
    }

    const aux = new AqrquilerBarco(
      destinos.value,
      fecha.value,
      cuota.toString()
    );
    aux.nombreConductor.push(conduJSON);
    aux.nombreCliente.push(socioJSON);
    aux.nombreBarco.push(barcoJSON);

    if (socioJSON.fecha_Nacimiento) {
      var fechaNacimiento = new Date(socioJSON.fecha_Nacimiento);
      var edad = calcularEdad(fechaNacimiento);
      console.log(fechaNacimiento);
      console.log(edad);
      if (edad < 18) {
        alert("Lo siento, no puedes alquilar porque eres menor de edad.");
      } else {
        for (let j = 0; j < crudb.ListaBarcoF.length; j++) {
          const barco = crudb.ListaBarcoF[j];

          if (barco.duenoB && barco.duenoB.length > 0) {
            if (barco.duenoB[0].nombre === aux.nombreCliente[0].nombre) {
              aux.CuotaPagar = 0 + "";
            }
          }
        }
        crud.Modificar(posedit, aux);
      }

      function calcularEdad(fechaNacimiento: Date) {
        var hoy = new Date();
        var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        var mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (
          mes < 0 ||
          (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
          edad--;
        }
        return edad;
      }
      Listar(crud);
    }

    divTViajesH1.textContent =
      "Numero de Viajes: " + crud.ListaAqrquilerBarcoF.length.toString();
    divTViajes!.appendChild(divTViajesH1);
    limpiarCampos();
    const body = document.querySelector("tbody")!;
    body.innerHTML = "";
    Listar(crud);
    banderainsert = false;
    BarcoNumeroV();
    TotalRecaudato();
  } else {
    insertar();
    divTViajesH1.textContent =
      "Numero de Viajes: " + crud.ListaAqrquilerBarcoF.length.toString();
    divTViajes!.appendChild(divTViajesH1);
    limpiarCampos();
    TotalRecaudato();
    BarcoNumeroV();
  }
}

export function insertar() {
  const conduJSON = JSON.parse(conductor.value);
  const socioJSON = JSON.parse(socios.value);
  const barcoJSON = JSON.parse(barcos.value);
  if (socioJSON.tipo == "Socio") {
    cuota = 0;
  } else {
    cuotaPagar();
  }

  const op = new AqrquilerBarco(destinos.value, fecha.value, cuota.toString());
  op.nombreConductor.push(conduJSON);
  op.nombreCliente.push(socioJSON);
  op.nombreBarco.push(barcoJSON);

  console.log(op);

  if (socioJSON.fecha_Nacimiento) {
    var fechaNacimiento = new Date(socioJSON.fecha_Nacimiento);
    var edad = calcularEdad(fechaNacimiento);
    console.log(fechaNacimiento);
    console.log(edad);
    if (edad < 18) {
      alert("Lo siento, no puedes alquilar porque eres menor de edad.");
    } else {
      for (let j = 0; j < crudb.ListaBarcoF.length; j++) {
        const barco = crudb.ListaBarcoF[j];

        if (barco.duenoB && barco.duenoB.length > 0) {
          if (barco.duenoB[0].nombre === op.nombreCliente[0].nombre) {
            op.CuotaPagar = 0 + "";
          }
        }
      }
      crud.Insertar(op);
      BarcoNumeroV();
      TotalRecaudato();
    }

    function calcularEdad(fechaNacimiento: Date) {
      var hoy = new Date();
      var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      var mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      return edad;
    }
    Listar(crud);
  }
}

function limpiarCampos() {
  banderainsert = false;
}

export function cargar(pos: number, op: any) {
  const conductorelect = document.querySelector(
    "#conductor"
  ) as HTMLSelectElement;
  const socioSelect = document.querySelector("#socioL") as HTMLSelectElement;
  const barcoselect = document.querySelector("#barcos") as HTMLSelectElement;

  conductor.value = op.nombreConductor;
  socios.value = op.nombreCliente;
  barcos.value = op.nombreBarco;
  destinos.value = op.nombreDestino;
  fecha.value = op.fecha_salida;
  cuota = op.CuotaPagar;

  if (op.nombreCliente.length > 0) {
    const dueno = op.nombreCliente[0];

    for (let i = 0; i < socioSelect.options.length; i++) {
      const option = socioSelect.options[i];
      try {
        const optionValue = JSON.parse(option.value);

        if (optionValue.cedula === dueno.cedula) {
          socioSelect.selectedIndex = i;
          break;
        }
      } catch (error) {}
    }
  }

  if (op.nombreConductor.length > 0) {
    const dueno = op.nombreConductor[0];

    for (let i = 0; i < conductorelect.options.length; i++) {
      const option = conductorelect.options[i];
      try {
        const optionValue = JSON.parse(option.value);
        if (optionValue.cedula === dueno.cedula) {
          conductorelect.selectedIndex = i;
          break;
        }
      } catch (error) {}
    }
  }
  if (op.nombreBarco.length > 0) {
    const dueno = op.nombreBarco[0];

    for (let i = 0; i < barcoselect.options.length; i++) {
      const option = barcoselect.options[i];
      try {
        const optionValue = JSON.parse(option.value);

        if (optionValue.numeroMatricula === dueno.numeroMatricula) {
          barcoselect.selectedIndex = i;
          break;
        }
      } catch (error) {}
    }
  }

  posedit = pos;
  banderainsert = true;
}

export function eliminar(pos: number) {
  crud.Eliminar(pos);
  Listar(crud);
  divTViajesH1.textContent =
    "Numero de Viajes: " + crud.ListaAqrquilerBarcoF.length.toString();
  divTViajes!.appendChild(divTViajesH1);
  BarcoNumeroV();
  TotalRecaudato();
}

export function cuotaPagar() {
  if (destinos.value == "Dubai") {
    cuota = 100;
  }
  if (destinos.value == "Caracas") {
    cuota = 200;
  }
  if (destinos.value == "Japon") {
    cuota = 300;
  }
}

export function TotalRecaudato() {
  let total = 0;
  for (let i = 0; i < crud.ListaAqrquilerBarcoF.length; i++) {
    const alquiler = crud.ListaAqrquilerBarcoF[i];

    
    if (alquiler.nombreCliente && alquiler.nombreCliente.length > 0) {
      if (alquiler.nombreCliente[0].tipo === "Cliente") {
        total += parseInt(alquiler.CuotaPagar);
      }
    }
  }

  console.log(total);
  divprecionfinH1.textContent = "Total Recaudado: $" + total.toString();
  divprecionfin!.appendChild(divprecionfinH1);
}

export function BarcoNumeroV() {
  if (!crud.ListaAqrquilerBarcoF || crud.ListaAqrquilerBarcoF.length === 0) {
    console.log("La lista está vacía o no existe.");
    return null;
  }
  const matriculaCount: { [key: string]: number } = {};

  crud.ListaAqrquilerBarcoF.forEach((item) => {
    const matricula = item.nombreBarco[0].numeroMatricula;

    if (matricula) {
      if (matriculaCount[matricula]) {
        matriculaCount[matricula]++;
      } else {
        matriculaCount[matricula] = 1;
      }
    }
  });

  let maxCount = 0;
  let mostFrequentMatricula = null;

  for (const matricula in matriculaCount) {
    if (matriculaCount[matricula] > maxCount) {
      maxCount = matriculaCount[matricula];
      mostFrequentMatricula = matricula;
    }
  }

  divMayorFH1.textContent = `Barco Mayor Viaje ${mostFrequentMatricula} con ${maxCount} viajes.`;
  divMayorF!.appendChild(divMayorFH1);

  return mostFrequentMatricula;
}

export function Listar(op: TlistaAqrquilerBarco) {
  const body = document.querySelector("tbody")!;
  body.innerHTML = ""; 

  const clase =
    "px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200";

  op.ListaAqrquilerBarcoF.forEach((libro, index) => {
    
    const tabla = document.createElement("tr");

    const nombrec = document.createElement("td");
    nombrec.className = clase;
    nombrec.textContent =
      libro.nombreConductor[0].nombre + " " + libro.nombreConductor[0].apellido;

    const nomcli = document.createElement("td");
    nomcli.className = clase;
    nomcli.textContent =
      libro.nombreCliente[0].nombre + " " + libro.nombreCliente[0].apellido;

    const barco = document.createElement("td");
    barco.className = clase;
    barco.textContent = libro.nombreBarco[0].numeroMatricula;

    const desti = document.createElement("td");
    desti.className = clase;
    desti.textContent = libro.nombreDestino;

    const fecha = document.createElement("td");
    fecha.className = clase;
    
    
    const fechaSalida1 = new Date(libro.fecha_salida);
    const dia = fechaSalida1.getDate().toString().padStart(2, '0'); 
    const mes = (fechaSalida1.getMonth() + 1).toString().padStart(2, '0'); 
    const año = fechaSalida1.getFullYear();
    fecha.textContent = `${dia}/${mes}/${año}`;

    const hora = document.createElement("td");
    hora.className = clase;

    
    const fechaSalida = new Date(libro.fecha_salida);
    const horas = fechaSalida.getHours().toString().padStart(2, '0'); 
    const minutos = fechaSalida.getMinutes().toString().padStart(2, '0'); 
    hora.textContent = `${horas}:${minutos}`;


    const cuota = document.createElement("td");
    cuota.className = clase;
    cuota.textContent = libro.CuotaPagar;

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
          botonAgregar.click();
        }
      } else if (target === botonEliminar) {
        console.log("Eliminando libro en la posición:", index);
        eliminar(index);
      }
    });

    tabla.append(nombrec, nomcli, barco, desti, fecha,hora, cuota, edit);

    const body = document.querySelector("tbody")!;
    body.prepend(tabla);
  });
}
