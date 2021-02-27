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
    <meta property="og:title" name="title" content="<?php echo $result["trans244_SEO"]?>">
    <meta name="description" content="<?php echo $result["trans245_SEO"]?>">
    <meta property="og:description" content="<?php echo $result["trans245_SEO"]?>">
    <meta name="keywords" content="<?php echo $result["trans251_SEO"]?>">
    <meta property="og:keywords" content="<?php echo $result["trans251_SEO"]?>">
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title class="trans_164">Nasbi.com | Referir negocio</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';

    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/referir-negocio.css">
</head>

<!-- Include Navbar : para todas las pantallas-->
<?php
include '../include/manager-navbar.php';
?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <!-- Referir negocio parte 1 -->
        <div class="row row-cont referir-negocio-1-crear-solicitud" style="display: none;">
            <div class="col-md-5 col-lg-6"></div>
            <div class="col-md-7 col-lg-6">
                <h3 class="trans_165">Referir negocio</h3>
                <p class="trans_166">Te damos nuevas herramientas para que obtengas ingresos extras refiriendo negocios. ¿Te animás?</p>

                <button class="btn-referir referir__negocio__crearsolicitud__btn">

                    <span class="spinner-border spinner-border-sm referir__negocio__crearsolicitud__btn__spinner" role="status" aria-hidden="true" style="display: none;"></span>

                    <span class="trans_167">Quiero empezar a referir</span>

                </button>

                <div class="row row-beneficios">
                    <div class="col-12 px-0">
                        <h5 class="trans_168">Estos son tus beneficios</h5>
                    </div>
                    <div class="col-sm-4 px-0">
                        <div class="card-beneficios">
                            <img loading="lazy" src="../imagen/beneficio.png" alt="nasbi.com">
                            <p>Beneficio 1</p>
                        </div>
                    </div>
                    <div class="col-sm-4 px-0">
                        <div class="card-beneficios">
                            <img loading="lazy" src="../imagen/beneficio.png" alt="nasbi.com">
                            <p>Beneficio 2</p>
                        </div>
                    </div>
                    <div class="col-sm-4 px-0">
                        <div class="card-beneficios">
                            <img loading="lazy" src="../imagen/beneficio.png" alt="nasbi.com">
                            <p>Beneficio 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Referir negocio parte 2 -->
        <!-- <div class="referir-negocio-2-visualizar-pago" style="display: none;">
            <div class="row row-cont2">
                <div class="col-md-5 col-lg-6"></div>
                <div class="col-md-7 col-lg-6">
                    <h3 class="trans_165">Referir negocio</h3>
                    <h1><span>Solo con $39 USD</span> <br>Puedes Aumentar <br> Tus Ganancias</h1>

                    <p class="desc trans_166">Te damos nuevas herramientas para que obtengas ingresos extras refiriendo negocios. ¿Te animás?</p>

                    <p class="label-codigo trans_171">Código de referido</p>
                    <div class="form-group group-ref">
                        <input type="text" class="form-control trans_172__ph refer__negocio__key" placeholder="Escribe el código de referido" readonly="">
                        <button class="boton-empezar-rf trans_173">QUIERO EMPEZAR A REFERIR</button>
                    </div>
                </div>
            </div>
            <div class="row row-secund-form">
                <div class="col-lg-6 pr-xl-5">
                    <div class="row">
                        <div class="col-12 px-0">
                            <p class="text-info-right trans_174">PAGO PARA ACTIVACIÓN DE MEMBRESÍA 
                                <span class="animate-flicker">
                                    <i class="fas fa-angle-right right3"></i><i class="fas fa-angle-right right2"></i><i class="fas fa-angle-right"></i>
                                </span>
                            </p>
                        </div>
                        <div class="col-sm-4 px-0">
                            <div class="card-beneficios bnf2">
                                <img loading="lazy" src="../imagen/beneficio.png" alt="nasbi.com">
                                <p>Beneficio 1</p>
                            </div>
                        </div>
                        <div class="col-sm-4 px-0">
                            <div class="card-beneficios bnf2">
                                <img loading="lazy" src="../imagen/beneficio.png" alt="nasbi.com">
                                <p>Beneficio 2</p>
                            </div>
                        </div>
                        <div class="col-sm-4 px-0">
                            <div class="card-beneficios bnf2">
                                <img loading="lazy" src="../imagen/beneficio.png" alt="nasbi.com">
                                <p>Beneficio 3</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="row row-form-2">
                        <div class="col-12 px-0 mb-2">
                            <h6 class="trans63">Detalles de pago</h6>
                        </div>
                        <div class="col-6 px-0">
                            <p class="label-mts"><b class="trans_175">Valor de membresía</b></p>
                            <p class="label-mts trans_176">Total en saldo dorado</p>
                        </div>
                        <div class="col-6 px-0">
                            <p class="return-mts refer__negocio__amount__usd">$39 USD</p>
                            <p class="return-mts">
                                <span class="refer__negocio__amount__coin">0.6832728 </span>  <img loading="lazy" src="../imagen/icon_wallets/nasbi_gold.png" alt="nasbi.com">
                            </p>
                        </div>

                        <div class="col-12 px-0  mt-3">
                            <h6>Vínculo a billetera</h6>
                            <p class="text-vinculo">SDFDFKjshfy37iafgg7fg7bz <img loading="lazy" src="../imagen/copi-black.png" alt="nasbi.com"></p>
                        </div>

                        <div class="col-12 px-0">
                            <div class="row rowQR">
                                <div class="col-sm-2 px-0">
                                    <img loading="lazy" src="../imagen/Qr.png" alt="nasbi.com">
                                </div>
                                <div class="col-sm-10">
                                    <p class="textTime">Tiempo para el pago <br><span>29m 55s</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-9 px-0">
                            <h6>Hash de confirmación de pago</h6>
                            <p class="label-mts">4705638473ohdsjak9687</p>
                        </div>

                        <div class="col-12 px-0">
                            <p class="trans_179">Pagar con:</p>
                        </div>

                        <div class="col-sm-6 px-0">
                            <button class="btnenviar refer__negocio__payu__btn">
                                Pay Ü
                            </button>
                        </div>
                        <div class="col-sm-6 px-0">
                            <button class="btnenviar trans37_ refer__negocio__payu__wallet">
                                Saldo dorado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->


        <!-- Referir negocio parte 3 -->
        <div class="row row-cont content3 referir-negocio-3-visualizar-mi-refercode" style="display: none;">
            <div class="col-md-5 col-lg-6"></div>
            <div class="col-md-7 col-lg-6 px-md-0">
                <div class="div-padd">
                    <h3 class="trans_165">Referir negocio</h3>
                    <p class="trans_166">Te damos la herramienta para que obtengas ingresos extras refiriendo negocios, puedes referir todos los que tu quieras. ¿Te animás?</p>
                </div>
                <div class="card-codig">
                    <p class="trans_180">Este es tu código para tus referidos</p>
                    <div class="row">
                        <input type="text" class="form-control trans_171__ph referir__negocio__refercode" placeholder="Mi código de feferidos" readonly="">
                        <div class="texto_copiado" style="display: none;">
                            <p class="_trans403">copiado</p>
                        </div>
                    </div>

                    <div class="cont-bttns">
                        <button class="btnRds bt1 compartir_codigo_fb"><i class="fab fa-facebook-f"></i></button>
                        <button class="btnRds bt2 compartir_codigo_in"><i class="fab fa-linkedin-in"></i></button>
                        <button class="btnRds bt3 compartir_codigo_wsp"><i class="fab fa-whatsapp"></i></button>
                        <button class="btnRds bt4 compartir_codigo_gl"><i class="far fa-copy"></i></button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>

<script src="../js/controllers/referir-negocio.js"></script>

</html>



<!-- Modal finalizacion registro -->
<div class="modal fade" id="modal-confirm" tabindex="-1" role="dialog" aria-hidden="true">
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

                <div class="row row-inf">
                    <h4 class="trans_177">Confirmación</h4>
                    <p class="trans_178">Enviarémos un correo electrónico cuando tu perfil esté activado.</p>
                    <button class="trans_01 refer__negocio__amount__confirm" data-dismiss="modal" aria-label="Close">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>