import { Libros } from "../libros/libros";

export class Estudiante {
  cedula: string;
  nombre: string;
  apellido: string;
  sexo: string;
  fecha_Nacimiento: string;
  status:boolean;
  ListaLibros: Libros[]; 

  constructor(cedu: string, nom: string, ape: string, sex: string, fecha: string,estatus:boolean) {
      this.cedula = cedu;
      this.nombre = nom;
      this.apellido = ape;
      this.sexo = sex;
      this.fecha_Nacimiento = fecha;
      this.status = estatus;
      this.ListaLibros = []; 
  }
}
