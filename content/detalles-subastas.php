<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans522">Nasbi.com | Modificar publicación </title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/detalles-publicacion.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
<div align="center">

    <div class="row row-content" id="opciones-editar">
        <div class="col-12 px-xl-5 pb-3">
            <h2 class="">Consulta los datos de la subasta</h2>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Producto</h5>
            <p class="producto_sub">Maquinas Nescafé® Dolce Gusto® Mini Me Color Negro - Nuevas</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Cantidad</h5>
            <p class="cantidad_sub">5</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Estado</h5>
            <p class="estado_sub">Terminado</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Precio</h5>
            <p class="precio_sub">$ 2780000.00</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Fecha creacion</h5>
            <p class="fecha_creacion_sub">16/25/2020</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Fecha actualizacion</h5>
            <p class="fecha_actualizacion_sub">16/25/2020</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Fecha inicio</h5>
            <p class="fecha_inicio_sub">16/25/2020</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Fecha fin</h5>
            <p class="fecha_fin_sub">16/25/2020</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Inscritos</h5>
            <p class="inscritos_sub">25</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Tipo</h5>
            <p class="tipo_sub">Gold</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Moneda</h5>
            <p class="moneda_sub">Nasbi Gold</p>
        </div>
        <div class="col-12 px-xl-5">
            <h5 class="">Fotos</h5>
            <div class="row __divfotos_sub">
                <div class="col-12 col-sm-4 col-md-3 col-lg-2 pl-0 pr-2">
                    <div class="content-product">
                        <img loading="lazy" src="https://nasbi.peers2win.com/imagenes/publicaciones/328/1612386696206_0.png" class="img-product __imgfoto0">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 px-xl-5 pt-4">
        <h5 class="text-left">Pujas</h5>
        <div class="table-responsive table-respn-pujas d-none table-detalles-public-subasta">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th class="">#</th>
                    <th class="">Usuario</th>
                    <th class="">Email</th>
                    <th class="">Telefono</th>
                    <th class="">Monto</th>
                    <th class="">Fecha creacion</th>
                    <th class="">Fecha final</th>
                </tr>
                </thead>
                <tbody class="pujas__list">

                </tbody>
            </table>
        </div>
    </div>
    <div class="col-12 px-xl-5 pt-4">
        <h5 class="text-left">Puja ganadora</h5>
        <div class="table-responsive table-respn-pujas-ganadora d-none table-detalles-public-subasta">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th class="">#</th>
                    <th class="">Usuario</th>
                    <th class="">Email</th>
                    <th class="">Telefono</th>
                    <th class="">Monto</th>
                    <th class="">Fecha creacion</th>
                    <th class="">Fecha final</th>
                </tr>
                </thead>
                <tbody class="pujas__ganadora__list">

                </tbody>
            </table>
        </div>
    </div>
    <div class="col-12 px-xl-5">
        <div class="div-btnss">
            <button class="btn-atras-sub">Atrás</button>
        </div>
    </div>
</div>
</body>



<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/dashboard/detalles-subastas.js"></script>

</html>