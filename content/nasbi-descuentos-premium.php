<!DOCTYPE html>
<html lang="en">
<?php
$var_PHP="ES"; 
if(array_key_exists("lenguaje", $_COOKIE)){
    $var_PHP = $_COOKIE["lenguaje"];
    $var_PHP =strtoupper($var_PHP);
}else{
  if(array_key_exists("lang", $_GET)){
   $lenguaje_url_metas=urldecode($_GET['lang']);
   $var_PHP= $lenguaje_url_metas;
   $var_PHP =strtoupper($var_PHP);
  }else{
     if(array_key_exists("nle", $_GET)){
       $lenguaje_url_metas=urldecode($_GET['nle']);
       $var_PHP= $lenguaje_url_metas;
       $var_PHP =strtoupper($var_PHP);
     }else{
       $idioma = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
       $idioma = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,2);
       $idioma =strtoupper($idioma);
       $var_PHP=$idioma; 
     }
  }
}
$urlbaseNasbi = "https://nasbi.com/json/$var_PHP.json";
$ch = curl_init($urlbaseNasbi);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'User-Agent:' . $_SERVER['HTTP_USER_AGENT']));
$response = curl_exec($ch);
$result =  json_decode($response, true);
curl_close($ch);
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="title" content="<?php echo $result["_trans904_SEO"]?>" >
    <meta property="og:title" content="<?php echo $result["_trans904_SEO"]?>" >
    <meta name="description" content="<?php echo $result["_trans905_SEO"]?>" >
    <meta property="og:description" content="<?php echo $result["_trans905_SEO"]?>" >
    <title class="_trans532">Nasbi.com | Subastas Premium Nasbi</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';
    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/subastas.css">
    <link rel="stylesheet" href="../css/lightslider.css">
    <link rel="stylesheet" href="../css/subastas-premium.css">
    <link rel="stylesheet" href="../css/filtro-productos.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <!-- <button data-toggle="modal" data-target="#modal-new-subastas">New modal</button> -->

        <!-- Banner subastas -->
        <div class="row">
            <div class="col-12 p-0">
                <div class="owl-carousel owl-theme" id="carousel-banner-subastas-premium"></div>
            </div>

            <div class="col-12 p-0">
                <div class="franja-info trans438_"></div>
            </div>
        </div>

        <div class="row row-circle">
            <div class="col-sm-6 col-lg-3 col3circle">
                <div class="div-circle"></div>
                <div class="container-info">
                    <span class="number">1.</span>
                    <span><img src="../imagen/subastas/paso4.png"></span>
                    <span class="text-inf trans439_"></span>
                </div>
            </div>
            <div class="col-sm-6 col-lg-3 col3circle">
                <div class="div-circle"></div>
                <div class="container-info">
                    <span class="number">2.</span>
                    <span><img src="../imagen/subastas/one-ticket.png"></span>
                    <span class="text-inf trans440_"></span>
                </div>
            </div>
            <div class="col-sm-6 col-lg-3 col3circle">
                <div class="div-circle"></div>
                <div class="container-info">
                    <span class="number">3.</span>
                    <span><img src="../imagen/subastas/paso2.png"></span>
                    <span class="text-inf trans441_"></span>
                </div>
            </div>
            <div class="col-sm-6 col-lg-3 col3circle">
                <div class="div-circle"></div>
                <div class="container-info">
                    <span class="number">4.</span>
                    <span><img src="../imagen/subastas/hand-up.png"></span>
                    <span class="text-inf trans442_"></span>
                </div>
            </div>
        </div>

        <!-- <div class="row row-12-back">
            <!-- Subastas nasbi
            <div class="col-12">
                <div class="owl-carousel owl-theme carousel-subastas" id="subastas-nasbi-premium">
                    <!-- <div class="item">
                        <div class="row row-container-destacado" data-toggle="modal" data-target="#modal-info-public">
                            <div class="col-12 px-2">
                                <div class="container-destacado">
                                    <img src="../imagen/destacados/camara.png" class="imagen-destacados">
                                </div>
                                <h4 class="nombre-producto">Sony Alpha A6400</h4>
                                <p class="descripcion-product">Valor real</p>
                                <h4 class="price-product">300,00 USD</h4>

                                <p class="descripcion-product">Valor pagado</p>
                                <h4 class="price-product">100,00 USD</h4>
                                <button class="btn-comprar">PLATINUM TICKET</button>
                            </div>
                        </div>

                        <div class="row row-container-destacado" data-toggle="modal" data-target="#modal-info-public">
                            <div class="col-12 px-2">
                                <div class="container-destacado">
                                    <img src="../imagen/destacados/camara.png" class="imagen-destacados">
                                </div>
                                <h4 class="nombre-producto">Sony Alpha A6400</h4>
                                <p class="descripcion-product">Valor real</p>
                                <h4 class="price-product">300,00 USD</h4>

                                <p class="descripcion-product">Valor pagado</p>
                                <h4 class="price-product">100,00 USD</h4>
                                <button class="btn-comprar">PLATINUM TICKET</button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div> -->


        <div class="row mb-5">
            <!-- Filter -->
            <div class="col-md-3 p-0">
                <div class="col-12 p-0">
                    <div class="row row3-filter">
                        <div class="row">
                            <div class="col-12 p-0">
                                <div class="input-group group-filter">
                                    <input type="text" class="form-control buscarnombre_subasta_pre _trans383__ph" placeholder="¿Qué te gustaría ordenar?">
                                    <span class="input-group-addon buscarsubasta_pre"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                        </div>


                        <div class="row row-filter">
                            <div class="col-9">
                                <p class="label trans31_ ">Tiempo de uso:</p>
                            </div>
                            <div class="col-3">
                                <i class="fas fa-angle-down" data-toggle="collapse" data-target="#tiempo-uso"></i>
                            </div>
                            <div class="col-12 collapse" id="tiempo-uso">
                                <form class="condiciondeuso_subasta_pre">
                                    <p class="tex-radio"><span class="trans_47"></span> <span><input type="Radio" name="colorinpro" value="0" class="tratex-radio ns_47"> </span></p>

                                    <p class="tex-radio"><span class="trans_48"></span> <span><input type="Radio" name="colorinpro" value="1" class="tratex-radio ns4"></span></p>

                                    <p class="tex-radio"><span class="trans_49"></span> <span><input type="Radio" name="colorinpro" value="2" class="tratex-radio ns5"></span></p>

                                    <p class="tex-radio"><span class="trans_50"></span> <span><input type="Radio" name="colorinpro" value="3" class="tratex-radio ns6"></span></p>
                                </form>
                            </div>
                        </div>


                        <div class="row row-filter">
                            <div class="col-9">
                                <p class="label trans_51">Garantia:</p>
                            </div>
                            <div class="col-3">
                                <i class="fas fa-angle-down" data-toggle="collapse" data-target="#garantia"></i>
                            </div>
                            <div class="col-12 collapse" id="garantia">
                                <form class="respuestagarantiapro">
                                    <p class="tex-radio"><span class="trans_47"></span> <span><input type="Radio" name="colorinpro" value="2" class="trans4"></span></p>

                                    <p class="tex-radio"><span class="trans24_"></span> <span><input type="Radio" name="colorinpro" value="1" class="trans4"> </span></p>

                                    <p class="tex-radio"><span class="trans25_"></span> <span><input type="Radio" name="colorinpro" value="0" class="trans5"></span></p>
                                </form>
                            </div>
                        </div>


                        <div class="row row-filter">
                            <div class="col-9">
                                <p class="label trans33_">Envio</p>
                            </div>
                            <div class="col-3">
                                <i class="fas fa-angle-down" data-toggle="collapse" data-target="#promocion2"></i>
                            </div>
                            <div class="col-12 collapse" id="promocion2">
                                <form class="tipoenviopro">
                                    <p class="tex-radio"><span class="trans_47"></span> <span><input type="Radio" name="colorinpro" value="0" class="trans4"> </span></p>

                                    <p class="tex-radio"><span class="trans26_"></span> <span><input type="Radio" name="colorinpro" value="1" class="trans5"> </span></p>

                                    <p class="tex-radio"><span class="trans27_"></span> <span><input type="Radio" name="colorinpro" value="2" class="trans5"> </span></p>

                                    <p class="tex-radio"><span class="trans28_"></span> <span><input type="Radio" name="colorinpro" value="3" class="trans5"> </span></p>
                                </form>
                            </div>
                        </div>


                        <div class="row row-filter">
                            <div class="col-9">
                                <p class="label trans34_">Ordenamiento </p>
                            </div>
                            <div class="col-3">
                                <i class="fas fa-angle-down" data-toggle="collapse" data-target="#ordenamiento"></i>
                            </div>
                            <div class="col-12 collapse" id="ordenamiento">
                                <form class="ordenamientoproductopro">

                                    <p class="tex-radio"><span class="trans29_"></span> <span><input type="Radio" name="colorinpro" value="ASC" class="trans4"> </span></p>

                                    <p class="tex-radio"><span class="trans30_"></span> <span><input type="Radio" name="colorinpro" value="DESC" class="trans5"></span></p>
                                </form>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 px-2">
                                <div class="content-btn-filter">
                                    <button class="btn-1 trans22_ buscarsubasta_pre"></button>
                                    <button class="btn-2 trans23_ limpiarsubasta_pro"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Carousel productos promociones -->
            <div class="col-md-9">
                <div class="row content__loadingSpinner_filter_subasta_pre">
                    <div class="col-lg-12"><br><br><br></div>
                    <div class="col-lg-12">
                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>

                <div class="row products__list_subasta"></div>

                <div class="row products__list__nodata_subasta">
                    <div class="col-lg-12">
                        <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                        <p class="trans_44">Ningún producto por aquí.</p>
                        <!-- <label class="trans_45">Regresa más tarde.</label> -->

                    </div>
                </div>
                <div class="list__subasta_pre__pagination"></div>
            </div>
        </div>




    </div>
</body>


<!-- Modal info subastas con botones -->
<!-- <div class="modal fade" id="modal-info-subastas" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9 col-lg-4 pr-0">
                        <img src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-12 col-lg-7 col7none">
                        <p class="header-modal-label">Estado de subasta: <span>Activa</span></p>
                    </div>
                    <div class="col-3 col-lg-1">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="col-12 col12none">
                        <p class="header-modal-label">Estado de subasta: <span>Activa</span></p>
                    </div>
                </div>

                <div class="row infor-subas">
                    <div class="col-lg-6">
                        <div class="owl-carousel owl-theme carousel-info-subastas">
                            <div class="item">
                                <div class="content-foto">
                                    <img src="../imagen/destacados/celular.png" class="img-carousel">
                                </div>
                            </div>
                            <div class="item">
                                <div class="content-foto">
                                    <img src="../imagen/destacados/celular.png" class="img-carousel">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 pl-lg-0">
                        <h4 class="nombre-producto-modal">Xiaomi Redmi Note 8 64 GB</h4>
                        <p class="label-modal">Valor real</p>
                        <h4 class="price-product-modal">300,00 USD</h4>
                        <h4 class="label02">Tipo de subasta: <span class="tipo-subasta gold">Bronce <img src="../imagen/medalla.png"></span></h4>
                        <h4 class="label02">Participantes: <span class="return">22</span></h4>
                        <h4 class="label02">Tickets de subasta: <span class="return">12</span></h4>
                    </div>

                    <div class="col-lg-4 px-2">
                        <a href="mis-nasbi-descuentos.php"><button class="btn1">INSCRIBÍRSE</button></a>
                    </div>
                    <div class="col-lg-4 px-2">
                        <a href="tickets.php"><button class="btn2">RECARGAR TICKETS</button></a>
                    </div>
                    <div class="col-lg-4 px-2">
                        <button class="btn3">PARTICIPAR POR PRIMER VEZ</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> -->


<!-- Modal info subasta solo informacion -->
<div class="modal fade" id="modal-info-public" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9 col-lg-4 pr-0">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-12 col-lg-7 col7none">
                        <p class="header-modal-label">Estado de subasta: <span>Finalizada</span></p>
                    </div>
                    <div class="col-3 col-lg-1">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="col-12 col12none">
                        <p class="header-modal-label">Estado de subasta: <span>Finalizada</span></p>
                    </div>
                </div>

                <div class="row infor-subas py-5">
                    <div class="col-lg-6">
                        <div class="owl-carousel owl-theme carousel-info-subastas">
                            <div class="item">
                                <div class="content-foto">
                                    <img src="../imagen/product.jpg" class="img-carousel">
                                </div>
                            </div>
                            <div class="item">
                                <div class="content-foto">
                                    <img src="../imagen/product.jpg" class="img-carousel">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 pl-lg-0">
                        <h4 class="nombre-producto-modal">Xiaomi Redmi Note 8 64 GB</h4>
                        <p class="label-modal">Valor real</p>
                        <h4 class="price-product-modal">300,00 USD</h4>
                        <p class="label-modal">Hash</p>
                        <h4 class="price-product-modal">Xwnlkqwejfwfjklwbjfwiefiwl</h4>
                        <button class="btn1 mt-3" data-toggle="modal" data-target="#modal-compartir-subasta">Volver a subastas</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modales Manager -->
<?php include './subastas-modales.php'; ?>


<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>


<!-- Administrador de eventos GLOBAL: subastasManager.js -->
<script src="../js/controllers/subastas/subastasManager.js"></script>
<script src="../js/controllers/subastas/subastas-premium.js"></script>




<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css" />

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/css/lightslider.min.css" integrity="sha256-ev+XS9lVA6/6vEe/p9pncQjsHB6g9UtAZYFLNViXxAA=" crossorigin="anonymous" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/js/lightgallery.min.js"></script>

<script src="https://sachinchoolur.github.io/lightGallery/lightgallery/js/lg-fullscreen.js"></script>

<script src="https://sachinchoolur.github.io/lightGallery/lightgallery/js/lg-zoom.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/js/lightslider.min.js" integrity="sha256-nHmCK+HOPMPezzS3ky9VKznMWH4sW4keT8HrMaDNbYo=" crossorigin="anonymous"></script>

<script>
    $('#slider-subastas').lightSlider({
        gallery: true,
        item: 1,
        loop: true,
        slideMargin: 0,
        thumbItem: 9
    });
</script> -->

</html>