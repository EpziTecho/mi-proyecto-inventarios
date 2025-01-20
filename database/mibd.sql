-- ------------------------------------------------------------------
-- 1) CREACIÓN DE LA BASE DE DATOS
-- ------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS MiBD;
USE MiBD;

-- ------------------------------------------------------------------
-- 2) TABLA: Rol
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Rol (
  idRol INT AUTO_INCREMENT PRIMARY KEY,
  nombreRol VARCHAR(50) NOT NULL,
  descripcionRol VARCHAR(100),
  activo TINYINT(1) DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdBy INT,
  updatedBy INT
);

-- ------------------------------------------------------------------
-- 3) TABLA: menu
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(100),
  activo TINYINT(1) DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdBy INT,
  updatedBy INT
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
  -- Las tablas de relación generalmente no incluyen auditoría
);

-- ------------------------------------------------------------------
-- 5) TABLA: Categoria
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Categoria (
  idCategoria INT AUTO_INCREMENT PRIMARY KEY,
  nombreCategoria VARCHAR(50) NOT NULL,
  descripcionCategoria VARCHAR(100),
  activo TINYINT(1) DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdBy INT,
  updatedBy INT
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
  correo VARCHAR(100),
  activo TINYINT(1) DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdBy INT,
  updatedBy INT
);

-- ------------------------------------------------------------------
-- 7) TABLA: Sucursal
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Sucursal (
  idSucursal INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  Direccion VARCHAR(100),
  Estado VARCHAR(20),
  tfno VARCHAR(20),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdBy INT,
  updatedBy INT
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
  fechaRegistro DATE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdBy INT,
  updatedBy INT
);

-- ------------------------------------------------------------------
-- 9) TABLA: Vendedor (actualizada con auditoría)
-- ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Vendedor (
  idVendedor INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  foto VARCHAR(255),
  dni VARCHAR(20),
  tfno VARCHAR(20),
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) UNIQUE,
  passwordHash VARCHAR(255) NOT NULL,
  passwordSalt VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastLogin DATETIME,
  createdBy INT,
  updatedBy INT,
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
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdBy INT,
  updatedBy INT,
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
  foto VARCHAR(255),
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
  fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
  fechaRetiro DATE,
  createdBy INT,
  updatedBy INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdBy INT,
  updatedBy INT,
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
CREATE TABLE IF NOT EXISTS RefreshToken (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tokenHash VARCHAR(255) NOT NULL,
  expiresAt DATETIME NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  vendedorId INT NOT NULL,
  CONSTRAINT fk_refresh_vendedor
    FOREIGN KEY (vendedorId) REFERENCES Vendedor(idVendedor)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- FIN DEL SCRIPT
