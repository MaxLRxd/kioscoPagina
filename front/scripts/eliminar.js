const apiUrl = "http://localhost:8080/productos";

const formEliminar = document.querySelector("#form-eliminar");

document.addEventListener("DOMContentLoaded", () => {
  formEliminar.addEventListener("submit", eliminarProducto);
});

function eliminarProducto(event) {
  event.preventDefault();

  const nombre = document.querySelector("#nombre-eliminar").value.trim();
  if (!nombre) {
    alert("Debes ingresar un nombre de producto");
    return;
  }

  fetch(`${apiUrl}/eliminar?nombre=${encodeURIComponent(nombre)}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Producto no encontrado");
      return res.json();
    })
    .then((data) => {
      if (data) {
        alert("Producto eliminado correctamente");
      } else {
        alert("No se pudo eliminar el producto");
      }
      formEliminar.reset();
    })
    .catch((err) => {
      console.error(err);
      alert("Error al eliminar el producto");
    });
}
