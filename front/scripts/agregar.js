const apiUrl = `http://localhost:8080/productos`;
const formulario = document.querySelector("#form-agregar");

window.addEventListener("DOMContentLoaded", () => {
  formulario.addEventListener("submit", agregarProducto);
});

function agregarProducto(event){
    event.preventDefault();
    
    const nombre = document.querySelector("#nombre-agregar").value.trim();
    const cantidad = parseInt(
      document.querySelector("#cantidad-agregar").value
    );
    const precio = parseFloat(document.querySelector("#precio-agregar").value);

    if (!nombre || isNaN(cantidad) || isNaN(precio)) {
      alert("Completa todos los campos correctamente");
      return;
    }

    const producto = {nombre, cantidad, precio};

    fetch(`${apiUrl}/agregar`, {
        method: "POST",
        headers: {"Content-Type": "Application/json",},
        body: JSON.stringify(producto),})
        .then((res)=>{
            if(!res.ok){
                throw new Error("Error al agregar producto");
            }

            return res.text();
        })
        .then((mensaje)=>{
            alert(mensaje);
            formulario.reset();
        })
        .catch((error)=>{
            console.error("HUbo un error", error);
            alert("hubo un problema");
        })
}