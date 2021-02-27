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
    <meta name="title" content="<?php echo $result["trans252_SEO"] ?>">
    <meta property="og:title" content="<?php echo $result["trans252_SEO"] ?>">
    <meta name="description" content="<?php echo $result["trans253_SEO"] ?>">
    <meta property="og:description" content="<?php echo $result["trans253_SEO"] ?>">
    <!-- <meta class="" property="og:keywords" name="keywords" content=""> -->
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title class="_trans529">Nasbi.com | Registro empresa</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/registro-empresa.css">

</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
    <?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-registro">
            <div class="col-lg-6 px-md-0">
                <button class="text-type"><img src="../imagen/empresa.png"> <span class="_trans868">Registro empresa</span></button>
                <h1 class="textD1 _trans825">HOLA HAY MILLONES<br> DE COMPRADORES<br> QUE TE ESTÁN ESPERANDO.</h1>
                <p class="desc trans_22">Contáctate hoy con un líder y haz parte del marketplace más<br>innovador del mercado.</p>
            </div>

            <div class="col-lg-6 px-md-0">
                <div class="row container-form">
                    <div class="col-6 mensajes ">
                        <p class="text001 _trans07">Completa los datos de tu empresa</p>
                    </div>
                    <div class="col-6 mensajes ">
                        <a class="text001 red_registro_usuario line _trans829">Crea una cuenta personal</a>
                    </div>
                    <br>
                </div>
                <div class="row container-form">
                    <div class="col-sm-6">
                        <input type="text" class="form-control input-form registro__empresa__nit _trans185__ph" placeholder="Nit">
                    </div>
                    <div class="col-sm-6">
                        <input type="text" class="form-control input-form registro__empresa__nombre trans_273__ph" placeholder="Nombre de la empresa">
                    </div>
                </div>
                <div class="row container-form">

                    <div class="col-sm-6">
                        <input type="email" class="form-control input-form registro__empresa__correo _trans186__ph" placeholder="Correo electronico">
                    </div>
                    <div class="col-sm-6">
                        <div class="input-group group-clave">
                            <input type="password" class="form-control input-form registro__empresa__clave _trans187__ph mt-0" placeholder="Clave">
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-link  btn_eye_registroEmp" value="btnOff">
                                    <i class="icono_eye far fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row container-form">
                    <div class="col-sm-12">
                        <select class="form-control input-form registro__empresa__pais "></select>
                    </div>
                </div>
                <div class="row container-form">
                    <div class="col-sm-6">
                        <input type="text" class="form-control input-form registro__empresa__web _trans426__ph" placeholder="Página web">
                    </div>

                    <div class="col-sm-6">
                        <input type="text" class="form-control input-form registro__empresa__referido _trans425__ph" placeholder="Codigo de referido">
                    </div>
                </div>

                <div class="col-12">
                    <div class="captcha">
                        <div id="rcap2" class="img-capcha"></div>
                    </div>
                </div>

                <div class="col-12">
                    <div class="row">
                        <div class="col-md-4 pl-0">
                            <div class="container-btnn">
                                <button class="btn-Env registro__empresa_btnEnviar loadin_registro_empresa ">
                                    <span class="_trans08">CREAR CUENTA</span>
                                    <div class="spinner-border spiner_loading spinner-border-sm" role="status" style="display: none;">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-4 px-0 pl-lg-3">
                            <p class="text-terminos">
                                <span>
                                    <label class="containerCheck">
                                        <input type="checkbox" class="registro_empresa__terms" checked="true">
                                        <span class="spancheckmark"></span>
                                    </label>
                                </span>
                                <a class="registro_empresa_terminos"><span class="trans_38">Acepto los Términos y Condiciones unificados.</span></a>
                            </p>
                        </div>
                        <div class="col-md-4 px-0 pl-lg-3">
                            <p class="text-terminos">
                                <span>
                                    <label class="containerCheck">
                                        <input type="checkbox" class="registro_empresa__politics" checked="true">
                                        <span class="spancheckmark"></span>
                                    </label>
                                </span>
                                <a class="registro_empresa_politica"><span class="trans_39">Acepto las políticas de privacidad y demás Documentos Vinculantes</span></a>
                            </p>

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
<script src="../js/controllers/registro-empresa.js"></script>
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMeqStSqC4lq01HX9yfjqAD8eNHHlWWac&libraries=places" async defer></script>
<script src="https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit" async defer></script>
<script>
    var recaptchaCallback = () => {
        grecaptcha.render("rcap2", {
            sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
            callback: () => {}
        });
    }
</script> -->

</html>



<!-- Modal finalizacion registro -->
<div class="modal fade" id="final-registro" tabindex="-1" role="dialog" aria-hidden="true">
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

                <div class="row row-inf">
                    <h4 class="_trans27">¡Felicidades!</h4>

                    <p class="trans_181">Has creado tu cuenta de empresa con éxito.<br>Hemos enviado un código de verificación a tu correo.</p>

                    <button class=" trans_01 m-auto" data-dismiss="modal" aria-label="Close">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal alertas generales -->
<div class="modal fade" id="modal_alertas_generales" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <h4 class="alerta_titulo"></h4>
                    <p class="alerta_texto"></p>
                    <button class=" trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal confirmar si no -->
<div class="modal fade" id="modal-confirmar-eliminar" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <!-- <button type="button" class="close_"  aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> -->
                    </div>
                </div>

                <div class="row row-inf">
                    <h5 class="pregunta_de_eliminar">¡Buen trabajo!</h5>
                </div>
                <div class="contn-entrega">

                    <button class="btnno trans_02  no_eliminar_direccion">Cancelar</button>
                    <button class="btnsi trans_01  si_eliminar_direccion" data-toggle="modal">Aceptar</button>


                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-confirmar-eliminar-info-empresa" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <!-- <button type="button" class="close_"  aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> -->
                    </div>
                </div>

                <div class="row row-inf">
                    <br>
                    <h4></h4>
                    <p class="pregunta_de_eliminar-info-empresa">¡Buen trabajo!</p>
                </div>
                <div class="contn-entrega">

                    <button class="btnno trans_02  no_eliminar_direccion-info-empresa">Cancelar</button>
                    <button class="btnsi trans_01  si_eliminar_direccion-info-empresa" data-toggle="modal">Aceptar</button>


                </div>
            </div>
        </div>
    </div>
</div>