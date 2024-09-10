<?php
include 'db.php';

$id = $_POST['id'];
$songName = $_POST['songName'];
$url = $_POST['url'];
$img = $_POST['img'];

$sql = "UPDATE songs SET songName='$songName', url='$url', img='$img' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
