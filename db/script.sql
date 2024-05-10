CREATE DATABASE servir;

-- Creación de la tabla Departamento
CREATE TABLE Departamento (
    codigo VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Creación de la tabla Empleado
CREATE TABLE Empleado (
    codigo VARCHAR(255) PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    fechaNacimiento DATE,
    departamentoCodigo VARCHAR(255),
    FOREIGN KEY (DepartamentoCodigo) REFERENCES Departamento(Codigo)
);
