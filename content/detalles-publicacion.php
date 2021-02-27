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
            <h2 class="">Consulta los datos de la publicacion</h2>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Titulo</h5>
            <p class="titulo_rev">Maquinas Nescafé® Dolce Gusto® Mini Me Color Negro - Nuevas</p>
        </div>
        <div class="col-sm-6 px-xl-5">
            <h5 class="">Categoria</h5>
            <p class="categoria_rev">Home, garden and DIY &gt; dining room and bar</p>
        </div>
        <div class="col-md-6 px-xl-5">
            <h5 class="">Descripcion</h5>
            <p class="descripcion_rev">2</p>
        </div>
        <div class="col-md-6 px-xl-5">
            <h5 class="">Dias espera</h5>
            <p class="dias_espera_rev">0</p>
        </div>
        <div class="col-md-6 px-xl-5">
            <h5 class="">Condicion</h5>
            <p class="condicion_rev">New with warranty</p>
        </div>
        <div class="col-12 px-xl-5">
            <h5 class="">Fotos</h5>
            <div class="row __divfotos_rev">
                <div class="col-12 col-sm-4 col-md-3 col-lg-2 pl-0 pr-2">
                    <div class="content-product">
                        <img loading="lazy" src="https://nasbi.peers2win.com/imagenes/publicaciones/328/1612386696206_0.png" class="img-product __imgfoto0">
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-md-4 px-xl-5">
            <h5 class="">Marca</h5>
            <p class="marca_rev">2</p>
        </div>
        <div class="col-sm-6 col-md-4 px-xl-5">
            <h5 class="">Precio</h5>
            <p><span>$</span> <span class="precio_rev">200,000.00</span></p>
        </div>
        <div class="col-sm-6 col-md-4 px-xl-5" id="div-edit-tipo-envio">
            <h5 class="">Terminos de entrega</h5>
            <p class="tipoenvio_rev">Shipping charge on agreement</p>
        </div>
        <div class="col-sm-6 col-md-4 px-xl-5" id="div-edit-cantidad">
            <h5 class="">Cantidad</h5>
            <p class="cantidad_rev">3</p>
        </div>
        <div class="col-sm-6 col-md-4 px-xl-5">
            <h5 class="">Modelo</h5>
            <p class="modelo_rev">3</p>
        </div>


        <div class="col-sm-6 col-md-4 px-xl-5">
            <h5 class="">URL Video</h5>
            <p class="url_video_rev">You don't have video URL</p>
        </div>


        <div class="col-sm-6 col-md-4 px-xl-5">
            <h5 class="">Tipo de exposición</h5>
            <p class="exposicion_rev">Premium</p>
        </div>

        <div class="col-sm-6 col-md-4 px-xl-5" id="">
            <h5 class="">Dirección</h5>
            <p class="direccion_rev"></p>
        </div>

        <div class="col-12 px-xl-5 pt-4 text-left">
            <h5 class="">Info del cliente</h5>
            <h5 class="email_user">Email: </h5>
            <h5 class="nombre_user">Nombre: </h5>
            <h5 class="telefono_user">Telefono: </h5>
        </div>

        <div class="col-12 px-xl-5 pt-4">
            <h5 class="text-left">Subastas</h5>
            <div class="table-responsive table-respn-subasta d-none table-detalles-public">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="trans27">Producto</th>
                        <th class="trans0">Descripción</th>
                        <th class="trans73_"># de nasbi descuento(s)</th>
                        <th class="trans74_">Inscritos</th>
                        <th class="trans306_">Categoría de nasbi descuento(s)</th>
                        <th class="trans46_">Fecha</th>
                        <th class="trans20">Estado</th>
                    </tr>
                    </thead>
                    <tbody class="subastas__list">
    
                    </tbody>
                </table>
            </div>
        </div>

        <div class="col-12 px-xl-5">
            <div class="div-btnss">
                <button class="btn-atras">Atrás</button>
                <button class="btn-rechazar trans_eb49">Rechazar</button>
                <button class="btn-aceptar trans_eb48">Aceptar</button>
            </div>
        </div>
    </div>
</div>
</body>


<!-- Modal Ok-->
<div class="modal fade" id="modal-revision" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close cierre_modal_revision">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf text-center">
                    <h4>¡Producto aceptado con exito!</h4>
                </div>
                <div class="contant-button02">
                    <button class="btn-revision">Ir a publicaciones en revision</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal Rechazo-->
<div class="modal fade" id="modal-rechazo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close cierre_modal_rechazo">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf text-center">
                        <h4 for="">Motivo de rechazo:</h4>
                        <input type="text" id="motivo_rechazo" style="width: 500px; height: 100px;" class="form-control mr-auto ml-auto">
                </div>
                <div class="contant-button02">
                    <button class="btn-rechazar-2" style="background-color: red !important;">Rechazar publicacion</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal Rechazo Exitoso-->
<div class="modal fade" id="modal-rechazo-exitoso" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close cierre_modal_rechazo_exitoso">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf text-center">
                    <h4>¡Producto rechazado con exito!</h4>
                </div>
                <div class="contant-button02">
                    <button class="btn-revision btn-rechazar-exitoso">Ir a publicaciones en revision</button>
                </div>
            </div>
        </div>
    </div>
</div>



<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/detalles-publicacion.js"></script>

</html>