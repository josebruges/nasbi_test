<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans520">Nasbi.com | Mis cuentas</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/mis-cuentas.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
    <?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-nav">
            <!-- Opciones sideNav -->
            <div class="col-lg-2 col-list-nav">
                <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active sidenav_resumen side_option" id="id-resumen" data-toggle="pill" href="#ref-resumen" role="tab" aria-controls="ref-resumen" aria-selected="true">
                        <img loading="lazy" src="../imagen/nav-pills/resumen.png" /> <span class="_trans213"></span>
                    </a>

                    <a class="nav-link sidenav_facturacion side_option" id="id-facturacion" data-toggle="pill" href="#ref-facturacion" role="tab" aria-controls="ref-facturacion" aria-selected="false">
                        <img loading="lazy" src="../imagen/nav-pills/facturacion.png" /> <span class="_trans214"></span>
                    </a>

                    <a class="nav-link sidenav_reputacion side_option" id="id-reputacion" data-toggle="pill" href="#ref-reputacion" role="tab" aria-controls="ref-reputacion" aria-selected="false">
                        <img loading="lazy" src="../imagen/nav-pills/reputacion.png" /> <span class="_trans215"></span>
                    </a>

                    <a class="nav-link sidenav_publicaciones side_option" id="id-publicaciones" data-toggle="pill" href="#ref-publicaciones" role="tab" aria-controls="ref-publicaciones" aria-selected="false">
                        <img loading="lazy" src="../imagen/nav-pills/publicaciones.png" /> <span class="_trans216"></span>
                    </a>

                    <!-- <a class="nav-link sidenav_publicaciones_revision side_option" id="id-publicaciones-revision" data-toggle="pill" href="#ref-publicaciones-revision" role="tab" aria-controls="ref-publicaciones-revision" aria-selected="false">
                        <img loading="lazy" src="../imagen/nav-pills/publicaciones.png" /><label class="trans_eb34"></label>
                    </a> -->

                    <a class="nav-link sidenav_compras side_option" id="id-compras" data-toggle="pill" href="#ref-compras" role="tab" aria-controls="ref-compras" aria-selected="false">
                        <img loading="lazy" src="../imagen/nav-pills/compras.png" /> <span class="_trans217"></span>
                    </a>

                    <a class="nav-link sidenav_ventas side_option" id="id-ventas" data-toggle="pill" href="#ref-ventas" role="tab" aria-controls="ref-ventas" aria-selected="false">
                        <img loading="lazy" src="../imagen/nav-pills/ventas.png" /> <span class="_trans218"></span>
                    </a>

                    <a class="nav-link sidenav_subastas side_option" id="id-subastas" data-toggle="pill" href="#ref-subastas" role="tab" aria-controls="ref-subastas" aria-selected="false">
                        <img loading="lazy" src="../imagen/nav-pills/subastas.png" /> <span class="_trans219"></span>
                    </a>

                    <a class="nav-link sidenav_configuracion side_option" id="id-configuracion" data-toggle="pill" href="#ref-configuracion" role="tab" aria-controls="ref-configuracion" aria-selected="false">
                        <img loading="lazy" src="../imagen/nav-pills/configuraciones.png" /> <span class="_trans212"></span>
                    </a>

                    <a class="nav-link sidenav_direcciones side_option" id="id-direcciones" data-toggle="pill" href="#ref-direcciones" role="tab" aria-controls="ref-direcciones" aria-selected="false">
                        <img loading="lazy" src="../imagen/nav-pills/direcciones.png" /><label class="trans18"></label>
                    </a>

                    <div class="icon-down-responsive">
                        <i class="fas fa-chevron-left"></i>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>

            <div class="col-lg-10 px-0 col-tabcontent">
                <div class="tab-content">
                    <!-- resumen -->
                    <?php include './dashboard/resumen.php'; ?>

                    <!-- Facturacion -->
                    <?php include './dashboard/facturacion.php'; ?>

                    <!-- Reputacion -->
                    <?php include './dashboard/reputacion.php'; ?>

                    <!-- Publicaciones -->
                    <?php include './dashboard/publicaciones.php'; ?>

                    <!-- Compras -->
                    <?php include './dashboard/compras.php'; ?>

                    <!-- Ventas -->
                    <?php include './dashboard/ventas.php'; ?>

                    <!-- Subastas -->
                    <?php include './dashboard/nasbi-descuentos.php'; ?>

                    <!-- Configuracion -->
                    <?php include './dashboard/configuracion.php'; ?>

                    <!-- Direcciones -->
                    <?php include './dashboard/direcciones.php'; ?>
                </div>
            </div>
        </div>
    </div>
</body>




<!-- Modal detalle orden -->
<div class="modal fade" id="modal-detalle-orden" tabindex="-1" role="dialog" aria-hidden="true">
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

                <div class="row rowIm">
                    <div class="col-lg-7 px-2">
                        <h5 class="titleModal _trans220">Detalle de orden</h5>
                        <div class="row rowIm">
                            <div class="col-md-5 px-1">
                                <div class="container-mdal">
                                    <img loading="lazy" src="../imagen/product.jpg" class="img-mdal imagendetallecompra">
                                </div>
                            </div>
                            <div class="col-md-7 px-1 col-name-modal">
                                <p>#2739426</p>
                                <h5>Apple Watch Serie 5 (1)</h5>
                                <h4>$ 1.000 USD</h4>
                            </div>
                        </div>
                        <p class="info-ord"><b>Ciudad:</b> Bogotá</p>
                        <p class="info-ord"><b>Dirección de entrega:</b> Transversal 22 - 44 apto 102</p>
                    </div>

                    <div class="col-lg-5 px-2">
                        <p class="info-ord"><b>13/02/2020</b> Tu orden fue entregada</p>
                        <p class="info-ord"><b>13/02/2020</b> Tu orden esta lista para ser retirada</p>
                        <p class="info-ord"><b>13/02/2020</b> Tu orden esta lista para ser confirmada</p>
                        <p class="info-ord"><b>13/02/2020</b> Hemos recibido tu solicitud de orden de compra</p>
                    </div>
                </div>

                <div class="row pb-5">
                    <div class="col-12 px-0">
                        <ol class="ol-timeline">
                            <li>
                                <div class="conPoin">
                                    <span class="point pointactive"></span>
                                </div>
                                <p class="textime">Solicitud<br> Recibida<br> 12/02 Apple</p>
                            </li>
                            <li>
                                <div class="conPoin">
                                    <span class="point"></span>
                                </div>
                                <p class="textime">Orden<br> Confirmada<br> 12/02</p>
                            </li>
                            <li>
                                <div class="conPoin">
                                    <span class="point"></span>
                                </div>
                                <p class="textime">Orden<br> Lista para retiro<br> 12/02</p>
                            </li>
                            <li>
                                <div class="conPoin">
                                    <span class="point"></span>
                                </div>
                                <p class="textime">Orden<br> Entregada<br> 12/02</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal confirmacion entrega -->
<div class="modal fade" id="modal-confirmacion-entrega" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-titleEntrega">
                    <div class="col-12">
                        <h5>Confirmacion de entrega</h5>
                        <p>¿Has enviado tu producto satisfactoriamente?En caso de tener que contactarte con tu comprador haz <a href="">clic aquí</a></p>
                        <div class="contn-entrega">
                            <button class="btnsi">Si</button>
                            <button class="btnno" data-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal confirmacion compra declinada -->
<div class="modal fade" id="modal-compra-declinada" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="row">
                <div class="col-3">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="modal-body">

                <div class="row row-titleEntrega">
                    <div class="col-12">
                        <div class="col-9 imagendecompradeclinada">

                        </div>

                        <div class="col-9 justificaciondelporquedeclinado">

                        </div>


                        <div class="contn-entrega">
                            <button class="btnsi  trans_01 aceptardeclinaciondecompra">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>






<!-- Modal publicar de nuevo -->
<div class="modal fade" id="modal-publicar-nuevo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-titleEntrega">
                    <div class="col-12">
                        <h5 class="_trans390">Publicar de nuevo</h5>
                        <p class="_trans391">Estás a punto de publicar de nuevo esta venta con las mismas condiciones de la anterior.</p>
                        <div class="contn-entrega">
                            <button class="btnno btn__modificar_mi_publicacion _trans76">Modificar</button>
                            <button class="btnsi  btn__publicar_mi_publicacion">
                                <span class="trans_01"></span>
                                <span class="spinner-border spinner-border-sm spiner_activar_publicacion" style="display: none;" role="status" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal eliminar publicacion -->
<div class="modal fade" id="modal-eliminar-publicacion" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-titleEntrega">
                    <div class="col-12">
                        <h5 class="_trans384">Eliminar publicación</h5>
                        <p class="_trans385">Estás a punto de eliminar esta venta, recuerda que podrás encontrarla despúes en tus reportes. mismas condiciones de la anterior.</p>
                        <div class="contn-entrega">
                            <button class="btnno trans_02" class="close" data-dismiss="modal" aria-label="Close">Cancelar</button>
                            <button class="btnsi btn__eliminar_mi_publicacion">
                                <span class="trans_01"></span>
                                <span class="spinner-border spinner-border-sm spiner_eliminar_publicacion" style="display: none;" role="status" aria-hidden="true"></span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal pausar publicacion -->
<div class="modal fade" id="modal-pausar-publicacion" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-titleEntrega">
                    <div class="col-12">

                        <h5 class="_trans386">Pausar publicación</h5>
                        <p class="_trans387">Estás a punto de pausar esta venta, puedes activarla despues.</p>
                        <div class="contn-entrega">
                            <button class="btnno trans_02" class="close" data-dismiss="modal" aria-label="Close">Cancelar</button>
                            <button class="btnsi  btn__pausar_mi_publicacion">
                                <span class="trans_01"></span>
                                <span class="spinner-border spinner-border-sm spiner_pausar_publicacion" style="display: none;" role="status" aria-hidden="true"></span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>




<!-- Modal info public -->
<div class="modal fade" id="modal-info-public" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9 col-lg-4 pr-0">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-12 col-lg-7 col7none">
                        <p class="header-modal-label">
                            <span class="_trans129">:</span>
                            <span class="estado_mi_subasta">Activa</span>
                        </p>
                    </div>
                    <div class="col-3 col-lg-1">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="col-12 col12none">
                        <p class="header-modal-label"><span class="_trans129">:</span> <span class="estado_mi_subasta">Activa</span></p>
                    </div>
                </div>

                <div class="row infor-subas">
                    <div class="col-lg-6">
                        <div class="owl-carousel owl-theme carousel-info-subastas">
                            <div class="item">
                                <div class="content-foto">
                                    <img loading="lazy" src="../imagen/product.jpg" class="img-carousel imagen_mi_subasta">
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6 pl-lg-0">
                        <h4 class="nombre-producto-modal nombre_mi_subasta">Xiaomi Redmi Note 8 64 GB</h4>
                        <p class="label-modal _trans130">Valor real</p>
                        <h4 class="price-product-modal precio_mi_subasta">300,00 USD</h4>
                        <h4 class="label02"><span class="trans75_">:</span> <span class="tipo-subasta tipo_subasta_modal"><span class="tipo_mi_subasta">Bronce</span> <img src="../imagen/medalla.png"></span></h4>
                        <h4 class="label02"><span class="_trans402">Participantes:</span> <span class="return participantes_mi_subasta">22</span></h4>
                        <div class="content-button">
                            <button class="btn1 _trans401 btn__compartir_mi_subasta">Compartir</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal compartir publicacion -->
<div class="modal fade" id="modal-compartir-publicacion" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-infMdal">
                    <img loading="lazy" src="../imagen/compartir-subasta.png" class="img-modal">
                    <h4 class="_trans388">Comparte tu publicación</h4>
                    <p class="_trans389">Sabemos que quieres contarle a muchas personas sobre tus productos en venta. <br>¿Dónde quieres compartirlo?</p>

                    <div class="container-img">
                        <a class="compartir_mi_publicacion_wsp"> <img loading="lazy" src="../imagen/icon-whatsapp.png"></a>
                        <a class="compartir_mi_publicacion_fb"> <img loading="lazy" src="../imagen/icon-facebook.png"></a>
                        <a class="compartir_mi_publicacion_link"> <img loading="lazy" src="../imagen/icon-copiar.png"></a>
                    </div>
                </div>
                <span class="texto_copiado _trans403">¡Copiado!</span>
            </div>
        </div>
    </div>
</div>

<!-- Modal compartir NO REVISADA -->
<div class="modal fade" id="modal-compartir-publicacion-no-revisada" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-infMdal info-review">
                    <!-- <img loading="lazy" src="../imagen/compartir-subasta.png" class="img-modal">
                    <h4 class="_trans388">Comparte tu publicación</h4> -->
                    <!-- <p class="trans293">
                        Lo sentimos no puedes compartir una publicación que no ha sido revisada
                    </p> -->
                </div>
                <span class="texto_copiado _trans403">¡Copiado!</span>
            </div>
        </div>
    </div>
</div>



<!-- Modal motivo rechazo -->
<div class="modal fade" id="modal-motivo-rechazo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="mtvr_container">
                    <h5 class="trans300 mtv_titulo">Motivo de rechazo</h5>
                    <div class="row row-infMdal motivo_rechazo">

                    </div>
                </div>

                <span class="texto_copiado _trans403">¡Copiado!</span>
            </div>
        </div>
    </div>
</div>



<!-- Modal compartir subasta -->
<div class="modal fade" id="modal-compartir-subasta" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-infMdal">
                    <img loading="lazy" src="../imagen/compartir-subasta.png" class="img-modal">
                    <h4 class="_trans392">Comparte la subasta</h4>
                    <p class="_trans389">Sabemos que quieres contarle a muchas personas sobre tus productos en venta. <br>¿Dónde quieres compartirlo?</p>
                    <div class="container-img">
                        <a class="compartir_mi_subasta_wsp"> <img loading="lazy" src="../imagen/icon-whatsapp.png"></a>
                        <a class="compartir_mi_subasta_fb"><img loading="lazy" src="../imagen/icon-facebook.png"></a>
                        <a class="compartir_mi_subasta_link"> <img loading="lazy" src="../imagen/icon-copiar.png"></a>
                    </div>
                </div>
                <span class="texto_copiado _trans403">¡Copiado!</span>
            </div>
        </div>
    </div>
</div>

<!-- Modal confirmacion de proceso-->
<div class="modal fade" style="z-index:99999999;" id="modal-confirmar-proceso" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-infMdal">
                    <div class="col-12">

                        <h4 class="titulo_modal_confirmacion"></h4>
                        <p class="info_modal_confirmacion"></p>
                        <div class="contn-entrega">
                            <button class="btnsi trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal crear direccion cuenta  -->
<div class="modal fade" id="modal-direccion-cuenta" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <form id="formulario_crear" class="formulario_crear">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close cerrar_crear_dir" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="row row-form1">
                        <div class="mb-4 col-sm-6">
                            <input type="text" class="form-control __maskFloat__ __paisnewdireccion_cuenta_dir" placeholder="pais" disabled readonly>
                            <p class="trans15">País</p>
                        </div>
                        <div class="mb-4 col-sm-6 col6-selects __divdepnewdireccion_dir">
                            <select class="form-control  select-plataforma __depnewdireccion_dir"></select>
                            <p class="trans16">Departamento</p>
                        </div>
                        <div class="mb-4 col-sm-6 col6-selects">
                            <input type="text" class="form-control __ciudadnewdireccion_dir trans_28__ph d-none">
                            <select class="form-control  select-plataforma __ciudadtccnewdireccion_dir"></select>
                            <p class="trans17">Ciudad</p>
                        </div>

                        <div class="mb-4 col-sm-6">
                            <input type="text" class="form-control __dirnewdireccion_dir trans238___ph">
                            <p class="trans18">Dirección</p>
                        </div>
                        <div class="mb-0 col-sm-6">
                            <input type="text" class="form-control __codigopostalnewdireccion_dir trans239___ph">
                            <p class="trans19">Código postal</p>
                        </div>
                        <div class="mb-0 col-sm-6">
                            <input type="checkbox" class="form-control __activanewdireccion_dir" placeholder="Activar">
                            <p class="trans31">Activar</p>
                        </div>
                    </div>
                </form>
                <div class="contant-button02">
                    <button class="btn btn-primary btntikets  crear_direccion_mis_cuentas trans_01">Confirmar</button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal editar  direccion cuenta  -->
<div class="modal fade" id="modal-direccion-cuenta_editar" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <form id="formulario_editar">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close boton_editar_cerrar" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="row row-form1">
                        <div class="mb-4 col-sm-6">
                            <input type="text" class="form-control __maskFloat__ __paisnewdireccion_cuenta_e" placeholder="pais" disabled readonly>
                            <p class="trans15"></p>
                        </div>
                        <div class="mb-4 col-sm-6 col6-selects __divdepnewdireccion_e">
                            <select class="form-control __depnewdireccion_e select-plataforma"></select>
                            <p class="trans16"></p>
                        </div>
                        <div class="mb-4 col-sm-6 col6-selects">
                            <select class="form-control __ciudadtccnewdireccion_e select-plataforma"></select>
                            <input type="text" class="form-control __ciudadnewdireccion_e trans269__ph d-none">
                            <p class="trans17"></p>
                        </div>
                        <div class="mb-4 col-sm-6">
                            <input type="text" class="form-control __dirnewdireccion_e trans270__ph">
                            <p class="trans18"></p>
                        </div>
                        <div class="mb-0 col-sm-6">
                            <input type="text" class="form-control __codigopostalnewdireccion_e trans271__ph">
                            <p class="trans19"></p>
                        </div>
                        <div class="mb-0 col-sm-6">
                            <input type="checkbox" class="form-control __activanewdireccion_e">
                            <p class="trans31"></p>
                        </div>
                    </div>
                    <div class="contant-button02">
                        <!-- <button class="btncomrar" data-dismiss="modal">Cerrar</button> -->
                        <button class="btn btn-primary editar_direccion trans_01"></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<!-- Modal metodo de pago -->
<div class="modal fade" id="modal-metodos-pagos" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-mtd-pago">
                    <div class="col-12">
                        <h5 class="titleMtd">Métodos de pagos</h5>
                        <p class="textmtd">Mis métodos de pago</p>
                    </div>
                    <div class="col-12 px-0">
                        <div class="row row-scrol">
                            <div class="col-lg-8">
                                <p class="text-mtodo"><img loading="lazy" src="../imagen/metodo-pago-act.png"> Mastercard Citibank terminada en <b>3456</b> <span><input type="radio" name="m1"></span></p>
                            </div>
                            <div class="col-lg-4">
                                <p class="text-tarj tarj-act">Tarjeta principal</p>
                            </div>

                            <div class="col-lg-8">
                                <p class="text-mtodo"><img loading="lazy" src="../imagen/metodo-pago-act.png"> Mastercard Citibank terminada en <b>3456</b> <span><input type="radio" name="m1"></span></p>
                            </div>
                            <div class="col-lg-4">
                                <p class="text-tarj">Tarjeta adicional</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn-agg-mtd">AGREGAR OTRO MÉTODO DE PAGO</button>
                    </div>
                </div>
            </div>

            <div class="row row-footerM">
                <div class="col-lg-6">
                    <h5 class="titleMtd mt-0 mb-2">Billetera Btc</h5>
                    <div class="cont-btn-metdo">
                        <button>Transferir</button>
                        <button class="btn-r">recargar</button>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="row row-sld">
                        <div class="col-6 px-2">
                            <img loading="lazy" src="../imagen/logo-mtd.png">
                            <p>Saldo disponible</p>
                        </div>
                        <div class="col-6 px-2">
                            <h5>0.708374 <span>BTC</span></h5>
                            <h5>234 <span>USD</span></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal chat -->
<div class="modal fade" id="modal-chat" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content content-modal">
            <div class="modal-header p-0">
                <div class="div-encabezado">
                    <div class="row encabezado-chat">
                        <div class="col-4">
                            <img src="../imagen/Logo-buy.png">
                        </div>
                        <div class="col-6">
                            <p>LIVECHAT</p>
                        </div>
                        <div class="col-2">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="row row-user-chat">
                        <div class="col-2 pr-0">
                            <div class="container-user-chat">
                                <img src="../imagen/avatar.png" class="imagen-user-chat chat_img_user">
                            </div>
                        </div>
                        <div class="col-10 pl-0">
                            <a href="" class="chat_datos_vendedor">
                                <h6 class="chat_nombre_vendedor">Alexander Benavides</h6>
                            </a>
                            <a href="" class="chat_empresa_info">
                                <p class=chat_nombre_empresa>SportClub store</p>
                            </a>

                        </div>
                    </div>

                    <div class="row row-chat-product">
                        <i class="fas fa-chevron-left left-slid chat__nasbi__btnprev"></i>
                        <div class="col-sm-3  px-1">
                            <div class="container-product-chat">
                                <img loading="lazy" alt="img-producto - nasbi.com" src="../imagen/img-slider.jpg" class="imagen-product-chat chat_img_producto">
                            </div>
                        </div>
                        <div class="col-sm-9 pl-md-0">
                            <a href="" class="chat_detalle_prod">
                                <h5 class="name chat_nombre_producto">Tenis Adidas Deerupt Runner - originales</h5>
                            </a>
                            <p class="price chat_precio_producto">300,00 USD</p>
                            <span class=" row descuento">
                                <span class="chat_precio_antes"></span>
                                <p class="descuento chat_desc_porcentaje"></p>
                            </span>
                        </div>
                        <i class="fas fa-chevron-right right-slid chat__nasbi__btnnext"></i>
                    </div>
                    <div class="row text-conect">
                        <p class="_trans563">Conectado con </p>
                        <p class="chat_conectado_con">SportClub Store</p>
                    </div>
                </div>
            </div>

            <div class="modal-body content_scroll px-2 py-0">
                <div class="scroll-chat content_msgs_chat">
                </div>
            </div>

            <div class="modal-footer p-0">
                <div class="row row-enviar-msj">
                    <div class="col-10 col-md-11">
                        <input class="textarea-chat chat_input_mensaje _trans562__ph" contentEditable="true" placeholder="Escribe un mensaje aquí">
                    </div>
                    <div class="col-2 col-md-1 px-0">
                        <label class="btn-camara"><img loading="lazy" src="../imagen/camara-chat.png">
                            <input type="file" class="file-logo chat_subir_foto" accept="image/*">
                        </label>
                    </div>
                </div>
                <div class="row error-msg-no-enviado" style="display: none;">
                    <p class="msg-error _trans561">Tu mensaje no pudo ser enviado, intenta nuevamente</p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal DESACTIVAR CUENTA USUARIO-->
<div class="modal fade" id="modal-desactivar-usuario" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-infMdal">
                    <div class="col-12">

                        <h4 class="_trans886">Desactivar cuenta</h4>
                        <p class="_trans887"></p>
                        <p class="_trans893"></p>
                        <!-- <textarea style="max-width: 100%" class="input_motivo_desact" cols="75" rows="3"></textarea> -->
                        <div class="input-group groupdesactivar group-claves">
                            <input type="password" class="form-control input_motivo_desact">
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-link  btn_eye_desact" value="btnOff">
                                    <i class="icono_eye far fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="contn-entrega">
                            <button class="btnsi trans_02" data-dismiss="modal" aria-label="Close">Cancelar</button>
                            <button class="btnsi trans_01 btn_desactivar_usuario">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>

<script>
    let paramsMisCuentas = new URLSearchParams(location.search);
    let tokenPageView = paramsMisCuentas.get('tokenPageView');
    if (validarText(tokenPageView)) {

        let contentMisCuentas = localStorage.getItem("mis_cuentas");
        if (contentMisCuentas != null) {
            localStorage.removeItem("mis_cuentas");
        }
        console.log("\n\n\n");
        console.log("===========> contentMisCuentas: ", contentMisCuentas);
        console.log("===========> tokenPageView: ", tokenPageView);

        if (tokenPageView == "id-configuracion" && (user.empresa * 1 == 1)) {
            window.location.href = 'editar-empresa.php';
        } else {
            setTimeout(() => {

                console.log("===========> **contentMisCuentas: ", contentMisCuentas);
                console.log("===========> **tokenPageView:    #", tokenPageView);
                console.log("===========> **tokenPageView:    #", tokenPageView);
                console.log("===========> **tokenPageView:    #", tokenPageView);
                console.log("===========> **tokenPageView:    #", tokenPageView);

                localStorage.setItem("mis_cuentas", tokenPageView);
                $('.nav-link').removeClass('active show');
                $('.nav-link').prop('aria-selected', false);
                // $(`#ref-${tokenPageView.split("-")[1]}`).addClass('active show');
                $(`#${tokenPageView}`).click();
            }, 200);

        }

    }
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>

<script src="../js/controllers/dashboard/resumen.js"></script>

<!-- INICIO: SOLO PARA LA IMPLEMENTACION DEL CHAT -->
<script src="../js/socket/fancywebsocket_chat.js"></script>
<script src="../js/controllers/dashboard/chat.js"></script>
<script src="../js/controllers/dashboard/compras.js"></script>
<script src="../js/controllers/ventas.js"></script>
<script src="../js/controllers/facturacion.js"></script>
<!-- FIN: SOLO PARA LA IMPLEMENTACION DEL CHAT -->

<script src="../js/controllers/direcciones.js"></script>
<script src="../js/controllers/dashboard/publicaciones.js"></script>
<script src="../js/controllers/dashboard/publicaciones-revision.js"></script>

<!-- Se realizo una corrección en las sección -->
<script src="../js/controllers/dashboard/configuracion.js"></script>

<!-- Inicio: Para reputacion -->
<script src="../js/controllers/dashboard/reputacion.js"></script>


<!--js de subastas-->
<script src="../js/controllers/dashboard/subastas.js"></script>

</html>