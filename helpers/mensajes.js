require('colors');

const mostrarMenu = () => {

    return new Promise( resolve => {


        console.clear();
        console.log('==========================='.green);
        console.log('   Seleccione una opción   '.bgWhite.black);
        console.log('===========================\n'.green);
    
        console.log(`${'1'.green}. Crear tarea`);
        console.log(`${'2'.green}. Listar tareas`);
        console.log(`${'3'.green}. Listar tareas completadas`);
        console.log(`${'4'.green}. Listar tareas pendientes`);
        console.log(`${'5'.green}. Completar tarea(s)`);
        console.log(`${'6'.green}. Borrar tarea`);
        console.log(`${'0'.green}. Salir\n`);
    
        // Creo la interfáz que voy a usar para mostrar y recibir información.
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // El primer parámetro es un String, y el segundo un callback que recibe el input
        readline.question('Seleccione una opción: ', (opt) => {
            // opt va a tener el valor ingresado en consola
            // console.log({opt});
            readline.close();

            // Lo que sea que la persona escriba, lo mando al resolve
            resolve(opt);
        });




    });




}

const pausa = () => {

        return new Promise(resolve => {

            // Creo la interfáz que voy a usar para mostrar y recibir información.
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
        
            // El primer parámetro es un String, y el segundo un callback que recibe el input
            readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
                // opt va a tener el valor ingresado en consola
                readline.close();
                resolve();
            });

        });


        
}


module.exports = {
    mostrarMenu,
    pausa
}