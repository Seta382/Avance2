<?php
// guardar_encuesta.php — Recibe los datos de la encuesta (JSON) y los guarda en la BD
header('Content-Type: application/json');
require 'conexion.php';

$datos = json_decode(file_get_contents('php://input'), true);

$nombre    = trim($datos['nombre'] ?? '');
$direccion = trim($datos['direccion'] ?? '');
$puntaje   = intval($datos['puntaje'] ?? 0);

if ($nombre === '' || $direccion === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Nombre y dirección son obligatorios']);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "INSERT INTO encuestas (nombre, direccion, puntaje) VALUES (:nombre, :direccion, :puntaje)"
    );
    $stmt->execute([
        'nombre'    => $nombre,
        'direccion' => $direccion,
        'puntaje'   => $puntaje,
    ]);

    echo json_encode(['ok' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'No se pudo guardar la encuesta']);
}
