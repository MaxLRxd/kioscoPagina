package com.kiosco.app.Models;

import lombok.Data;

@Data
public class ProductoRequest {
    private String nombre;
    private int cantidad;
    private Double precio;
}
