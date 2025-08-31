package com.kiosco.app.Models;

import lombok.Data;

@Data
public class ProductoResponse {
    private String nombre;
    private int cantidad;
    private Double precio;
    // Constructor que recibe la entidad
    public ProductoResponse(Producto producto) {
        this.nombre = producto.getNombre();
        this.cantidad = producto.getCantidad();
        this.precio = producto.getPrecio();
    }
}
