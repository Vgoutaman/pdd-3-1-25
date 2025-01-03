<?php
header('Content-Type: application/json');

// Include the config file for database connection
include 'config.php';

// Start the session to get the logged-in user information
session_start();

// Check if user is logged in
if (!isset($_SESSION['userId'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

// Get the logged-in user's ID from the session
$user_id = $_SESSION['userId'];

// Get the raw input data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Log the incoming data for debugging
error_log("Incoming Data: " . json_encode($data));

if (!$data) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

// Fetch the Name (username) from the users table
$sql_user = "SELECT username FROM users WHERE id = ?";
$stmt_user = $conn->prepare($sql_user);
$stmt_user->bind_param("i", $user_id);
$stmt_user->execute();
$result_user = $stmt_user->get_result();

if ($result_user && $result_user->num_rows > 0) {
    $user = $result_user->fetch_assoc();
    $name = $user['username']; // Fetch the username as Name
} else {
    echo json_encode(['error' => 'User not found']);
    exit;
}

$stmt_user->close();

// Prepare and sanitize input data
$location = $conn->real_escape_string($data['location']);
$job_title = $conn->real_escape_string($data['job_title']);
$portfolio = $conn->real_escape_string($data['portfolio']);
$skills = $conn->real_escape_string(json_encode($data['skills'])); // Store skills as JSON
$experience = $conn->real_escape_string($data['experience']);
$job_history = $conn->real_escape_string($data['job_history']);
$social_media = $conn->real_escape_string($data['social_media']);

// Insert or update profile in the candidateprofile table, including the Name
$sql = "INSERT INTO candidateprofile (user_id, Name, Location, `Job Title`, Portfolio, Skills, Experience, `Job History`, `Social Media`)
        VALUES ('$user_id', '$name', '$location', '$job_title', '$portfolio', '$skills', '$experience', '$job_history', '$social_media')
        ON DUPLICATE KEY UPDATE 
        Location='$location', `Job Title`='$job_title', Portfolio='$portfolio', Skills='$skills', Experience='$experience', 
        `Job History`='$job_history', `Social Media`='$social_media'";

// Log the query
error_log("SQL Query: " . $sql);

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => 'Profile saved successfully']);
} else {
    error_log('MySQL Error: ' . $conn->error);  // Log MySQL error
    echo json_encode(['error' => 'Error saving profile: ' . $conn->error]);
}

$conn->close();
?>
