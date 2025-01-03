<?php
include 'config.php'; // Include database connection settings

// Get sender and receiver IDs from request
$sender_id = $_GET['sender_id'];
$receiver_id = $_GET['receiver_id'];

// Query to get chat history between sender and receiver
$query = "SELECT * FROM messages WHERE 
          (sender_id = ? AND receiver_id = ?) OR 
          (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC";

$stmt = $pdo->prepare($query);
$stmt->execute([$sender_id, $receiver_id, $receiver_id, $sender_id]);

$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($messages); // Return messages as JSON
?>
