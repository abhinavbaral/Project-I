<?php
include 'db.php';

$songName = $_POST['songName'];
$url = $_POST['url'];
$img = $_POST['img'];

$sql = "INSERT INTO songs (songName, url, img) VALUES ('$songName', '$url', '$img')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
