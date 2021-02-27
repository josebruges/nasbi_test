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
    <meta name="title" content="<?php echo $result["_trans914_SEO"]?>" >
    <meta property="og:title" content="<?php echo $result["_trans914_SEO"]?>" >
    <meta name="description" content="<?php echo $result["_trans915_SEO"]?>" >
    <meta property="og:description" content="<?php echo $result["_trans915_SEO"]?>" >
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title class="_trans513">Nasbi.com | Empresas</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <link rel="icon" href="../imagen/404.svg">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';

    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/empresas.css">
</head>

<!-- Include Navbar : para todas las pantallas-->
<?php
include '../include/manager-navbar.php';
?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <!-- Banner empresas -->
        <div class="row">
            <div class="col-12 p-0">
                <div class="owl-carousel owl-theme" id="carousel-banner-empresas"></div>
            </div>
        </div>

        <!-- Empresas -->
        <div class="row row-rompresas empresas__list"></div>

        <div class="row empresas__list__nodata" style="display: none;">
            <div class="col-lg-12">
                <img src="../imagen/404.svg" width="50%" height="50%" alt="not found">
                <p class="trans_44">Ningún producto por aquí.</p>
                <label class="trans_45">Regresa más tarde.</label>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>

<script src="../js/controllers/empresas.js"></script>

</html>