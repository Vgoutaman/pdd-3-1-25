<?php
require 'config.php';
session_start(); // Start the session

// Ensure proper headers
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow all origins (adjust for production)
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow only POST requests

// Check if a session exists
if (!isset($_SESSION['user_id'])) { // Adjust key as per your session variables
    echo json_encode(array("status" => "error", "message" => "No active session found"));
    exit();
}

// Destroy the session
session_unset();    // Clear session variables
session_destroy();  // Destroy session data

// Optional: Clear session cookie for security
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Respond with success
echo json_encode(array("status" => "success", "message" => "Logged out successfully"));
exit();
?>
