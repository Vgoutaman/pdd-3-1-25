<?php
header('Content-Type: application/json');

// Include the database connection
include 'config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the raw input data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Prepare and sanitize input data
$jobTitle = $conn->real_escape_string($data['Job Title']);

// SQL query to fetch the job_id from the jobs table
$sql = "SELECT job_id FROM jobs WHERE `Job Title` LIKE '%$jobTitle%'";

// Execute the query
$result = $conn->query($sql);

// Check if a job_id is found
if ($result->num_rows > 0) {
    $job = $result->fetch_assoc();
    echo json_encode(['status' => 'success', 'job_id' => $job['job_id']]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Job not found']);
}

$conn->close();
?>
