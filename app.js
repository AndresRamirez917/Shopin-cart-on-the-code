document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

// VARIABLES QUE CONTIENEN LOS ELEMENTOS HTML
const fragment = document.createDocumentFragment();
const shopContent = document.getElementById("shop-content");
const btnComprar = document.querySelectorAll(".boton-comprar");
const btncarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const botonEliminar = document.querySelectorAll(".boton-eliminar");
const cantidadCarrito = document.getElementById("cantidadCarrito");
let carrito = [];

// PROMESA ASYNCRONA PARA CARGAR LOS DATOS QUE SE ENCUENTRAN EN EL JSON
const fetchData = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    console.log(data);
    pintarProductos(data);
  } catch (error) {
    console.log(error);
  }
};
function Comprar() {
  console.log("click");
}

// FUNCIÓN QUE DIBUJA LOS PRODUCTOS DEL JSON EN LA PAGINA

// LA DATA QUE RECIBE SE DECLARÓ DENTRO DE LA FUNCIÓN FETCHDATA
const pintarProductos = (data) => {
  // RECORRO EL ARRAY DE LOS ELEMENTO DEL API.JSON
  data.forEach((element) => {
    // POR CADA ELEMENTO CREO UN DIV CON SUS RESPECTIVOS ATRIBUTOS
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${element.thumbnailUrl}">
        <h3 class="titulo">${element.title}</h3>
        <h2>${element.precio}</h2>
        <button class="boton-comprar" id="botonComprar">Comprar</button>
        `;

    /* shopContent es la variable que contiene el div padre en el index.html, 
    y es donde se van a dibujar las cards, con append le agrego lo que tiene la variable content
    que es la que crea el template para cada una de las cards
    */
    shopContent.append(content);

    // agrego los elementos al array carrito, pero para que funcionara lo hice de esta manera
    content.querySelectorAll(".boton-comprar").forEach((btn) => {
      btn.addEventListener("click", () => {
        // SOME DEVUELVE UN BOOLEAN
        const idActual = carrito.some(
          (productoActual) => productoActual.id === element.id
        );
        //ASI LO HICE YO PERO PARECE QUE ASI NO FUNCIONA DE FORMA CORRECTA
        // COMPARO EL BOOLEAN QUE DEVUELVE SOME
        if (idActual) {
          carrito.forEach((prod) => {
            if (prod.id === element.id) {
              prod.cantidad++;
            }
          });
        } else {
          carrito.push({
            id: element.id,
            img: element.thumbnailUrl,
            nombre: element.title,
            cantidad: element.cantidad,
            precio: element.precio,
          });
        }
        mostrarCarrito();
        contadorProductos();

        //ESTA ES LA FORMA DEL PROFESOR LA QUE FUNCIONA
        /*
        if(idActual){
          carrito.map((prod)=>{
            if(prod.id === element.id){
              prod.cantidad++
            }
          })
        }else{
          carrito.push({
            id: element.id,
            img: element.thumbnailUrl,
            nombre: element.title,
            cantidad: element.cantidad,
            precio: element.precio,
          });
          console.log(carrito);
        }
          */
      });
    });
  });
};

// MODAL
// CREACIÓN DEL MODAL DONDE SE VISUALIZARAN LOS ELEMTNOS DEL CARRITO
// AL MODAL SE LE DAN LOS ESTILOS EN STYLES.CSS

// CREACIÓN TÍTULO

const pintarCarrito = () => {
  modalContainer.innerHTML = " ";
  modalContainer.style.display = "flex";
  let modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
 <h1 class="modal-header-title">Carrito</h1>
 `;
  // AGREGAR AL CONTENEDOR EL TÍTULO
  modalContainer.append(modalHeader);

  // CREACIÓN BOTÓN QUE CIERRA EL MODAL

  const modalButton = document.createElement("h1");
  modalButton.innerText = "X";
  modalButton.className = "modal-header-button";
  // AGREGAR AL CONTENEDOR EL BOTÓN
  modalHeader.append(modalButton);

  // OCULTO EL MODAL
  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  // MOSTRAR EL CONTENIDO DEL CARRITO DENTRO DEL MODAL

  carrito.forEach((element) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${element.img}">
    <h3 class="titulo">${element.nombre}</h3>
    <h2>Cantidad ${element.cantidad}</h2>
    <h2>$ ${element.cantidad * element.precio}</h2>
    `;

    // POR CADA PRODUCTO CREA UN BOTÓN DE ELIMINAR, SE IMPLEMENTÓ DE FORMA DIFERENTE A COMO SE HIZO
    // EN LA FUNCIÓN PINTARPRODUCTOS
    let botonEliminar = document.createElement("button");
    botonEliminar.className = "boton-eliminar";
    botonEliminar.innerText = "Eliminar";
    carritoContent.append(botonEliminar);
    botonEliminar.addEventListener("click", () => {
      eliminarProducto(element.id);
    });

    //AGREGAR AL CONTENEDOR EL CONTENIDO DEL CARRITO
    modalContainer.append(carritoContent);
    console.log(carritoContent);
  });

  // OPERACIÓN PARA CALCULAR EL VALOR DE LOS ARTÍCULOS DEL CARRITO

  const total = carrito.reduce((acc, el) => acc + el.cantidad * el.precio, 0);
  let sumaTotal = document.createElement("h1");
  sumaTotal.className = "suma-total";
  sumaTotal.innerHTML = "Total: " + `$ ${total}`;

  // AGREGAR AL CONTENEDOR EL VALOR DE LA SUMA
  modalContainer.append(sumaTotal);
};
btncarrito.addEventListener("click", pintarCarrito);

// FUNCIÓN PARA ELIMINAR PRODUCTOS DEL CARRITO

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);
  console.log(foundId);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  pintarCarrito();
  contadorProductos();

  if (carrito.length === 0) {
    console.log("vacío");
    modalContainer.style.display = "none";
  }
};

// FUNCIÓN PARA OCULTAR EL CARRITO DESPUÉS DE ABIERTO

const mostrarCarrito = () => {
  btncarrito.addEventListener("dblclick", () => {
    console.log("doble click");
    modalContainer.style.display = "none";
  });
};

let to = carrito.forEach((pro = pro.cantidad + pro.cantidad) => {
  console.log(pro);
});

// FUNCIÓN PARA MOSTRAR EL NÚMERO DE PRODUCTOS DENTRO DEL CARRITO

const contadorProductos = () => {
  cantidadCarrito.style.display = "block";
  cantidadCarrito.innerText = carrito.length;
  if (cantidadCarrito.innerText == 0) {
    cantidadCarrito.style.display = "none";
  }
};
