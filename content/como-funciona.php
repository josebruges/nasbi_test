<!DOCTYPE html>
<html lang="en">
<?php
if(array_key_exists("lenguaje", $_COOKIE)){
  $var_PHP = $_COOKIE["lenguaje"];
  $var_PHP =strtoupper($var_PHP);
}else{
 if(array_key_exists("lang", $_GET)){
  $lenguaje_url_metas=$_GET["lang"] ;
  $var_PHP= $lenguaje_url_metas; 
  $var_PHP =strtoupper($var_PHP);
 }else{
  $idioma = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
  $idioma = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,2);
  $idioma =strtoupper($idioma);
  $var_PHP=$idioma; 
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
    <meta name="title" content="<?php echo $result["trans237_SEO"]?>">
    <meta property="og:title" content="<?php echo $result["trans237_SEO"]?>">
    <meta name="description" content="<?php echo $result["trans238_SEO"]?>">
    <meta property="og:description" content="<?php echo $result["trans238_SEO"]?>">
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title class="trans410_" >Nasbi.com | Nosotros</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/como_funciona.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
  <div class="row row-imagen-nosotros">
    <div class="container_log_como_funciona_style">
        <img loading="lazy" src="../imagen/nasbi-white.png" alt="">
    </div>
    <div class="col-sm-8 col-md-4 offset-sm-2 offset-md-6 row-fondo-3-nosotros">
        <!-- <h5 class="text-left trans408_"></h5>
        <p class="text-left trans409_"></p> -->
        <h5 class="text-left trans41_"></h5>
        <p class="text-left trans411_"></p>
    </div>
  </div>
  <div class="row edit-row-como-funciona-1">
    <div class="col-12 p-0">
      <div class="row">
        <div class="col-12 p-0 col-fondo-inteligencia-nosotros">
          <div class="imagen-2-nosotros">
            <h5 class="text-left trans413_"></h5>
            <p class="text-left trans412_"></p>
          </div>

        </div>
      </div>
    </div>

  </div>
  <div class="row edit-row-como-funciona-1">
    <div class="col-12 p-0">
      <div class="row">
        <div class="col-12 p-0 col-fondo-inteligencia-nosotros-2">
          <div class="imagen-2-nosotros-2">
            <h5 class="text-left trans414_"></h5>
            <p class="text-left trans409_"></p>
          
          </div>

        </div>
      </div>
    </div>

  </div>
</body>
<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
</html>

