-- ------------------------------------------------------------------
-- 1) CREACIÓN DE LA BASE DE DATOS (opcional si ya tienes una creada)
-- ------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS MiBD;
USE MiBD;

-- ------------------------------------------------------------------
-- 2) TABLA: Rol
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Rol (
  idRol INT AUTO_INCREMENT PRIMARY KEY,
  nombreRol VARCHAR(50) NOT NULL,
  descripcionRol VARCHAR(100)
);

-- ------------------------------------------------------------------
-- 3) TABLA: menu
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(100)
);

-- ------------------------------------------------------------------
-- 4) TABLA: Rol_menu (relación N:M entre Rol y menu)
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Rol_menu (
  idRol INT NOT NULL,
  idmenu INT NOT NULL,
  PRIMARY KEY (idRol, idmenu),
  CONSTRAINT fk_rolmenu_rol
    FOREIGN KEY (idRol) REFERENCES Rol(idRol)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_rolmenu_menu
    FOREIGN KEY (idmenu) REFERENCES menu(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- ------------------------------------------------------------------
-- 5) TABLA: Categoria
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Categoria (
  idCategoria INT AUTO_INCREMENT PRIMARY KEY,
  nombreCategoria VARCHAR(50) NOT NULL,
  descripcionCategoria VARCHAR(100)
);

-- ------------------------------------------------------------------
-- 6) TABLA: Proveedor
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Proveedor (
  idProveedor INT AUTO_INCREMENT PRIMARY KEY,
  nombreProveedor VARCHAR(100) NOT NULL,
  ruc VARCHAR(20),
  descripcionProveedor VARCHAR(255),
  tfno VARCHAR(20),
  correo VARCHAR(100)
);

-- ------------------------------------------------------------------
-- 7) TABLA: Sucursal
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Sucursal (
  idSucursal INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  Direccion VARCHAR(100),
  Estado VARCHAR(20),
  tfno VARCHAR(20)
);

-- ------------------------------------------------------------------
-- 8) TABLA: Cliente
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Cliente (
  idCliente INT AUTO_INCREMENT PRIMARY KEY,
  documento VARCHAR(20),
  nombreCliente VARCHAR(100) NOT NULL,
  fechaNacimiento DATE,
  tfno VARCHAR(20),
  fechaRegistro DATE
);

-- ------------------------------------------------------------------
-- 9) TABLA: Vendedor
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Vendedor (
  idVendedor INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  foto VARCHAR(255),
  dni VARCHAR(20),
  tfno VARCHAR(20),
  idRol INT NOT NULL,
  CONSTRAINT fk_vendedor_rol
    FOREIGN KEY (idRol) REFERENCES Rol(idRol)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- ------------------------------------------------------------------
-- 10) TABLA: Venta
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Venta (
  idVenta INT AUTO_INCREMENT PRIMARY KEY,
  idCliente INT NOT NULL,
  idVendedor INT NOT NULL,
  idSucursal INT NOT NULL,
  tipoPago VARCHAR(50),
  fecha DATE,
  igv DECIMAL(10,2),
  subTotal DECIMAL(10,2),
  montoTotal DECIMAL(10,2),
  CONSTRAINT fk_venta_cliente
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_venta_vendedor
    FOREIGN KEY (idVendedor) REFERENCES Vendedor(idVendedor)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_venta_sucursal
    FOREIGN KEY (idSucursal) REFERENCES Sucursal(idSucursal)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- ------------------------------------------------------------------
-- 11) TABLA: Producto
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Producto (
  idProducto INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  codigoProducto VARCHAR(50),
  descripcion VARCHAR(255),
  notas VARCHAR(255),
  stock INT,
  idCategoria INT NOT NULL,
  marca VARCHAR(50),
  idProveedor INT NOT NULL,
  precioCompra DECIMAL(10,2),
  precioVenta DECIMAL(10,2),
  cantidadMedida DECIMAL(10,2),
  unidadMedida VARCHAR(20),
  fechaVencimiento DATE,
  fechaRegistro DATE,
  fechaRetiro DATE,
  CONSTRAINT fk_producto_categoria
    FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_producto_proveedor
    FOREIGN KEY (idProveedor) REFERENCES Proveedor(idProveedor)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- ------------------------------------------------------------------
-- 12) TABLA: detalle_venta
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS detalle_venta (
  idVenta INT NOT NULL,
  idProducto INT NOT NULL,
  cantidad INT NOT NULL,
  descuento DECIMAL(10,2),
  PRIMARY KEY (idVenta, idProducto),
  CONSTRAINT fk_detalle_venta_venta
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_detalle_venta_producto
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- FIN DEL SCRIPT
