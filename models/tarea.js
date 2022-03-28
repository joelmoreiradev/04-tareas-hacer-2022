const { v4: uuidv4 } = require('uuid');


// Esto es el "molde" que se va a usar para crear las tareas.
// cada tarea tendrá una estructura JSON como:

/**
 * 
 * Tarea {
 * id: '2fef0af2-86d4-489a-ae86-720ff97c942f',
 * desc: 'Hacer algo',
 * CompletadoEn: null
 * }
 * 
 */


class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        // this hace referencia a la instancia de la clase
        
        this.id = uuidv4();
        // this.desc va a ser igual a la desc que reciba el constructor.
        this.desc = desc;

        this.completadoEn = null;
    }

}



module.exports = Tarea;