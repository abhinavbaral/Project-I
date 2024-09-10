<?php
include 'db.php';

$sql = "SELECT * FROM songs";
$result = $conn->query($sql);

$songs = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }
}
$conn->close();
echo json_encode($songs);
?>
