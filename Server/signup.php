<?php
    DEFINE('DB_USERNAME', 'root');
    DEFINE('DB_PASSWORD', 'root');
    DEFINE('DB_HOST', 'localhost');
    DEFINE('DB_DATABASE', 'accounts');
    
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['mail'];
    $password = $_POST['password'];
    $return_data = array();

    $mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
  
    if ($mysqli->connect_error) {
        die('Connect Error ('.$mysqli->connect_errno.') '.$mysqli->connect_error);
    }
    
    $stmt = "SELECT * FROM users where email='$email'";
    $mysqli_result = $mysqli->query($stmt);
    
    if($mysqli_result->num_rows == 1) {
        $return_data['status'] = false;
        $return_data['usermail'] = $email;
        $return_data['errore'] = "Attenzione esiste già un account legato a questo indirizzo email.";
    }
    else{
        $stmt = "INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`) VALUES ('$fname', '$lname', '$email', '$password')";
        $mysqli_result = $mysqli->query($stmt);
        if($mysqli_result === FALSE){
            $return_data['status'] = false;
            $return_data['usermail'] = $email;
            $return_data['errore'] = "Attenzione c'è stato un errore nella registrazione, riprova.";
        }
        else{
            $return_data['status'] = true;
            $return_data['usermail'] = $email;
        }
    }

    $mysqli->close();
    echo json_encode($return_data);
?>