<?php
// Include the database connection
include('config.php');

$data = json_decode(file_get_contents("php://input"), true);
$message = $data['message'];
$receiver_username = $data['receiver_username'];

// Fetch the sender_username from the latest job post in the jobs table
$sender_username_query = "SELECT username FROM jobs ORDER BY created_at DESC LIMIT 1";
$result = $conn->query($sender_username_query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $sender_username = $row['username'];
} else {
    echo json_encode(['success' => false, 'error' => 'No sender_username found']);
    $conn->close();
    exit;
}

// Insert the message into the database with sender_username and receiver_username
$sql = "INSERT INTO messages (message_text, sender_username, receiver_username) VALUES ('$message', '$sender_username', '$receiver_username')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>
