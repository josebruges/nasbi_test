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
    <meta name="title" content="<?php echo $result["trans249_SEO"]?>">
    <meta property="og:title"  content="<?php echo $result["trans249_SEO"]?>">
    <meta  name="description" content="<?php echo $result["trans250_SEO"]?>">
    <meta property="og:description"  content="<?php echo $result["trans250_SEO"]?>">
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title class="_trans527">Nasbi.com | Promociones</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/promociones.css">
    <link rel="stylesheet" href="../css/filtro-productos.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <!-- Banner promociones -->
        <div class="row mb-5">
            <div class="col-12 p-0">
                <div class="owl-carousel owl-theme" id="carousel-banner-promociones">
                </div>
            </div>


            <!-- Filter -->
            <div class="col-md-3 p-0">
                <div class="col-12 p-0">
                    <div class="row row3-filter">
                        <div class="row">
                            <div class="col-12 p-0">
                                <div class="input-group group-filter">
                                    <input type="text" class="form-control nombreproductopro _trans383__ph" placeholder="¿Qué te gustaría ordenar?">
                                    <span class="input-group-addon buscarnombreproductopro"><i class="fas fa-search"></i></span>
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
                                <form class="condiciondeuso_productpro">
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
                                    <button class="btn-1 trans22_ buscargeneralpro"></button>
                                    <button class="btn-2 trans23_ limpiarpro"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Carousel productos promociones -->
            <div class="col-md-9">
                    <div class="row content__loadingSpinner_filter_promociones">
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
                    
                    <div class="row products__list" style="display: none;"></div>

                    <div class="row products__list__nodata" style="display: none;">
                        <div class="col-lg-12">
                            <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                            <p class="trans_44">Ningún producto por aquí.</p>
                            <label class="trans_45">Regresa más tarde.</label>

                        </div>
                    </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>

<script src="../js/controllers/promociones.js"></script>

</html>

<!-- Modal bienvenida promociones -->
<div class="modal fade" id="bienvenida-promociones" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="trans241_"></h4>
                    <p class="trans242_"></p>
                    <button class="trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>