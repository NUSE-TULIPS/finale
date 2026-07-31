<?php

$host = getenv('DB_HOST') ?: 'db';
$db   = getenv('DB_NAME') ?: 'todo';
$user = getenv('DB_USER') ?: 'todo_user';
$pass = getenv('DB_PASS') ?: 'todo_pass';
$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}