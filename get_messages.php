<?php
// Include the database connection
include('config.php');

// Fetch all messages
$sql = "SELECT message_text, created_at, receiver_username, sender_username FROM messages ORDER BY created_at ASC";
$result = $conn->query($sql);

$messages = [];

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $messages[] = [
            'sender' => $row['sender_username'], // Fetch sender username
            'receiver' => $row['receiver_username'], // Fetch receiver username
            'text' => $row['message_text'],
            'timestamp' => date("H:i", strtotime($row['created_at'])),
            'date' => date("Y-m-d", strtotime($row['created_at'])) == date("Y-m-d") ? 'Today' : 'Yesterday',
        ];
    }
    echo json_encode(['messages' => $messages]);
} else {
    echo json_encode(['messages' => []]);
}

$conn->close();
?>
