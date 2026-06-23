<?php
include('db.php');
$roll = $_GET['roll'] ?? $_POST['roll'];
$msg = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contact = trim($_POST['contact']);
    if (!preg_match('/^[0-9]{10}$/', $contact)) {
        $msg = "<p style='color:red'>Invalid contact! Must be 10 digits.</p>";
    } else {
        mysqli_query($conn, "UPDATE students SET contact='$contact' WHERE roll_no='$roll'");
        $msg = "<p style='color:green'>Updated successfully!</p>";
    }
}

$row = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll'"));
?>
<!DOCTYPE html>
<html>
<head><title>Update Student</title></head>
<body>
<h2>Update Student - <?= $row['first_name'] ?></h2>
<?= $msg ?>
<form method="POST">
  <input type="hidden" name="roll" value="<?= $roll ?>">
  Contact: <input type="text" name="contact" value="<?= $row['contact'] ?>" required><br><br>
  <button type="submit">Update Contact</button>
</form>
<br>
<a href="index.php">Back to All Students</a>
</body>
</html>
