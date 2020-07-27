<?php
$servername = "localhost";
$username = "amphibis_donovan";
$password = "^38[!JVC#]-Y";
$dbname = "amphibis_donovan";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE `users` SET `status`='active' WHERE `status` = 'expired'";
$result = $conn->query($sql);

echo "All database animals are active";


$conn->close();
?>