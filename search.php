<?php
include('db.php');
$row = null;
$searched = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $searched = true;
    $roll = trim($_POST['roll_no']);
    $result = mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll'");
    $row = mysqli_fetch_assoc($result);
}
?>
<!DOCTYPE html>
<html>
<head><title>Search Student</title></head>
<body>
<h2>Search Student by Roll No</h2>
<form method="POST">
  Roll No: <input type="text" name="roll_no" required>
  <button type="submit">Search</button>
</form>
<br>
<?php if ($searched): ?>
  <?php if ($row): ?>
    <table border="1" cellpadding="8">
      <tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Roll No</th><th>Contact</th></tr>
      <tr>
        <td><?= $row['id'] ?></td>
        <td><?= $row['first_name'] ?></td>
        <td><?= $row['last_name'] ?></td>
        <td><?= $row['roll_no'] ?></td>
        <td><?= $row['contact'] ?></td>
      </tr>
    </table>
  <?php else: ?>
    <p style="color:red">No student found with that Roll No!</p>
  <?php endif; ?>
<?php endif; ?>
<br>
<a href="index.php">Back to All Students</a>
</body>
</html>
