<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans511">Nasbi.com | E-wallet</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';

    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/e-wallet.css">
</head>

<!-- Include Navbar : para todas las pantallas-->
<?php
include '../include/manager-navbar.php';
?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-nav">
            <div class="col-lg-2 col-list-nav">
                <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active bonos_wallet" id="id-wallets" data-toggle="pill" href="#ref-wallets" role="tab" aria-controls="ref-wallets" aria-selected="true"><img src="../imagen/nav-pills/wallets.png"> <span class="trans35_"></span></a>

                    <a class="nav-link  bonos_transacciones" id="id-transacciones" data-toggle="pill" href="#ref-transacciones" role="tab" aria-controls="ref-transacciones" aria-selected="false"><img src="../imagen/nav-pills/transacciones.png"> <span class="trans227_"></span></a>

                    <!-- <a class="nav-link " id="id-transaferencias" data-toggle="pill" href="#ref-transaferencias" role="tab" aria-controls="ref-transaferencias" aria-selected="false"><img src="../imagen/nav-pills/transferencias.png"><span class="trans226_"></span></a> -->

                    <!-- <a class="nav-link" id="id-recargas" data-toggle="pill" href="#ref-recargas" role="tab" aria-controls="ref-recargas" aria-selected="false"><img src="../imagen/nav-pills/recargas.png"> <span class="trans225_"></span></a> -->

                    <a class="nav-link bonos_dif_blo" id="id-blo_dif" data-toggle="pill" href="#ref-blo_dif" role="tab" aria-controls="ref-blo_dif" aria-selected="false"><img src="../imagen/nav-pills/recargas.png"> <span class="trans224_"></span></a>
                    <div class="icon-down-responsive">
                        <i class="fas fa-chevron-left"></i>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>

            <div class="col-lg-10 px-0 col-tabcontent">
                <div class="tab-content">
                    <!-- wallets.php -->
                    <?php include './bonos/wallets.php'; ?>

                    <!-- transaciones.php -->
                    <?php include './bonos/transacciones.php'; ?>

                    <!-- Transferencias -->
                    <?php # include './bonos/transferencia.php'; ?>

                    <!-- Recargas -->
                    <?php include './bonos/recargas.php'; ?>

                    <!-- diferidos y bloqueados -->
                    <?php include './bonos/diferidos_bloqueados.php'; ?>
                </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/bonos/wallets.js"></script>
<script src="../js/controllers/bonos/transaciones.js"></script>
<script src="../js/controllers/bonos/diferidos_bloqueados.js"></script>
<script src="../js/controllers/bonos/paginacion.js"></script>

</html>