<?php
    DEFINE('DB_USERNAME', 'root');
    DEFINE('DB_PASSWORD', 'root');
    DEFINE('DB_HOST', 'localhost');
    DEFINE('DB_DATABASE', 'accounts');
    
    $points = $_POST['point'];
    $email = $_POST['mail'];
    $return_data = array();

    $mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
  
    if ($mysqli->connect_error) {
        die('Connect Error ('.$mysqli->connect_errno.') '.$mysqli->connect_error);
    }
    
    $stmt1 = "SELECT * FROM snake_ranking where email='$email'";
    $mysqli_result1 = $mysqli->query($stmt1);

    if($mysqli_result1->num_rows == 1){
        if($mysqli_result1->fetch_array(MYSQLI_NUM)[1] < $points) {
            $stmt2 = "UPDATE snake_ranking SET points = $points where email = '$email'";
            $mysqli_result2 = $mysqli->query($stmt2);
            if($mysqli_result2 === TRUE) $return_data["status"] = true;
            else {
                $return_data["status"] = false;
            }
        }
        else $return_data["status"] = true;
    }
    else{
        $stmt3 = "INSERT INTO `snake_ranking` (`email`, `points`) VALUES ('$email', '$points')";
        $mysqli_result3 = $mysqli->query($stmt3);
        if($mysqli_result3 === FALSE) {
            $return_data["status"] = false;
        }
        else $return_data["status"] = true;
    }
    $mysqli->close();
    echo json_encode($return_data);
?>