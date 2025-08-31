const apiUrl = `http://localhost:8080/productos`;
const formulario = document.querySelector("#form-modificar");

window.addEventListener("DOMContentLoaded", () => {
  formulario.addEventListener("submit", modificarProducto);
});

function modificarProducto(event) {
  event.preventDefault();

  const nombre = document.querySelector("#nombre-modificar").value.trim();
  const cantidad = parseInt(document.querySelector("#cantidad-modificar").value);
  const precio = parseFloat(document.querySelector("#precio-modificar").value);

  if (!nombre || isNaN(cantidad) || isNaN(precio)) {
    alert("Completa todos los campos correctamente");
    return;
  }

  const producto = { nombre, cantidad, precio };

  fetch(`${apiUrl}/actualizar`, {
    method: "PUT",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(producto),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al modificar producto");
      }

      return res.text();
    })
    .then((mensaje) => {
      alert(mensaje);
      formulario.reset();
    })
    .catch((error) => {
      console.error("HUbo un error", error);
      alert("hubo un problema");
    });
}
