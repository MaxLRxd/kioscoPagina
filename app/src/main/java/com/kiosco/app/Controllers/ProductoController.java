package com.kiosco.app.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kiosco.app.Models.ProductoRequest;
import com.kiosco.app.Models.ProductoResponse;
import com.kiosco.app.Services.ProductoService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/productos")
@RequiredArgsConstructor
public class ProductoController {
    private final ProductoService service;

    @GetMapping("/obtener")
    public ResponseEntity<ProductoResponse> obtenerProducto(@RequestParam String nombre){
        try {
            ProductoResponse producto = service.obtenerProducto(nombre);
            return ResponseEntity.ok(producto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/agregar")
    public ResponseEntity<String> crearProducto(@RequestBody ProductoRequest request){
        boolean creado = service.agregarProducto(request);

        if (creado) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Creado con exito");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El producto ya existe");
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ProductoResponse> actualizarProducto(@RequestBody ProductoRequest request){
        try {
            ProductoResponse actualizado = service.actualizarProductoPorNombre(request);
            return ResponseEntity.ok(actualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/eliminar")
    public ResponseEntity<Boolean> eliminarProducto(@RequestParam String nombre){
        Boolean respuesta = service.eliminarProducto(nombre);
        if (!respuesta) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
        return ResponseEntity.ok(true);
    }
}
