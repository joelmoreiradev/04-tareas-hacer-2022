/**
 * _listado:
 * {  'uuid-123712-123123-2: {id:13, desc:asd, completadoEn:12-12-2012}'  },
 * {  'uuid-123712-123123-2: {id:14, desc:asd, completadoEn:12-12-2012}'  }
 */

const Tarea = require("./tarea");


class Tareas {

    // Objeto _listado "base" en el que se almacenarán temporalmente las tareas
    // luego de este _listado se van a agregar al arreglo "listado" mediante el getter listadoArr()
    _listado = {};

    
    // Convertir un objeto a un arreglo
    get listadoArr () {
        
        // Declaro un arreglo vacío
        const listado = [];

        // recorrer _listado (objeto) y extraer cada una de las llaves que se encuentren en el mismo.
        // esto devuelve un arreglo de todas las llaves
        Object.keys(this._listado).forEach(key => {

            // almaceno una tarea individual en la variable "tarea" por su llave/id
            const tarea = this._listado[key];
            
            // agregar la tarea individual al listado
            listado.push(tarea);
        });

        // devuelvo el listado
        return listado;


    }



    constructor() {
        this._listado = {};
    }


    borrarTarea(id = '') {

        // si existe un id, voy a borrar el elemento del listado.
        if(this._listado[id]){
            // eliminar un elemento del listado
            delete this._listado[id];
        }

    }




    // recibe las tareas "parseadas" del archivo .json, y las agrega a _listado
    cargarTareasFromArray( tareas = [] ) {
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;

        });

    }


    // Con el crearTarea, creo una instancia de Tarea (tarea.js), y luego la agrego a _listado.
    // Al agregarla a _listado, a la estructura anterior descrita en tarea.js, le agrego un nombre al objeto agregado
    // el cual va a ser el UUID, por lo que el resultado final de la tarea dentro de _listado quedaría como:

    /**
    * 
    * _listado {
    * 
    *   '2fef0af2-86d4-489a-ae86-720ff97c942f': Tarea {
    *   id: '2fef0af2-86d4-489a-ae86-720ff97c942f',
    *   desc: 'Hacer algo',
    *   CompletadoEn: null
    *   }
    * 
    * }
    * 
    */



    
    crearTarea( desc = '' ) {

        // nueva instancia de tarea, a la que le mando la descripción ingresada por consola
        const tarea = new Tarea(desc);

        // Esa tarea ya teniendo una descripción, y habiendo sido generado el UUID, la agrego al objeto _listado 
        // dentro del objeto _listado, esa tarea tendrá como nombre su UUID, y el valor de ese UUID será la tarea.
        
        // [tarea.id] es el nombre del objeto que quiero crear, le doy el nombre del id de la tarea, y su valor será la tarea ( Tarea {...} )
        this._listado[tarea.id] = tarea;
    }


    listadoCompleto() {
        // 1: en verde
        // Completada: verde, Pendiente: rojo
        // 
        
        // para cada tarea... (tarea, indice)
        console.log();
        
        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${i + 1}`.green;

            // desestructuro la descripción y completadoEn de la tarea
            const { desc, completadoEn } = tarea;

            // si completadoEn existe, entonces 'Completada', caso contrario 'Pendiente'.
            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log(`${idx}. ${desc} :: ${estado}`);

            
        });
        
        
    }


    listarPendientesCompletadas(completadas = true) {
         // para cada tarea... (tarea, indice)
         console.log();
        
         this.listadoArr.forEach( (tarea, i) => {
 
             const idx = `${i + 1}`.green;
 
             // desestructuro la descripción y completadoEn de la tarea
             const { desc, completadoEn } = tarea;
 
             // si completadoEn existe, entonces 'Completada', caso contrario 'Pendiente'.
             const estado = (completadoEn)
                             ? 'Completada'.green
                             : 'Pendiente'.red;

             if(completadas){

                if(completadoEn){
                    console.log(`${idx}. ${desc} :: ${completadoEn.green}`);       
                }

             } else {
              
                if (!completadoEn) {
                    console.log(`${idx}. ${desc} :: ${estado}`);
                }
             }
 
             
         });
    }


    toggleCompletadas(ids = [] ) {


        ids.forEach(id => {
            
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }


        });




    }




}


module.exports = Tareas;