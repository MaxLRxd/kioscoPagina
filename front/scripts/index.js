const apiUrl = "http://localhost:8080/productos";
const container = document.querySelector(".container");

// Al cargar la página, traer todos los productos
window.addEventListener("DOMContentLoaded", traerProductos);

function traerProductos() {
  fetch(`${apiUrl}/todos`)
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener productos");
      return res.json();
    })
    .then((productos) => {
      container.innerHTML = ""; // limpio antes de renderizar
      productos.forEach((prod) => {
        const card = crearCardProducto(prod);
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Hubo un error", err);
      container.innerHTML = `<p class="resultado">No se pudieron cargar los productos</p>`;
    });
}

function crearCardProducto(producto) {
  const { nombre, cantidad, precio } = producto;

  // Contenedor principal
  const card = document.createElement("div");
  card.classList.add("card");

  // Imagen (placeholder)
  const img = document.createElement("div");
  img.classList.add("foto-placeholder");
  img.innerText = "📷";

  // Detalles
  const detalles = document.createElement("div");
  detalles.classList.add("detalles");

  const nombreEl = document.createElement("h3");
  nombreEl.textContent = nombre;

  const cantidadEl = document.createElement("p");
  cantidadEl.textContent = `Stock: ${cantidad}`;

  const precioEl = document.createElement("p");
  precioEl.textContent = `$${precio}`;

  detalles.appendChild(nombreEl);
  detalles.appendChild(cantidadEl);
  detalles.appendChild(precioEl);

  // Acciones
  const acciones = document.createElement("div");
  acciones.classList.add("acciones");

  const btnEditar = document.createElement("a");
  btnEditar.href = "modificar.html";
  btnEditar.classList.add("icono", "editar");
  btnEditar.innerHTML = "✏️";

  const btnEliminar = document.createElement("a");
  btnEliminar.href = "eliminar.html";
  btnEliminar.classList.add("icono", "eliminar");
  btnEliminar.innerHTML = "🗑️";

  acciones.appendChild(btnEditar);
  acciones.appendChild(btnEliminar);

  // Armo la card
  card.appendChild(img);
  card.appendChild(detalles);
  card.appendChild(acciones);

  return card;
}
