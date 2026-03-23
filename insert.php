<?php
include('db.php');
$msg = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname   = trim($_POST['first_name']);
    $lname   = trim($_POST['last_name']);
    $roll    = trim($_POST['roll_no']);
    $pass    = $_POST['password'];
    $cpass   = $_POST['confirm_password'];
    $contact = trim($_POST['contact']);

    if (empty($fname) || empty($lname) || empty($roll)) {
        $msg = "All fields are required!";
    } elseif ($pass !== $cpass) {
        $msg = "Passwords do not match!";
    } elseif (!preg_match('/^[0-9]{10}$/', $contact)) {
        $msg = "Contact must be 10 digits!";
    } else {
        $hashed = md5($pass);
        $sql = "INSERT INTO students (first_name, last_name, roll_no, password, contact)
                VALUES ('$fname', '$lname', '$roll', '$hashed', '$contact')";
        if (mysqli_query($conn, $sql)) {
            $msg = "Student inserted successfully!";
        } else {
            $msg = "Error: " . mysqli_error($conn);
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Add Student</title></head>
<body>
<h2>Add Student</h2>
<p style="color:green"><?= $msg ?></p>
<form method="POST">
  First Name: <input type="text" name="first_name" required><br><br>
  Last Name:  <input type="text" name="last_name" required><br><br>
  Roll No:    <input type="text" name="roll_no" required><br><br>
  Password:   <input type="password" name="password" required><br><br>
  Confirm Password: <input type="password" name="confirm_password" required><br><br>
  Contact:    <input type="text" name="contact" required><br><br>
  <button type="submit">Insert Student</button>
</form>
<br>
<a href="index.php">View All Students</a>
</body>
</html>
