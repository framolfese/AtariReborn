<?php
    DEFINE('DB_USERNAME', 'root');
    DEFINE('DB_PASSWORD', 'root');
    DEFINE('DB_HOST', 'localhost');
    DEFINE('DB_DATABASE', 'accounts');
    
    $email = $_POST['mail'];
    $password = md5($_POST['password']);
    $return_data = array();
    $name = null;

    $mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
  
    if ($mysqli->connect_error) {
        die('Connect Error ('.$mysqli->connect_errno.') '.$mysqli->connect_error);
    }
    
    $stmt = "SELECT * FROM users where email='$email' && password='$password'";
    $mysqli_result = $mysqli->query($stmt);
    $row = $mysqli_result->fetch_array(MYSQLI_NUM);
    
    if($mysqli_result->num_rows == 1) {
        $name = $row[0];
        $return_data['status'] = true;
        $return_data['usermail'] = $email;
        $return_data['username'] = $name;
    }
    else{
        $return_data['status'] = false;
    }
    $mysqli->close();
    echo json_encode($return_data);
?>