/*const nombres = [
  { nombre: "Harina", precio: 50 },
  { nombre: "Arroz", precio: 150 },
  { nombre: "Pan", precio: 80 },
  { nombre: "Leche", precio: 250 },
  { nombre: "Mantequilla", precio: 100 },
];

let carrito = [];
let seleccion = prompt(
  "Hola, desea comprar alguno de nuestros Productos, si/no"
);
while (seleccion != "si" && seleccion != "no") {
  alert("Por favor elija si/no");
  seleccion = prompt("Hola, desea comprar alguno de nuestros nombres, si/no");
}
if (seleccion == "si") {
  alert("Esta es nuestra lista de Productos: ");
  //nombres.forEach((nombre) =>{
    //    console.log(nombre);
    //})
    //
  let listanombres = nombres.map(
    (producto) => producto.nombre + " " + "$" + producto.precio
  );
  alert(listanombres.join(" - "));
}

while (seleccion !== "no") {
  let nombre = prompt("Agrega productos a tu carrito");
  let precio = 0;
  if (
    nombre == "Harina" ||
    nombre == "Arroz" ||
    nombre == "Pan" ||
    nombre == "Leche" ||
    nombre == "Mantequilla"
  ) {
    switch (nombre) {
      case "Harina":
        precio = 50;
        break;
      case "Arroz":
        precio = 150;
        break;
      case "Pan":
        precio = 80;
        break;
      case "Leche":
        precio = 250;
        break;
      case "Mantequilla":
        precio = 100;
        break;
      default:
        break;
    }
    let cantidad = parseInt(
      prompt("Cuántas unidades del producto desea llevar? ")
    );
    carrito.push({ nombre, cantidad, precio });
    console.log(carrito);
  } else {
    alert("El producto no existe");
  }
  seleccion = prompt("Desea seguir comprando si/no? ");
  if (seleccion == "n") {
    alert("Gracias por su compra, hasta pronto!");
    let suCarrito = carrito.map(
      (nombresEnCarrito) =>
        " Producto " +
        nombresEnCarrito.nombre +
        " Cantidad " +
        nombresEnCarrito.cantidad +
        " Valor Total " +
        nombresEnCarrito.precio * nombresEnCarrito.cantidad
    );
    alert(suCarrito);
    break;
  }
}
let sumTotal;
let precioTotal = carrito.reduce((sum, producto) => {
  sumTotal = sum + producto.cantidad * producto.precio;
  return sumTotal;
}, 0);

alert("El valor total de tu compra es: " + precioTotal);
*/