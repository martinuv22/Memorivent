const formulario = document.querySelector(`#formulario`);
// funcion para extraer los datos del formularios y poderlos ver JSON.
const procesar = (evento) => {
    evento.preventDefault();
    //creamos un objeto 
    const datos = new FormData(evento.target);

    //coleccion de pares de datos que son una clave y valor en un objeto
    const todosDatos = Object.fromEntries(datos.entries());

    console.log(JSON.stringify(todosDatos));

};


formulario.addEventListener(`submit`, procesar)