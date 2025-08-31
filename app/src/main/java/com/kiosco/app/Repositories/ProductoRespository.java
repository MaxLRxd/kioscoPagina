package com.kiosco.app.Repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kiosco.app.Models.Producto;

public interface ProductoRespository extends JpaRepository<Producto, Integer>{
    Optional<Producto> findByNombre(String nombre);
    Optional<Producto> findByPrecio(double precio);
    Optional<Producto> findByCantidad(int cantidad);
    boolean existsByNombre(String nombre);
}
