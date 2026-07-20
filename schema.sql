-- schema.sql — Crea la base de datos y la tabla para CasaSegura
-- Ejecutar una sola vez (por ejemplo, desde phpMyAdmin o HeidiSQL en Laragon)

CREATE DATABASE IF NOT EXISTS casa_segura
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE casa_segura;

CREATE TABLE IF NOT EXISTS encuestas (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(150) NOT NULL,
    direccion       VARCHAR(255) NOT NULL,
    puntaje         INT NOT NULL,
    fecha_creacion  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
