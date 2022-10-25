//MI MODAL 

const modalContainer = document.querySelector('#modal-container')
const modal = document.querySelector('#modal')
const abrirModal = document.querySelector('#modal-open')
const cerrarModal = document.querySelector('#modal-close')



abrirModal.addEventListener('click', () => {
    modalContainer.classList.add('modal-container-active')
})

cerrarModal.addEventListener('click', () => {
    modalContainer.classList.remove('modal-container-active')
})

modalContainer.addEventListener('click', (event) => {
    console.log(event)
    modalContainer.classList.remove('modal-container-active')
    cerrarModal.click()
})

modal.addEventListener('click', (event) => {
        event.stopPropagation()
    })
    //Contador carrito
const contadorCarrito = document.getElementById(`contadorCarrito`)
    //Precio total
const precioTotal = document.getElementById(`precioTotal`)

//carrito
const contenedorProductos = document.getElementById('contenedor_productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const carritoCompra = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
const productosCarrito = document.getElementById('productos-carrito');


let carrito = [];

cargarEventListeners();

contenedorProductos.addEventListener('click', agregarProducto);
// Elimina productos del carrito
carritoCompra.addEventListener('click', eliminarProducto);

function cargarEventListeners() {

    document.addEventListener('DOMContentLoaded', traerProductos);
    // Muestra los productos de local Storage y calculamos total a pagar
    document.addEventListener('DOMContentLoaded', () => {
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        mostrarHTML();
    })



    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', (e) => {
        Swal.fire({
            title: "Está seguro de eliminar todos los producto del carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, seguro",
            cancelButtonText: "No, no quiero",
        }).then((result) => {
                e.preventDefault();
                productosCarrito.style.display = "none"
                carrito = []; // reseteamos el arreglo
                cantidadTotal = 0; // reseteamos la variable cantidadTotal
                contadorCarrito.innerHTML = cantidadTotal
                precioTotal.innerHTML = 0;
                localStorage.removeItem("carrito");
                limpiarHTML(); // Eliminamos todo el HTML

                Swal.fire({
                    title: "Borrado!",
                    icon: "success",
                    text: "Los productos han sido borrados",
                });

            }

        );

    })
};

function eliminarProducto(e) {
    Swal.fire({
        title: "Está seguro de eliminar el/los producto/s seleccionado/s",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, seguro",
        cancelButtonText: "No, no quiero",
    }).then((result) => {
        if (result.isConfirmed) {
            if (e.target.classList.contains('borrar-producto')) {
                e.preventDefault();
                const productoId = e.target.getAttribute('data-id')
                    // Elimina del arreglo de articulosCarrito por el data-id
                carrito = carrito.filter(producto => producto.id !== productoId);
                mostrarHTML(); // Iterar sobre el carrito y mostrar su HTML
            }
            Swal.fire({
                title: "Borrado!",
                icon: "success",
                text: "El archivo ha sido borrado",
            });
        }
    });
}





async function traerProductos() {
    try {
        //codigo peligroso
        const response = await fetch('/json/data.json');
        const data = await response.json();
        data.forEach((producto) => {
            const div = document.createElement(`div`);
            div.classList.add(`producto`);
            div.innerHTML = `
                
                <h3>Pendrive</h3>
                <img src=${producto.img} alt=""> 
                <p class="marca">Marca: ${producto.marca}</p>
                <p class="memoria">Memoria en GB: ${producto.memoria}</p>
                <p class="color">Color: ${producto.color}</p>
                <p class="precio">Precio: $${producto.precio}</p>
                <button id="${producto.id}" class= "boton-agregar">Agregar<i= class "fas fa-shopping-cart"></i></button>
                `;
            contenedorProductos.appendChild(div);

            const botones = document.getElementById(`boton${producto.id}`);

        });
    } catch (error) {
        console.log(error);
    }

}

function agregarProducto(e) {
    if (e.target.classList.contains('boton-agregar')) {
        const producto = e.target.parentElement;
        // console.log(producto);
        leerProducto(producto);
    }
}

function leerProducto(producto) {
    const datosProducto = {
        nombre: producto.querySelector('h3').textContent,
        imagen: producto.querySelector('img').src,
        marca: producto.querySelector('.marca').innerText,
        memoria: producto.querySelector('.memoria').innerText,
        color: producto.querySelector('.color').innerText,
        precio: Number(producto.querySelector('.precio').innerText.replace('Precio: $', '')),
        id: producto.querySelector('button').getAttribute('id'),
        cantidad: 1,
        total: 0
    };

    datosProducto.total = datosProducto.precio * datosProducto.cantidad;

    const existe = carrito.some((producto) => producto.id === datosProducto.id);
    if (existe) {
        const productos = carrito.map((producto) => {
            if (producto.id === datosProducto.id) {
                producto.cantidad++;
                producto.total = producto.precio * producto.cantidad;

                return producto;
            } else {
                return producto;
            }
        });
        carrito = [...productos];
    } else {
        carrito = [...carrito, datosProducto];
    }
    console.log(carrito);

    mostrarHTML();
}







//Muestra lo que hay en mi carrito

function mostrarHTML() {
    let cantidadProductos = 0;

    carrito.length > 0 ? productosCarrito.style.display = "block" : productosCarrito.style.display = "none"

    //Limpia el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    carrito.forEach(producto => {
        const { imagen, marca, precio, cantidad, total, id } = producto;
        const row = document.createElement('tr');
        row.classList.add(`productoEnCarrito`);
        row.innerHTML = `
      <td><img class="imagenes" src="${imagen}" ></td>
      <td>${marca}</td>
      <td>precio: $${precio}</td>
      <td>cantidad: ${cantidad}</td>
      <td>total: $${total}</td>
      <td><a href="#" class="borrar-producto boton-eliminar" data-id="${id}"> X </a></td>
    `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    // obtenemos la cantidad total de productos y lo mostramos junto al carrito
    for (let i = 0; i < carrito.length; i++) {
        cantidadProductos += carrito[i].cantidad

    }

    if (cantidadProductos != 0) {

    }

    precioTotal.innerHTML = carrito.reduce((acc, producto) => acc + producto.total, 0)
    contadorCarrito.innerHTML = cantidadProductos;
    productosCarrito.innerHTML = cantidadProductos;
    // Agregar el carrito de compras al storage
    sincronizarStorage();

}


// Elimina los productos del tboby
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    productosCarrito.innerHTML = "";
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));

}