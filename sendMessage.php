<?php
include 'config.php'; // Include database connection settings

// Get data from request (JSON body)
$data = json_decode(file_get_contents('php://input'), true);

$sender_id = $data['sender_id'];
$receiver_id = $data['receiver_id'];
$message = $data['message'];

// Query to insert the new message into the database
$query = "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($query);

if ($stmt->execute([$sender_id, $receiver_id, $message])) {
    echo json_encode(['success' => true, 'message' => 'Message sent']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send message']);
}
?>
