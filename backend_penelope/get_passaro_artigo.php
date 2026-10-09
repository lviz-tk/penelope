<?php
include "sql_config.php";
/* require "sql_config.php"; */

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $passaro_id = $_GET["passaro_id"];
    send_artigo_data($passaro_id);
}

function send_artigo_data($passaro_id){
    global $mysqli;

    $img_dir = "files_penelope/img_passaro/";
    $canto_dir = "files_penelope/canto/";
    $img_passaro = array();

    $passaro_query = mysqli_query($mysqli, "SELECT 
        nome_popular,
        nome_binomial,
        estado_conservacao,
        passaro_descricao,
        envergadura_cm
        FROM passaro WHERE passaro_id = $passaro_id"
    );

    if (!$passaro_query) {
        die(json_encode(array("error" => "Query failed: " . $mysqli->error)));
    }

    $passaro_query = $passaro_query->fetch_assoc();
    if (!$passaro_query) {
        die(json_encode(array("error" => "Passaro not found")));
    }

    $nome_popular = $passaro_query["nome_popular"];
    $nome_binomial = $passaro_query["nome_binomial"];
    $estado_conservacao = $passaro_query["estado_conservacao"];
    $passaro_descricao = $passaro_query["passaro_descricao"];
    $envergadura_cm = $passaro_query["envergadura_cm"];

    $img_passaro_query = mysqli_query($mysqli, "SELECT
        img_passaro_filepath,
        img_passaro_order
        FROM img_passaro WHERE passaro_id = $passaro_id"
    );

    if ($img_passaro_query) {
        while($img_passaro_row  = $img_passaro_query ->fetch_assoc()){
            $img_passaro_filepath = $img_dir . $img_passaro_row["img_passaro_filepath"];
            $img_passaro_order = $img_passaro_row["img_passaro_order"];
            $img_passaro[$img_passaro_order] = $img_passaro_filepath;
        }
    }

    $canto_query = mysqli_query($mysqli, "SELECT canto_filepath FROM canto WHERE passaro_id = $passaro_id");
    $canto_filepath = $canto_dir;
    if ($canto_query) {
        $canto_row = $canto_query->fetch_assoc();
        $canto_filepath = $canto_dir . ($canto_row["canto_filepath"] ?? "");
    }

    // optimize this later
    $avistamento_img_count = 0;
    $avistamento_img_count_query = mysqli_query($mysqli, "SELECT COUNT(*) FROM avistamento_img WHERE passaro_id = $passaro_id");
    if ($avistamento_img_count_query) {
        $avistamento_img_count_row = $avistamento_img_count_query->fetch_assoc();
        $avistamento_img_count = $avistamento_img_count_row["COUNT(*)"] ?? 0;
    }

    $avistamento_audio_count = 0;
    $avistamento_audio_count_query = mysqli_query($mysqli, "SELECT COUNT(*) FROM avistamento_audio WHERE passaro_id = $passaro_id");
    if ($avistamento_audio_count_query) {
        $avistamento_audio_count_row = $avistamento_audio_count_query->fetch_assoc();
        $avistamento_audio_count = $avistamento_audio_count_row["COUNT(*)"] ?? 0;
    }

    $avistamento_video_count = 0;
    $avistamento_video_count_query = mysqli_query($mysqli, "SELECT COUNT(*) FROM avistamento_video WHERE passaro_id = $passaro_id");
    if ($avistamento_video_count_query) {
        $avistamento_video_count_row = $avistamento_video_count_query->fetch_assoc();
        $avistamento_video_count = $avistamento_video_count_row["COUNT(*)"] ?? 0;
    }

    $passaro_artigo = array(
        "nome_popular" => $nome_popular,
        "nome_binomial" => $nome_binomial,
        "estado_conservacao" => $estado_conservacao,
        "passaro_descricao" => $passaro_descricao,
        "envergadura_cm" => $envergadura_cm,
        "img_passaro" => $img_passaro,
        "canto_filepath" => $canto_filepath,
        "avistamento_img_count" => $avistamento_img_count,
        "avistamento_audio_count" => $avistamento_audio_count,
        "avistamento_video_count" => $avistamento_video_count
    );

    $response = array("artigo" => $passaro_artigo);
    echo json_encode($response);
}

?>
