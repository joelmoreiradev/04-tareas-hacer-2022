require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');
// const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

// const { mostrarMenu, pausa } = require('./helpers/mensajes');




const main = async () => {
    // console.clear();

    let opt = '';

    // Declaro una instancia de Tareas.
    const tareas = new Tareas();

    // llamo leerDB y guardo el resultado en tareasDB
    const tareasDB = leerDB();    


    if(tareasDB) {  // cargar tareas
        // Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }



    do {

        // Imprimir el menú, y guardar la opción elegida en opt
        // opt va a ser igual a lo que regrese el inquirerMenu (regresa una opcion [Int]) 
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear opción
                const desc = await leerInput('Descripcion: ');
                // console.log(desc);
                tareas.crearTarea(desc);
            break;
        
            case '2': // listar todas las tareas
                // console.log(tareas.listadoArr);
               tareas.listadoCompleto();
            break;

            case '3': // listar completadas
                tareas.listarPendientesCompletadas();
            break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // completado | pendiente
               const ids = await mostrarListadoChecklist(tareas.listadoArr);
               tareas.toggleCompletadas(ids);
            break;


            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                // TODO: preguntar si está seguro.
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){ // si ok es true
                        tareas.borrarTarea(id);
                        console.log('Se borró correctamente la tarea.'.red);
                    }
                }
            break;
        }

        // guardo en un archivo el arreglo de tareas.
        // listadoArr es el getter de la clase Tareas
        
        guardarDB(tareas.listadoArr);
    
        
        // esperar por la pausa
        if (opt != 0) await pausa();
 
    } while (opt != '0');


    // pausa();
}


main();