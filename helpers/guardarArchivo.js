const fs = require('fs');

const archivo = './db/data.json';


const guardarDB = ( data ) => {


    // para guardar la data en el archivo primero convierto el arreglo en un String
    fs.writeFileSync(archivo, JSON.stringify(data));

}



const leerDB = () => {
    
    // Verificar si existe o no el archivo data.json
    // En este caso verifico si no existe, para regresar null
    if(!fs.existsSync(archivo)) {
        return null;
    }

    // Si lo anterior no se ejecutó significa que existe
    // Así que procedo a leer el archivo
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});

    // Convierto la información que estaba en String, en un objeto JSON nuevamente.
    const data = JSON.parse( info );
    // console.log(data);

    return data;


}







module.exports = {
    guardarDB,
    leerDB
}