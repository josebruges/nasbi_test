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
    <meta name="title" content="<?php echo $result["trans231_SEO"] ?>">
    <meta property="og:title" content="<?php echo $result["trans231_SEO"] ?>">
    <meta name="description" content="<?php echo $result["trans232_SEO"] ?>">
    <meta property="og:description" content="<?php echo $result["trans232_SEO"]?>">
    <meta property="og:keywords" name="keywords" content="<?php echo $result["trans233_SEO"] ?>">
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title>Nasbi.com</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- include general css -->
    <?php
    include '../include/include-css.php';

    include '../include/head-js.php';
    ?>

    <!-- link css -->
    <link rel="stylesheet" href="../css/style.css">

</head>

<!-- Include Navbar : para todas las pantallas-->
<?php
include '../include/manager-navbar.php';
?>


<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row">
            <!-- Banner Home -->
            <div class="col-12 p-0">
                <div class="owl-carousel owl-theme" id="carousel-banner"></div>
            </div>

            <!-- Categorias -->
            <div class="col-12 p-0">
                <div class="franja-info _trans221"></div>
            </div>
            <div class="col-12">
                <!-- Categorias actualizasas -->
                <div class="conatiner-categorias">
                    <div class="go-filter-producto" id="107">
                        <img loading="lazy" src="../imagen/categorias/consola.png" alt="nasbi.com">
                        <h5 class="trans502_"></h5>
                    </div>
                    <div class="go-filter-producto" id="109">
                        <img loading="lazy" src="../imagen/categorias/electrodomesticos.png" alt="nasbi.com">
                        <h5 class="trans503_"></h5>
                    </div>
                    <div class="go-filter-producto" id="117">
                        <img loading="lazy" src="../imagen/categorias/smart.png" alt="nasbi.com">
                        <h5 class="trans504_"></h5>
                    </div>
                    <div class="go-filter-producto" id="111">
                        <img loading="lazy" src="../imagen/categorias/sonido.png" alt="nasbi.com">
                        <h5 class="trans505_"></h5>
                    </div>
                    <div class="go-filter-producto" id="120">
                        <img loading="lazy" src="../imagen/categorias/calzado.png" alt="nasbi.com">
                        <h5 class="trans506_"></h5>
                    </div>
                    <div class="go-filter-producto" id="103">
                        <img loading="lazy" src="../imagen/categorias/camaras.png" alt="nasbi.com">
                        <h5 class="trans507_"></h5>
                    </div>
                    <div class="go-filter-producto" id="112">
                        <img loading="lazy" src="../imagen/categorias/computadores.png" alt="nasbi.com">
                        <h5 class="trans508_"></h5>
                    </div>
                    <div class="go-filter-producto" id="102">
                        <img loading="lazy" src="../imagen/categorias/belleza.png" alt="nasbi.com">
                        <h5 class="trans509_"></h5>
                    </div>
                </div>


                <!-- Categotias funcionales antes de la nueva actualizacion -->
                <!-- <div class="conatiner-categorias">
                    <div class="go-filter-producto" id="15032">
                        <img loading="lazy" src="../imagen/categorias/Telefono.png" alt="nasbi.com">
                        <h5 class="_trans222">smartphones</h5>
                    </div>
                    <div class="go-filter-producto" id="11450">
                        <img loading="lazy" src="../imagen/categorias/Zapatos.png" alt="nasbi.com">
                        <h5 class="_trans223">Sneakers</h5>
                    </div>
                    <div class="go-filter-producto" id="625">
                        <img loading="lazy" src="../imagen/categorias/Camara.png" alt="nasbi.com">
                        <h5 class="_trans224">Cámaras</h5>
                    </div>
                    <div class="go-filter-producto" id="11450">
                        <img loading="lazy" src="../imagen/categorias/Bolso.png" alt="nasbi.com">
                        <h5 class="_trans225">Moda</h5>
                    </div>
                    <div class="go-filter-producto" id="9800">
                        <img loading="lazy" src="../imagen/categorias/Llanta.png" alt="nasbi.com">
                        <h5 class="_trans226">Vehículos</h5>
                    </div>
                    <div class="go-filter-producto" id="12576">
                        <img loading="lazy" src="../imagen/categorias/Herramientas.png" alt="nasbi.com">
                        <h5 class="_trans227">Herramientas</h5>
                    </div>
                    <div class="go-filter-producto" id="281">
                        <img loading="lazy" src="../imagen/categorias/Relojes.png" alt="nasbi.com">
                        <h5 class="_trans228">Relojes</h5>
                    </div>
                    <div class="go-filter-producto" id="11450:313">
                        <img loading="lazy" src="../imagen/categorias/Gafas.png" alt="nasbi.com">
                        <h5 class="_trans229">Gafas</h5>
                    </div>
                </div> -->
            </div>

            <!-- Destacados -->
            <div class="col-12 p-0">
                <div class="franja-info _trans230">Productos destacados</div>
            </div>
            <div class="col-12 py-4">
                <div class="owl-carousel owl-theme" id="carousel-destacados"></div>

                <!-- Seleccionar la categoria a vender -->
                <div class="row row-fondo carousel-destacados-vacio" style="display: none;">
                    <div class="col-12">
                        <h3 class="title-section trans7"></h3>
                        <p class="desc-section trans_41"></b></p>
                        <div class="container-cat __tiposProdutos"></div>
                    </div>
                    <button class="button-siguiente __nexttipo1 boton_a_vender trans24">Siguiente</button>
                </div>
            </div>


            <!-- Banner Shop Buy -->
            <div class="col-md-6 px-0">
                <div class="containers-banner banner-shop">
                    <img loading="lazy" src="../imagen/Logo-Shop.png" class="logo-banners" alt="nasbi.com">
                    <h1 class=" _trans231">Crea tu <br>propia empresa</h1>
                    <p class="_trans232">Impulsa tus ganancias a donde nunca pensaste por medio de tu celular.</p>
                    <button class="btn-shop btn_crear_empresa _trans233">Comienza ya</button>
                </div>
            </div>
            <div class="col-md-6 px-0">
                <div class="containers-banner banner-buy">
                    <img loading="lazy" src="../imagen/Logo-buy.png" class="logo-banners2" alt="nasbi.com">
                    <h1 class="_trans234">¡Adquiere ya <br>tus tickets!</h1>
                    <p class="_trans235">y no te pierdas de ninguna subasta.</p>
                    <a><button onclick="misTickets()" class="_trans236">Quiero mis tickets</button></a>
                </div>
            </div>


            <!-- Productos nuevos -->
            <div class="col-12 p-0">
                <div class="franja-info _trans237">Productos nuevos</div>
            </div>
            <div class="col-12 py-4">
                <div class="owl-carousel owl-theme" id="carousel-productos-nuevos"></div>

                <!-- Seleccionar la categoria a vender -->
                <div class="row row-fondo carousel-productos-nuevos-vacio" style="display: none;">
                    <div class="col-12">
                        <h3 class="title-section trans7"></h3>
                        <p class="desc-section trans_41"></b></p>
                        <div class="container-cat __tiposProdutos"></div>
                    </div>
                    <button class="button-siguiente __nexttipo1 boton_a_vender trans24">Siguiente</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container-chat-f banner-llamada-2">
        <a class=" _trans508__href" href="" target="_blank">
            <div class="card1 _trans238" style="cursor: pointer;">¿TIENES DUDAS? PREGÚNTANOS</div>
        </a>
        <a class=" _trans508__href" href="" target="_blank">
            <div class="card2 _trans239" style="cursor: pointer;">COMENZAR CHAT
                <span><img loading="lazy" alt="nasbi.com" src="../imagen/Icono-chat.png" class="icon-web "></span>
            </div>
        </a>
        <a class="_trans508__href" href="" target="_blank">
            <img alt="logo-wsp - nasbi.com" loading="lazy" src="../imagen/Icono-chat.png" class="icon-responsive ">
        </a>

    </div>
</body>

<?php include '../include/footer.php'; ?>

<!-- Include General JS -->
<?php include '../include/include-js.php'; ?>

</html>