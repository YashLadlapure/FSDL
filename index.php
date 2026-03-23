<?php
include('db.php');
$result = mysqli_query($conn, "SELECT * FROM students");
?>
<!DOCTYPE html>
<html>
<head><title>All Students</title></head>
<body>
<h2>All Student Records</h2>
<a href="insert.php">+ Add New Student</a>
<br><br>
<table border="1" cellpadding="8">
  <tr>
    <th>ID</th><th>First Name</th><th>Last Name</th>
    <th>Roll No</th><th>Contact</th><th>Actions</th>
  </tr>
  <?php while ($row = mysqli_fetch_assoc($result)): ?>
  <tr>
    <td><?= $row['id'] ?></td>
    <td><?= $row['first_name'] ?></td>
    <td><?= $row['last_name'] ?></td>
    <td><?= $row['roll_no'] ?></td>
    <td><?= $row['contact'] ?></td>
    <td>
      <a href="update.php?roll=<?= $row['roll_no'] ?>">Edit</a> |
      <a href="delete.php?roll=<?= $row['roll_no'] ?>"
         onclick="return confirm('Are you sure?')">Delete</a>
    </td>
  </tr>
  <?php endwhile; ?>
</table>
<br>
<a href="search.php">Search Student</a>
</body>
</html>
