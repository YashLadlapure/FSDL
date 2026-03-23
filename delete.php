<?php
include('db.php');
$roll = $_GET['roll'];
mysqli_query($conn, "DELETE FROM students WHERE roll_no='$roll'");
header("Location: index.php");
?>
