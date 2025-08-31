package com.kiosco.app.Services;

import org.springframework.stereotype.Service;

import com.kiosco.app.Models.Producto;
import com.kiosco.app.Models.ProductoRequest;
import com.kiosco.app.Models.ProductoResponse;
import com.kiosco.app.Repositories.ProductoRespository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoService {
    private final ProductoRespository repositorio;

    //CREATE
    public boolean agregarProducto(ProductoRequest request){
        if (repositorio.existsByNombre(request.getNombre())) {
            return false;
        }

        Producto producto = new Producto();
        producto.setNombre(request.getNombre());
        producto.setCantidad(request.getCantidad());
        producto.setPrecio(request.getPrecio());

        repositorio.save(producto);
        return true;
    }

    //READ
    public ProductoResponse obtenerProducto(String nombre){
        Producto producto = repositorio.findByNombre(nombre)
                            .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
        return new ProductoResponse(producto);
    }

    //UPDATE
    public ProductoResponse actualizarProductoPorNombre(ProductoRequest request) {
        Producto producto = repositorio.findByNombre(request.getNombre())
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        producto.setCantidad(request.getCantidad());
        producto.setPrecio(request.getPrecio());

        Producto actualizado = repositorio.save(producto);
        return new ProductoResponse(actualizado);
    }

    //DELETE
    public boolean eliminarProducto(String nombre){
        Producto producto = repositorio.findByNombre(nombre)
                            .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
        repositorio.delete(producto);
        return true;
    }
}
