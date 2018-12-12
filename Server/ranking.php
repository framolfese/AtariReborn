<?php
    DEFINE('DB_USERNAME', 'root');
    DEFINE('DB_PASSWORD', 'root');
    DEFINE('DB_HOST', 'localhost');
    DEFINE('DB_DATABASE', 'accounts');
    
    $game = $_POST['game'];
    $return_data = array();

    $mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
  
    if ($mysqli->connect_error) {
      die('Connect Error ('.$mysqli->connect_errno.') '.$mysqli->connect_error);
    }
    
    if($game === "snake") $stmt = "SELECT * FROM snake_ranking WHERE 1 ORDER BY points DESC";
    else $stmt = "SELECT * FROM space_ranking WHERE 1 ORDER BY points DESC";
    
    $mysqli_result = $mysqli->query($stmt);
    $num_rows = $mysqli_result->num_rows;
    $idx = 0;

    while($idx != $num_rows){
        $row = $mysqli_result->fetch_array(MYSQLI_NUM);
        $elem = array();
        $elem['mail'] = $row[0];
        $elem['points'] = $row[1];
        $return_data[$idx] = $elem;
        $idx += 1;
    }
    
    $mysqli->close();
    echo json_encode($return_data);
?>