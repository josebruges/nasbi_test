<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="trans432_">Nasbi.com | Mis subastas</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/nueva_pass_em.css">
</head>
<!-- Include Navbar -->
<?php include '../include/navbars-modales-globales.php'; ?>
<body>
<?php include '../include/body_general.php'; ?>

<div class="row row-contrasena">

  <div class="col-md-10 col-lg-8 col-xl-4 display-correo-electronico">
        <div style="width:100%; text-align: center;">
            <img loading="lazy" class="imagen-recuperar" src="../imagen/nasbi-white.png" alt="">
        </div>

        <h4 class="trans429_"></h4>

        <h6 class="trans_25"></h6>
        <input class="_trans121__ph correo_nueva_pass" type="text" maxlength="50">


        <h6 class="_trans201"></h6>
        <div class="contrasena-aliniear">
            <input class="nas_nue_pas trans430___ph" maxlength="50">
            <label >
            <i class="ojito_pass"></i>
            </label>
        </div>


        <h6 class="trans_74">Confirme Nueva Contraseña:</h6>
        <div class="contrasena-aliniear">
            <input class="nas_nue_pas_confirm trans431___ph" maxlength="50">
            <label>
            <i class="ojito_pass_confirm"></i>
            </label>
        </div>

        <div class="d-flex justify-content-around align-center" style="width: 100%;">
                <button class="btn btn_enviar_pass enviar_nueva_pass trans_16__btn" data-toggle="modal" data-target="#modal-login"></button>
        </div>
  </div>
</div>

</body>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>

</html>

<script src="../js/nueva_pass_em.js"></script>