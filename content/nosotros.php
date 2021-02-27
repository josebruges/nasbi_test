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
  <meta name="title" content="<?php echo $result["trans234_SEO"]?>">
  <meta property="og:title" content="<?php echo $result["trans234_SEO"]?>">
  <meta name="description" content="<?php echo $result["trans235_SEO"]?>">
  <meta property="og:description" content="<?php echo $result["trans235_SEO"]?>">
  <meta name="keywords" content="<?php echo $result["trans236_SEO"]?>">
  <meta property="og:keywords" content="<?php echo $result["trans236_SEO"]?>">
  <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
  <title class="trans291_">Nasbi.com | Nosotros</title>
  <link rel="icon" href="../imagen/Logo-Blanco.png">
  <!-- Include General Css -->
  <?php include '../include/include-css.php';
  include '../include/head-js.php'; ?>
  <!-- link css -->
  <link rel="stylesheet" href="../css/nosotros.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body class="body_nosotros">
<?php include '../include/body_general.php'; ?>
  <div class="row row-imagen-nosotros">
    <div class="col-12">
      <div class="card1">
        <h3 class="trans511_"></h3>
        <!-- <h3 class="_trans264" ></h3> -->
        <div class="hrcard hr1"></div>
        <p class="trans292_">Somos una comunidad que fomenta la educación por medio del aprovechamiento de plataformas tecnológicas, logrando el aprendizaje constante de sus managers que les permitirá cumplir sus sueños y alcanzar sus metas.</p>
      </div>
    </div>
  </div>


  <div class="row row-aprende">
    <div class="col-md-6">
      <img src="../imagen/nosotros/aprende.png">
    </div>
    <div class="col-md-6">
      <div class="content01">
        <h5 class="trans293_">Aprende</h5>
        <!-- <h5 class="trans293_"></h5> -->
        <div class="hrcard hr2"></div>
        <p class="trans294_"></p>
        <a name="" id="" class="btn btn-primary btn-ver-nosotros trans295_" role="button"></a>
      </div>
    </div>
  </div>


  <div class="row row-sueno">
    <div class="col-md-6">
      <div class="content02">
        <h5 class="trans296_">Cumple <br>tus sueños</h5>
        <!-- <h5 class="trans296_"></h5> -->
        <div class="hrcard hr2"></div>
        <p class="trans297_"></p>
        <a name="" id="" class="btn btn-primary btn-ver-nosotros btn-hide trans295_" role="button"></a>
      </div>
    </div>
    <div class="col-md-6">
      <img src="../imagen/nosotros/suenos.png">
    </div>
  </div>
</body>
<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/nosotros.js"></script>

</html>