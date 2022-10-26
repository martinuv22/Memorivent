//En caso de querer hacerlo funcionar con Json, y almacenar los datos en Json.
/*const formulario = document.querySelector(`#formulario`);
// funcion para extraer los datos del formularios y poderlos ver JSON.
const proce                                                                                                                                                                                    
    //creamos un objeto 
    const datos = new FormData(evento.target);

    //coleccion de pares de datos que son una clave y valor en un objeto
    const todosDatos = Object.fromEntries(datos.entries());

    console.log(JSON.stringify(todosDatos));

};


formulario.addEventListener(`submit`, procesar)
*/



// Importante para hacer funcionar el servidor de prueva, en la terminal tipear: npm run json:server


const btn = document.querySelector('#btn');
const formulario = document.querySelector('#formulario');
const respuesta = document.querySelector('#respuesta');

/*Funcion para sacar los datos del Formulario con FormData (ve la leccion anterior)*/

const getData = () => {
    const datos = new FormData(formulario);
    const datosProcesados = Object.fromEntries(datos.entries());
    formulario.reset();
    return datosProcesados;
}



/*Funcion para colocar los datos en el Servidor */

const postData = async() => {

    /*Crea un objeto con la informacion del formulario*/
    const newUser = getData();

    try {
        const response = await fetch('        http://localhost:3000/users     ', {
            /*especifica el metodo que se va a usar*/
            method: 'POST',
            /*especifica el tipo de informacion (JSON)*/
            headers: { 'Content-Type': 'application/json' },
            /*coloca la informacion en el formato JSON */
            body: JSON.stringify(newUser)
        });


    } catch (error) {
        console.log(error);
    }

}




btn.addEventListener('click', (event) => {
    Swal.fire({
        title: "Su mensaje ha sido enviado con exito!",
        icon: "success",
        text: "Pronto nos contactaremos con usted",
    });
    event.preventDefault();
    postData();

})