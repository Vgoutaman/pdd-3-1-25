<?php
// Include the database connection
include('config.php');

// Fetch distinct receiver usernames
$sql = "SELECT DISTINCT receiver_username FROM messages ORDER BY receiver_username ASC";

$result = $conn->query($sql);

$chats = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $receiver_username = $row['receiver_username'];

        // Fetch the latest message for the current receiver_username
        $message_sql = "
            SELECT message_text, created_at, sender_username, receiver_username
            FROM messages
            WHERE receiver_username = '$receiver_username'
            ORDER BY created_at DESC LIMIT 1
        ";

        $message_result = $conn->query($message_sql);
        if ($message_result->num_rows > 0) {
            $message_row = $message_result->fetch_assoc();
            $last_message = $message_row['message_text'];
            $timestamp = date("h:i A", strtotime($message_row['created_at']));

            // Fetch the contact's profile image (use a table or default image for simplicity)
            $profile_image = 'https://via.placeholder.com/50'; // Replace with actual logic to fetch image

            $chats[] = [
                'id' => $receiver_username,
                'name' => $receiver_username, // Use receiver_username as name
                'lastMessage' => $last_message,
                'profileImage' => $profile_image,
                'timestamp' => $timestamp,
            ];
        }
    }
    echo json_encode(['chats' => $chats]);
} else {
    echo json_encode(['chats' => []]);
}

$conn->close();
?>
