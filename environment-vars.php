<?PHP
    $data = "{ MTH40_API_HOST: '".$_ENV["MTH40_API_HOST"]."', MTH40_API_PORT: '".$_ENV["MTH40_API_PORT"]."'}";
    header('Content-Type: application/json');
    echo json_encode($data);
?>