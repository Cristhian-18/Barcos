import { Estudiante } from "./estudiantes";

export class TlistaEstudiante {
    ListaEstudiante: Estudiante[];
    ListaEstudianteF: Estudiante[];
    
    constructor() {
        const storedData = localStorage.getItem('listaEstudiantes');
        this.ListaEstudianteF = storedData ? JSON.parse(storedData) : [];
        if (!storedData) {
            this.agregarDatosPredefinidos();
        }
        this.ListaEstudiante = []; 
    }

    Insertar(op: Estudiante) {
        this.ListaEstudianteF.push(op);
        this.guardarEnLocalStorage();
    }

    Modificar(pos: number, op: Estudiante) {
        this.ListaEstudianteF[pos] = op;
        this.guardarEnLocalStorage();
    }

    Eliminar(pos: number) {
        this.ListaEstudianteF.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar(): Estudiante[] {
        return this.ListaEstudianteF;
    }

 
    private guardarEnLocalStorage() {
        localStorage.setItem('listaEstudiantes', JSON.stringify(this.ListaEstudianteF));
    }

    // Método para agregar los datos predefinidos si el localStorage está vacío
    private agregarDatosPredefinidos() {
        this.ListaEstudianteF = [
            {
                cedula:"0803326265",
                nombre:"Cristhian",
                apellido:"Cordova",
                sexo:"Masculino",
                fecha_Nacimiento:"2002-10-17",
                status:true,
                ListaLibros:[]
            },
            {
                cedula:"0706678786",
                nombre: "Angel Migel",
                apellido:"Velez Hall",
                sexo:"Masculino",
                fecha_Nacimiento:"2005-11-10",
                status:true,
                ListaLibros:[]
            },
            {
                cedula:"0701145458",
                nombre:"Maria Jose",
                apellido:"Cedeño Gonzales",
                sexo:"Femenino",
                fecha_Nacimiento:"1999-07-10",
                status:true,
                ListaLibros:[]
            }
        ];
    }
}
