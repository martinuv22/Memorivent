////// Carrito de compras:


/// DOM
const contenedorProductos = document.getElementById(`contenedor_productos`)

const contenedorCarrito = document.getElementById(`carrito-contenedor`)



//Contador carrito
const contadorCarrito = document.getElementById(`contadorCarrito`)
    //Precio total
const precioTotal = document.getElementById(`precioTotal`)


let carrito = []

// locar Storage 
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actuarlizarCarrito()
    }
})

//Array de mi carrito
const mercaderias = [

    {
        id: 1,
        producto: "Pedrive",
        cantidad: 1,
        marca: "SanDisk",
        img: `/imagenes/SanDisk.jpg`,
        memoria: 64,
        color: "Gris",
        precio: 1000
    },
    {
        id: 2,
        producto: "Pedrive",
        cantidad: 1,
        marca: "SanDisk",
        img: `/imagenes/SanDisk.jpg`,
        memoria: 120,
        color: "Gris",
        precio: 2000
    },
    {
        id: 3,
        producto: "Pedrive",
        cantidad: 1,
        marca: "SanDisk",
        img: `/imagenes/SanDisk.jpg`,
        memoria: 500,
        color: "Gris",
        precio: 2500
    },
    {
        id: 4,
        producto: "Pedrive",
        cantidad: 1,
        marca: "SanDisk",
        img: `/imagenes/SanDisk.jpg`,
        memoria: 1000,
        color: "Gris",
        precio: 4500
    },
    {
        id: 5,
        producto: "Pedrive",
        cantidad: 1,
        marca: "Kingtong",
        img: `/imagenes/Kingston.jpg`,
        memoria: 64,
        color: "negro y rojo",
        precio: 1500
    },
    {
        id: 6,
        producto: "Pedrive",
        cantidad: 1,
        marca: "Kingtong",
        img: `/imagenes/Kingston.jpg`,
        memoria: 120,
        color: "negro y rojo",
        precio: 2000
    },
    {
        id: 7,
        producto: "Pedrive",
        cantidad: 1,
        marca: "Kingtong",
        img: `/imagenes/Kingston.jpg`,
        memoria: 500,
        color: "negro y rojo",
        precio: 3000
    },
    {
        id: 8,
        producto: "Pedrive",
        cantidad: 1,
        marca: "Kingtong",
        img: `/imagenes/Kingston.jpg`,
        memoria: 100,
        color: "negro y rojo",
        precio: 5000
    }

];

//RENDER 
mercaderias.forEach((producto) => {
    const div = document.createElement(`div`)
    div.classList.add(`producto`)
    div.innerHTML = `
        
        <h3>Pendrive</h3>
        <img src=${producto.img} alt=""> 
        <p>Marca: ${producto.marca}</p>
        <p>Memoria en GB: ${producto.memoria}</p>
        <p>Color: ${producto.color}</p>
        <p>Precio: ${producto.precio}</p>
        <button id="boton${producto.id}" class= "boton-agregar">Agregar<i= class "fas fa-shopping-cart"></i></button>
        `
    contenedorProductos.appendChild(div)
    const botones = document.getElementById(`boton${producto.id}`)

    botones.addEventListener(`click`, () => {
        agregarCarrito(producto.id)

    })
})

//Agregar al carrito
const agregarCarrito = (productoId) => {


    const item = mercaderias.find((producto) => producto.id === productoId)
    carrito.push(item)
    actuarlizarCarrito()
    console.log(carrito)
}




// Eliminar Carrito
const eliminarCarrito = (productoId) => {
    const item = carrito.find((producto) => producto.id === productoId)
    const indice = carrito.indexOf(item)
    actuarlizarCarrito()
    carrito.splice(indice, 1)
}

//Vaciar carrito
const vaciarCarrito = document.getElementById(`vaciarCarrito`)

vaciarCarrito.addEventListener(`click`, () => {
    carrito.length = 0
    actuarlizarCarrito()
})


// Actualizar carrito
const actuarlizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
            const div = document.createElement(`div`)
            div.classList.add(`productoEnCarrito`)
            div.innerHTML = `
        <h4>Producto: ${prod.producto}</h4>
        <p>Marca: ${prod.marca}</p>
        <p>Memoria: ${prod.memoria}</p>
        <p>Precio: ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad"> ${prod.cantidad}</span></p>
        
        <button onclick="eliminarCarrito(${prod.id})" class= "boton-eliminar"">eliminar</button>
                `
            contenedorCarrito.appendChild(div)
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })
        //Contador carrito
    contadorCarrito.innerHTML = carrito.length

    precioTotal.innerHTML = carrito.reduce((acc, prod) => acc + prod.precio, 0)

}


// MI MODAL 

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
        // modalContainer.classList.remove('modal-container-active')
    cerrarModal.click()
})

modal.addEventListener('click', (event) => {
    event.stopPropagation()
})



/*

const filtrar = () => {
    let precio = prompt(parseInt("Ingrese el precio minimo a pagar"))

    const van = mercaderias.filter((filtro) => filtro.precio < precio)

    van.forEach((item) => {
        let mostrar =
            `
  marca: ${item.marca}  
  memoria: ${item.memoria} 
  color: ${item.color}
  precio: ${item.precio}
  
  
  
  `;
        console.log(mostrar)
    })
}




let precio = prompt(Number("Ingrese la marca que desea buscar"))
const pume = mercaderias.find(encuentro => encuentro.precio == precio)
let resultado =
    `
    ${pume.marca}
    ${pume.memoria}
    ${pume.color}
    ${pume.precio}
    `;

console.log(resultado)
*/