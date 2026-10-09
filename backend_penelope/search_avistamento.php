<?php
include "sql_config.php";
/* require "sql_config.php"; */

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $passaro_id = $_GET["passaro_id"];
    $avistamento_type = $_GET["type"];

    if($avistamento_type == "img"){
        send_avistamento_img($passaro_id);
    }
    else if($avistamento_type == "canto"){
        send_avistamento_canto($passaro_id);
    }
    else if($avistamento_type == "video"){
        send_avistamento_video($passaro_id);
    }
}


function send_avistamento_img($passaro_id){
    global $mysqli;

    $avistamentos_dir = "files_penelope/avistamentos/";
    $usuario_dir = "files_penelope/usuario/";
    $avistamento_list = array();

    $avistamento_query = mysqli_query($mysqli, "SELECT 
        avistamento_img_id,
        avistamento_img_latitude,
        avistamento_img_longitude,
        avistamento_img_date,
        avistamento_img_filepath,
        usuario_id
        FROM avistamento_img WHERE passaro_id = $passaro_id"
    );

    if (!$avistamento_query) {
        die(json_encode(array("error" => "Query failed: " . $mysqli->error)));
    }

    while($avistamento_row = $avistamento_query->fetch_assoc()) {
        $avistamento_img_id = $avistamento_row["avistamento_img_id"];
        $avistamento_img_latitude = $avistamento_row["avistamento_img_latitude"];
        $avistamento_img_longitude = $avistamento_row["avistamento_img_longitude"];
        $avistamento_img_date = $avistamento_row["avistamento_img_date"];
        $avistamento_img_filepath = $avistamento_row["avistamento_img_filepath"];
        $usuario_id = $avistamento_row["usuario_id"];

        $img_preview_query = mysqli_query($mysqli, "SELECT
            img_preview_filepath FROM avistamento_img_preview WHERE avistamento_img_id = $avistamento_img_id"
        );
        $img_preview_filepath = "";
        if ($img_preview_query) {
            $img_preview_row = $img_preview_query->fetch_assoc();
            $img_preview_filepath = $img_preview_row["img_preview_filepath"] ?? "";
        }

        $usuario_query = mysqli_query($mysqli, "SELECT
            usuario_nome FROM usuario WHERE usuario_id = $usuario_id"
        );
        $usuario_nome = "Unknown";
        if ($usuario_query) {
            $usuario_row = $usuario_query->fetch_assoc();
            $usuario_nome = $usuario_row["usuario_nome"] ?? "Unknown";
        }

        $avistamento = array(
            "avistamento_img_id" => $avistamento_img_id,
            "avistamento_img_longitude" => $avistamento_img_longitude,
            "avistamento_img_latitude" => $avistamento_img_latitude,
            "avistamento_img_date" => $avistamento_img_date,
            "avistamento_img_url" => $avistamentos_dir . $avistamento_img_filepath,
            "avistamento_img_preview_url" => $avistamentos_dir . $img_preview_filepath,
            "usuario_nome" => $usuario_nome
        );
        $avistamento_list[] = $avistamento;
    }

    $response = array("avistamento" => $avistamento_list);
    echo json_encode($response);
}



function send_avistamento_audio($passaro_id){
    global $mysqli;

    $avistamentos_dir = "files_penelope/avistamentos/";
    $usuario_dir = "files_penelope/usuario/";
    $avistamento_list = array();

    $avistamento_query = mysqli_query($mysqli, "SELECT 
        avistamento_audio_id,
        avistamento_audio_latitude,
        avistamento_audio_longitude,
        avistamento_audio_date,
        avistamento_audio_filepath,
        usuario_id
        FROM avistamento_audio WHERE passaro_id = $passaro_id"
    );

    if (!$avistamento_query) {
        die(json_encode(array("error" => "Query failed: " . $mysqli->error)));
    }

    while($avistamento_row = $avistamento_query->fetch_assoc()) {
        $avistamento_audio_id = $avistamento_row["avistamento_audio_id"];
        $avistamento_audio_latitude = $avistamento_row["avistamento_audio_latitude"];
        $avistamento_audio_longitude = $avistamento_row["avistamento_audio_longitude"];
        $avistamento_audio_date = $avistamento_row["avistamento_audio_date"];
        $avistamento_audio_filepath = $avistamento_row["avistamento_audio_filepath"];
        $usuario_id = $avistamento_row["usuario_id"];

        $usuario_query = mysqli_query($mysqli, "SELECT
            usuario_nome FROM usuario WHERE usuario_id = $usuario_id"
        );
        $usuario_nome = "Unknown";
        if ($usuario_query) {
            $usuario_row = $usuario_query->fetch_assoc();
            $usuario_nome = $usuario_row["usuario_nome"] ?? "Unknown";
        }

        $avistamento = array(
            "avistamento_audio_id" => $avistamento_audio_id,
            "avistamento_audio_longitude" => $avistamento_audio_longitude,
            "avistamento_audio_latitude" => $avistamento_audio_latitude,
            "avistamento_audio_date" => $avistamento_audio_date,
            "avistamento_audio_url" => $avistamentos_dir . $avistamento_audio_filepath,
            "usuario_nome" => $usuario_nome
        );
        $avistamento_list[] = $avistamento;
    }

    $response = array("avistamento" => $avistamento_list);
    echo json_encode($response);
}



function send_avistamento_video($passaro_id){
    global $mysqli;

    $avistamentos_dir = "files_penelope/avistamentos/";
    $usuario_dir = "files_penelope/usuario/";
    $avistamento_list = array();

    $avistamento_query = mysqli_query($mysqli, "SELECT 
        avistamento_video_id,
        avistamento_video_latitude,
        avistamento_video_longitude,
        avistamento_video_date,
        avistamento_video_filepath,
        usuario_id
        FROM avistamento_video WHERE passaro_id = $passaro_id"
    );

    if (!$avistamento_query) {
        die(json_encode(array("error" => "Query failed: " . $mysqli->error)));
    }

    while($avistamento_row = $avistamento_query->fetch_assoc()) {
        $avistamento_video_id = $avistamento_row["avistamento_video_id"];
        $avistamento_video_latitude = $avistamento_row["avistamento_video_latitude"];
        $avistamento_video_longitude = $avistamento_row["avistamento_video_longitude"];
        $avistamento_video_date = $avistamento_row["avistamento_video_date"];
        $avistamento_video_filepath = $avistamento_row["avistamento_video_filepath"];
        $usuario_id = $avistamento_row["usuario_id"];

        $usuario_query = mysqli_query($mysqli, "SELECT
            usuario_nome FROM usuario WHERE usuario_id = $usuario_id"
        );
        $usuario_nome = "Unknown";
        if ($usuario_query) {
            $usuario_row = $usuario_query->fetch_assoc();
            $usuario_nome = $usuario_row["usuario_nome"] ?? "Unknown";
        }

        $avistamento = array(
            "avistamento_video_id" => $avistamento_video_id,
            "avistamento_video_longitude" => $avistamento_video_longitude,
            "avistamento_video_latitude" => $avistamento_video_latitude,
            "avistamento_video_date" => $avistamento_video_date,
            "avistamento_video_url" => $avistamentos_dir . $avistamento_video_filepath,
            "usuario_nome" => $usuario_nome
        );
        $avistamento_list[] = $avistamento;
    }

    $response = array("avistamento" => $avistamento_list);
    echo json_encode($response);
}

?>
