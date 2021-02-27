<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans517">Nasbi.com | Historial</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/historial.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-content">
            <div class="col-12">
                <h2 class="title-section ">
                    <span class="_trans180">Historial</span>
                    <span class="title-button"><button class="btn_eliminar_historial _trans181">Eliminar historial</button></span></h2>
                <p class="subtit _trans182">Productos que visitastes recientementee</p>
            </div>

            <div class=" row historial__container">

            </div>
            <div class=" row content__nodata" style="display: none;">
                <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                <p class="label-title_nodata trans231_ ">No tienes comentarios.</p>

            </div>
            <div class="col-12 pagination">

            </div>


        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/historial.js"></script>

</html>

<!-- Modal alertas generales -->
<div class="modal fade" id="modal-alertas-generales" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" alt="nasbi.com" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row agregado-carrito">
                    <h4 class="alerta_titulo"></h4>
                    <p class="alerta_text"></p>
                    <div align="center" class="div-alignc" style="width: 100%;">
                        <button class="btn btn-primary trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal confirmar eliminar -->
<div class="modal fade" id="modal-confirmar-eliminar" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" alt="nasbi.com" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row agregado-carrito">
                    <h4 class="_trans497">Eliminar Historial</h4>
                    <p class="_trans498">¿Estas seguro de eliminar?</p>
                    <div align="center" class="div-alignc" style="width: 100%;">
                        <button class="btn btn-primary btn_confirmar_eliminar trans_01">Aceptar</button>
                        <button class="btn btn-danger" data-dismiss="modal" aria-label="Close">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>