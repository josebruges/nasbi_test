
<!DOCTYPE html>
<html lang="en">
<?php
$var_PHP="ES"; 
if(array_key_exists("lenguaje", $_COOKIE)){
    $var_PHP = $_COOKIE["lenguaje"];
    $var_PHP =strtoupper($var_PHP);
}else{
  if(array_key_exists("lang", $_GET)){
   $lenguaje_url_metas=urldecode($_GET["lang"]);
   $var_PHP= $lenguaje_url_metas;
   $var_PHP =strtoupper($var_PHP);
  }else{
     if(array_key_exists("nle", $_GET)){
       $lenguaje_url_metas=urldecode($_GET["nle"]);
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
#$ogurl = $_SERVER["HTTP_X_FORWARDED_PROTO"]."://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
#$ogurl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http")."://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
$actualLink =  (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "//$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta property="og:url" content="<?php echo $actualLink;?>"/>
    <meta property="og:type" content="website">
    <meta name="title" content="<?php echo $result["trans246_SEO"];?>"/>
    <meta property="og:title" content="<?php echo $result["trans246_SEO"];?>"/>
    <meta name="description" content="<?php echo $result["trans247_SEO"];?>"/>
    <meta property="og:description" content="<?php echo $result["trans247_SEO"];?>"/>
    <meta name="keywords" content="<?php echo $result["trans248_SEO"];?>"/>
    <meta property="og:keywords" content="<?php echo $result["trans248_SEO"];?>"/>
    <meta property="og:image" content="https://nasbi.com/imagen/Crea-tu-tienda-en-Nasbi.jpg"/>
    <title class="_trans530"></title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';
    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/subastas.css">
    <link rel="stylesheet" href="../css/lightslider.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <!-- Banner subastas -->
        <div class="row">
            <div class="col-12 p-0">
                <div class="owl-carousel owl-theme" id="carousel-banner-subastas">

                </div>
            </div>
        </div>


        <div class="row row-12-back">
            <!-- Subastas nasbi -->
            <div class="col-12 p-0">
                <div class="franja-info _trans135">Subastas nasbi</div>
            </div>
            <div class="col-12">
                <div class="products__list">
                    <div class="owl-carousel owl-theme" id="subastas_anteriores"></div>

                    <a href="nasbi-descuentos-normales.php"><button class="btn-participar trans_124">Ver todas</button></a>
                </div>
                <div class="row products__list__nodata" style="display: none;">
                    <div class="content__nodata">
                        <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                        <p class="label-title_nodata _trans126 ">Ningún producto por aquí.</p>
                        <label class="label-subtitle_nodata trans_45">Regresa más tarde.</label>
                        <br><br><br><br><br><br>
                    </div>
                </div>
            </div>

            <!-- Subastas nasbi premium -->
            <div class="col-12 p-0">
                <div class="franja-info _trans137 franjared">Subastas nasbi premium</div>
            </div>
            <div class="col-12 products__listp">
                <!-- <div class="row" id="proximas_subastas"></div>
                <div class="paginacion"></div> -->

                <div class="owl-carousel owl-theme " id="proximas_subastas"></div>

                <a href="nasbi-descuentos-premium.php"><button class="btn-participar franjared trans_124">Ver todas</button></a>

            </div>
            <div class="row products__listp__nodata" style="display: none;">
                <div class="content__nodata">
                    <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                    <p class="label-title_nodata _trans126 ">Ningún producto por aquí.</p>
                    <label class="label-subtitle_nodata trans_45">Regresa más tarde.</label>
                    <br><br><br><br><br><br>
                </div>
            </div>
        </div>
    </div>
</body>





<!-- Modales Manager -->
<?php include './subastas-modales.php'; ?>


<?php include '../include/footer.php'; ?>

<!-- include general js -->
<?php include '../include/include-js.php'; ?>


<!-- <script src="../js/lightslider.js"></script> -->


<!-- Administrador de eventos GLOBAL: subastasManager.js -->
<script src="../js/controllers/subastas/subastasManager.js"></script>

<script src="../js/controllers/subastas.js"></script>


<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css" />

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/css/lightslider.min.css" integrity="sha256-ev+XS9lVA6/6vEe/p9pncQjsHB6g9UtAZYFLNViXxAA=" crossorigin="anonymous" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/js/lightgallery.min.js"></script>

<script src="https://sachinchoolur.github.io/lightGallery/lightgallery/js/lg-fullscreen.js"></script>

<script src="https://sachinchoolur.github.io/lightGallery/lightgallery/js/lg-zoom.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/js/lightslider.min.js" integrity="sha256-nHmCK+HOPMPezzS3ky9VKznMWH4sW4keT8HrMaDNbYo=" crossorigin="anonymous"></script> -->




<!-- <script>
    $('#slider-subastas').lightSlider({
        gallery: true,
        item: 1,
        loop: true,
        slideMargin: 0,
        thumbItem: 9
    });
</script> -->

</html>