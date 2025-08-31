const apiUrl = `http://localhost:8080/productos`;
const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector(".resultado");

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarProducto);
});

function buscarProducto(event){
    event.preventDefault();
    console.log("Buscando...");

    const producto = document.querySelector("#nombre").value;
    if(producto == ""){
        mostrarError("No especificaste ningun producto");
        return;
    }

    obtenerProducto(producto);
}

function obtenerProducto(producto){
    fetch(`${apiUrl}/obtener?nombre=${producto}`).then((respuesta) => respuesta.json())
      .then((datos) => {
        limpiarHTML();

        if (datos.cod === "404") {
          mostrarError("Producto no encontrado");
          return;
        }

        mostrarProducto(datos);
      })
      .catch((error) => {
        console.error("Error en la consulta:", error);
      });
}

function mostrarProducto(datos){
  const { nombre, cantidad, precio } = datos;

  const nombreProducto = document.createElement("p");
  nombreProducto.innerHTML = `${nombre}`;
  nombreProducto.classList.add("nombre-resultado");

  const cantidadProducto = document.createElement("p");
  cantidadProducto.innerHTML = `Stock: ${cantidad}`;
  cantidadProducto.classList.add("cantidad-resultado");

  const precioProducto = document.createElement("p");
  precioProducto.innerHTML = `${precio}`;
  precioProducto.classList.add("precio-resultado");

  // Botones
  const botonActualizar = document.createElement("button");
  const botonEliminar = document.createElement("button");

  botonActualizar.innerHTML = "Modificar producto";
  botonEliminar.innerHTML = "Eliminar producto";

  botonActualizar.classList.add("boton", "modificar");
  botonEliminar.classList.add("boton", "eliminar");

  // Redirecciones
  botonActualizar.addEventListener("click", () => {
    window.location.href = "modificar.html";
  });

  botonEliminar.addEventListener("click", () => {
    window.location.href = "eliminar.html";
  });

  resultado.appendChild(nombreProducto);
  resultado.appendChild(cantidadProducto);
  resultado.appendChild(precioProducto);
  resultado.appendChild(botonActualizar);
  resultado.appendChild(botonEliminar);
}


function limpiarHTML() {
  resultado.innerHTML = "";
}

function mostrarError(mensaje) {
  const alerta = document.createElement("div");
  alerta.classList.add("alerta");

  alerta.innerHTML = `<strong class="font-bold"> Error! </strong> <span class="block"> ${mensaje} </span>`;
  container.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 5000);
}