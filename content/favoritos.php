<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans515">Nasbi.com | Favoritos</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/favoritos.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="col-12 style_container_produc_fav">
            <h2 class="title-section "> <label class="trans104_"></label> <span><i class="fas fa-heart"></i></span></h2>
            <p class="subtit trans106_">Tus productos favoritos</p>
        </div>

        <div class="row row-content  list_favoritos_user_product">
            <!-- espacio favorito-->
        </div>
        <div class="list__favoritos__pagination"></div>

        <div class="favoritos__list__nodata mb-5" style="display: none;">
            <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
            <p class="label-title_nodata trans103_"></p>
            <label class="trans_45"></label>
            <br><br><br><br><br><br>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>

<script src="../js/controllers/favoritos_user.js"></script>

</html>