<?php
include "sql_config.php";
/* require "sql_config.php"; */

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    send_passaro_data();
}

function send_passaro_data(){
    global $mysqli;

    $img_dir = "files_penelope/img_passaro/";
    $passaro_list = array();
    
    $passaro_query = mysqli_query($mysqli, "SELECT 
        passaro_id,
        nome_popular,
        nome_binomial,
        estado_conservacao,
        passaro_descricao,
        envergadura_cm
        FROM passaro"
    );

    if (!$passaro_query) {
        die(json_encode(array("error" => "Database query failed: " . $mysqli->error)));
    }

    while($passaro_row = $passaro_query->fetch_assoc()) {
        $passaro_id = $passaro_row["passaro_id"];
        $nome_popular = $passaro_row["nome_popular"];
        $nome_binomial = $passaro_row["nome_binomial"];
        $estado_conservacao = $passaro_row["estado_conservacao"];
        $passaro_descricao = $passaro_row["passaro_descricao"];
        $envergadura_cm = $passaro_row["envergadura_cm"];

        $img_passaro_query = mysqli_query($mysqli, "SELECT
            img_passaro_id, img_passaro_filepath FROM img_passaro WHERE passaro_id = $passaro_id AND img_passaro_order = 1"
        );
        
        if (!$img_passaro_query) {
            continue;
        }
        
        $img_passaro_row = $img_passaro_query->fetch_assoc();
        if ($img_passaro_row === null) {
            continue;
        }
        
        $img_passaro_id = $img_passaro_row["img_passaro_id"];
        $img_passaro_filepath = $img_passaro_row["img_passaro_filepath"];

        $img_preview_query = mysqli_query($mysqli, "SELECT
            img_preview_filepath FROM img_passaro_preview WHERE img_passaro_id = $img_passaro_id"
        );
        
        $img_preview_filepath = "";
        if ($img_preview_query) {
            $img_preview_row = $img_preview_query->fetch_assoc();
            $img_preview_filepath = $img_preview_row["img_preview_filepath"] ?? "";
        }

        $passaro = array(
            "passaro_id" => $passaro_id,
            "nome_popular" => $nome_popular,
            "nome_binomial" => $nome_binomial,
            "estado_conservacao" => $estado_conservacao,
            "passaro_descricao" => $passaro_descricao,
            "envergadura_cm" => $envergadura_cm,
            "img_passaro_url" => $img_dir . $img_passaro_filepath,
            "img_passaro_preview_url" => $img_dir . $img_preview_filepath
        );
        $passaro_list[] = $passaro;
    }

    $response = array("passaro" => $passaro_list);
    echo json_encode($response);
}

?>
