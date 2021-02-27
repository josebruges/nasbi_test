<!DOCTYPE html>
<html lang="en">
<?php
$var_PHP = "ES";
if (array_key_exists("lenguaje", $_COOKIE)) {
    $var_PHP = $_COOKIE["lenguaje"];
    $var_PHP = strtoupper($var_PHP);
} else {
    if (array_key_exists("lang", $_GET)) {
        $lenguaje_url_metas = urldecode($_GET['lang']);
        $var_PHP = $lenguaje_url_metas;
        $var_PHP = strtoupper($var_PHP);
    } else {
        if (array_key_exists("nle", $_GET)) {
            $lenguaje_url_metas = urldecode($_GET['nle']);
            $var_PHP = $lenguaje_url_metas;
            $var_PHP = strtoupper($var_PHP);
        } else {
            $idioma = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
            $idioma = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 2);
            $idioma = strtoupper($idioma);
            $var_PHP = $idioma;
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
    <meta name="title" content="<?php echo $result["_trans910_SEO"] ?>">
    <meta property="og:title" content="<?php echo $result["_trans910_SEO"] ?>">
    <meta name="description" content="<?php echo $result["_trans911_SEO"] ?>" />
    <meta property="og:description" content="<?php echo $result["_trans911_SEO"] ?>" />
    <meta name="keywords" content="<?php echo $result["_trans918_SEO"] ?>">
    <meta property="og:keywords" content="<?php echo $result["_trans918_SEO"] ?>">
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title class="_trans523">Nasbi.com | Nasbi-tickets-compra</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';

    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/nasbi-tickets-compra.css">
</head>

<!-- Include Navbar : para todas las pantallas-->
<?php
include '../include/manager-navbar.php';
?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center" class="pb-5">
        <div class="banner-tickets">
            <div class="content-title">
                <h1 class="title">Tickets <span><img loading="lazy" alt="logo-nasbi-nasbi.com" src="../imagen/logo-footer-en.svg"></span></h1>
                <p class="_trans422">Dependiendo de la subasta en la que quieras participar escoge el ticket de la categoría:</p>
            </div>
            <div class="row row-cards tkc__content_tickets">
                <div class="col-sm-6 col-md-4 px-md-1 px-lg-3 tkc__no_data" style="display:none">
                    <h4 class="_trans455">No hay tickets disponibles</h4>
                </div>
                <!-- <div class="col-sm-6 col-md-4 px-md-1 px-lg-3">
                    <div class="content-card">
                        <div class="card1">
                            <h4>
                                <img src="../imagen/nasbi-tickets/Tickets-bronze.svg" alt="">
                                Tickets <br>Bronze
                            </h4>
                            <p>Para subastas para con artículos entre <b>250 USD</b> y <b>300 USD</b></p>
                        </div>
                        <div class="row card2">
                            <div class="col-4">
                                <input type="number" class="form-control" placeholder="1">
                            </div>
                            <div class="col-8">
                                <h4>7 USD</h4>
                            </div>
                            <div class="col-12">
                                <button>Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 px-md-1 px-lg-3">
                    <div class="content-card">
                        <div class="card1">
                            <h4>
                                <img src="../imagen/nasbi-tickets/Tickets-silver.svg" alt="">
                                Tickets <br>Silver
                            </h4>
                            <p>Para subastas para con artículos entre <b>301 USD</b> y <b>500 USD</b></p>
                        </div>
                        <div class="row card2">
                            <div class="col-4">
                                <input type="number" class="form-control" placeholder="1">
                            </div>
                            <div class="col-8">
                                <h4>9 USD</h4>
                            </div>
                            <div class="col-12">
                                <button>Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 px-md-1 px-lg-3">
                    <div class="content-card">
                        <div class="card1">
                            <h4>
                                <img src="../imagen/nasbi-tickets/Tickets-gold.svg" alt="">
                                Tickets <br>Gold
                            </h4>
                            <p>Para subastas para con artículos entre <b>501 USD</b> y <b>1000 USD</b></p>
                        </div>
                        <div class="row card2">
                            <div class="col-4">
                                <input type="number" class="form-control" placeholder="1">
                            </div>
                            <div class="col-8">
                                <h4>18 USD</h4>
                            </div>
                            <div class="col-12">
                                <button>Comprar</button>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="franja-blue"></div>
        </div>

        <div class="content-title2">

            <h1 class="title2"><span class="_trans60"> Paquetes</span> <span><img loading="lazy" alt="logo-nasbi-nasbi.com" src="../imagen/Logo-en.svg"></span></h1>

        </div>

        <div class="row row-cards pt-0 pb-5 tkc__content_planes">
            <div class="col-sm-6 col-md-4 px-md-1 px-lg-3 tkc__no_data2" style="display:none">
                <h4 class="_trans456">No hay planes disponibles</h4>
            </div>
            <!-- <div class="col-sm-6 col-md-4 px-md-1 px-lg-3">
                <div class="content-card">
                    <div class="card1">
                        <h4>Paquete Emerald</h4>
                        <div class="row row-lista">
                            <div class="col-10 px-0">
                                <p><span><img src="../imagen/nasbi-tickets/Tickets-bronze.svg"></span> Ticket Bronze</p>
                            </div>
                            <div class="col-2 px-2">
                                <p class="text-right">1</p>
                            </div>
                        </div>
                        <div class="row row-lista">
                            <div class="col-10 px-0">
                                <p><span><img src="../imagen/nasbi-tickets/Tickets-silver.svg"></span> Ticket Silver</p>
                            </div>
                            <div class="col-2 px-2">
                                <p class="text-right">1</p>
                            </div>
                        </div>
                    </div>
                    <div class="row card2">
                        <div class="col-4"></div>
                        <div class="col-8">
                            <h4>15 USD</h4>
                        </div>
                        <div class="col-12">
                            <button>Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 px-md-1 px-lg-3">
                <div class="content-card">
                    <div class="card1">
                        <h4>Paquete Ruby</h4>
                        <div class="row row-lista">
                            <div class="col-10 px-0">
                                <p><span><img src="../imagen/nasbi-tickets/Tickets-bronze.svg"></span> Ticket Bronze</p>
                            </div>
                            <div class="col-2 px-2">
                                <p class="text-right">2</p>
                            </div>
                        </div>
                        <div class="row row-lista">
                            <div class="col-10 px-0">
                                <p><span><img src="../imagen/nasbi-tickets/Tickets-silver.svg"></span> Ticket Silver</p>
                            </div>
                            <div class="col-2 px-2">
                                <p class="text-right">1</p>
                            </div>
                        </div>
                        <div class="row row-lista">
                            <div class="col-10 px-0">
                                <p><span><img src="../imagen/nasbi-tickets/Tickets-gold.svg"></span> Ticket Gold</p>
                            </div>
                            <div class="col-2 px-2">
                                <p class="text-right">1</p>
                            </div>
                        </div>
                    </div>
                    <div class="row card2">
                        <div class="col-4"></div>
                        <div class="col-8">
                            <h4>37 USD</h4>
                        </div>
                        <div class="col-12">
                            <button>Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 px-md-1 px-lg-3">
                <div class="content-card">
                    <div class="card1">
                        <h4>Paquete Sapphire</h4>
                        <div class="row row-lista">
                            <div class="col-10 px-0">
                                <p><span><img src="../imagen/nasbi-tickets/Tickets-bronze.svg"></span> Ticket Bronze</p>
                            </div>
                            <div class="col-2 px-2">
                                <p class="text-right">2</p>
                            </div>
                        </div>
                        <div class="row row-lista">
                            <div class="col-10 px-0">
                                <p><span><img src="../imagen/nasbi-tickets/Tickets-silver.svg"></span> Ticket Silver</p>
                            </div>
                            <div class="col-2 px-2">
                                <p class="text-right">2</p>
                            </div>
                        </div>
                        <div class="row row-lista">
                            <div class="col-10 px-0">
                                <p><span><img src="../imagen/nasbi-tickets/Tickets-gold.svg"></span> Ticket Gold</p>
                            </div>
                            <div class="col-2 px-2">
                                <p class="text-right">2</p>
                            </div>
                        </div>
                    </div>
                    <div class="row card2">
                        <div class="col-4"></div>
                        <div class="col-8">
                            <h4>62 USD</h4>
                        </div>
                        <div class="col-12">
                            <button>Comprar</button>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>


    <!-- Form PayU -->
    <?php include '../include/form-payu.php'; ?>

    <!-- MODALES SUBASTAS NASBI NORMAL: Usuario sin inicio de sesión  -->
    <div class="modal fade" id="modal-tkc-nologeado" tabindex="1" role="dialog" aria-hidden="true">
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
                        <div class="col-12" style="text-align: center;">
                            <h5 class="trans_145">Información</h5>

                            <p class="trans_146">Para inscribirte en está subasta inicia sesión en tu cuenta NASBI.</p>

                            <div class="contn-entrega">
                                <button class="btnsi trans_118" data-dismiss="modal" data-toggle="modal" data-target="#modal-login">Inicia sesión</button>
                            </div>

                            <p class="trans_119">Si aún no tienes una cuenta, <a href='registro.php'>regístrate ahora.</a></p>

                            <div class="contn-entrega">
                                <button class="btnsi trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- MODAL Espera confirmacion de PayU -->
    <div class="modal fade" id="modal-ticketsc-info-payu" tabindex="-1" role="dialog" aria-hidden="true">
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

                    <div class="row row-titleEntrega">
                        <div class="col-12">
                            <h5 class="_trans338"></h5>

                            <p class="trans_138">Los compras realizadas a través de una pasarela de pagos deben ser procesados por la plataforma. Este proceso puede tardar unos cuantos segundos <strong>(evite realizar pagos dobles).</strong> Si usted ya realizo el pago de su orden verifique el estado de su transacción dando <a class="modal__tkc__info__payu">click aquí</a></p>

                            <div class="modal__tkc__info__payu__status" style="display: none;">
                                <p class="p_negrillas modal__tkc__info__payu__status__text"> </p>
                            </div>

                            <div class="contn-entrega">
                                <button class="btnno trans_01 " data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/nasbi-tiquets-compra.js"></script>

</html>