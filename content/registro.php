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
    <meta name="title" content="<?php echo $result["_trans912_SEO"] ?>">
    <meta property="og:title" content="<?php echo $result["_trans912_SEO"] ?>">
    <meta name="description" content="<?php echo $result["_trans913_SEO"] ?>">
    <meta property="og:description" content="<?php echo $result["_trans913_SEO"] ?>">
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title class="_trans528">Nasbi.com | Registro</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/registro.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
    <?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-registro">
            <img src="../imagen/fondo-registro.jpg" class="img-fondo">
            <div class="col-lg-6">
                <button class="text-type"><img src="../imagen/personas.png"> <span class="_trans869">Registro persona</span></button>
                <h1 class="textD1 trans_21">Compra, vende y <br>subasta productos<br> con múltiples<br> medios de pago.</h1>
                <!-- <p class="desc trans_22">Contáctate hoy con un líder y haz parte del marketplace más<br>innovador del mercado.</p> -->
            </div>

            <div class="col-lg-6">
                <div class="row container-form">
                    <div class="col-12 form-error-control-content">
                        <input type="text" class="form-control input-form registro__name trans_23__ph" placeholder="Nombres y apellidos" maxLength="60">

                        <span class="form-error-control form-error_registro__name trans_24" style="display: none; color: red; font-size: 12px;">*El campo nombres y apellidos es requerido</span>

                    </div>
                    <div class="col-12 form-error-control-content">
                        <input type="text" class="form-control input-form registro__usuario _trans861__ph" placeholder="Nombre de usuario" maxLength="60">

                        <span class="form-error-control form-error_registro__usuario trans519_" style="display: none; color: red; font-size: 12px;"></span>
                        <span class="form-error-control form-error_registro__invaliduser _trana940" style="display: none; color: red; font-size: 12px;"></span>

                    </div>

                    <div class="col-12 form-error-control-content">
                        <input type="email" class="form-control input-form registro__email _trans121__ph" placeholder="Correo electrónico" maxLength="60">

                        <span class="form-error-control form-error_registro__email trans520_" style="display: none; color: red; font-size: 12px;"></span>

                    </div>

                    <div class="col-12 form-error-control-content">
                        <div class="input-group group-clave">
                            <input type="password" class="form-control input-form registro__pass trans_72__ph mt-0" placeholder="Contraseña" maxLength="60">
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-link  btn_eye_registro" value="btnOff">
                                    <i class="icono_eye far fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>

                        <span class="form-error-control form-error_registro__pass trans_73" style="display: none; color: red; font-size: 12px;">*El campo contraseña es requerido</span>
                        <span class="form-error-control form-error_registro__pass_valid _trans892" style="display: none; color: red; font-size: 12px;">*El campo contraseña es requerido</span>


                    </div>

                    <div class="col-12 form-error-control-content">
                        <div class="input-group group-clave">
                            <input type="password" class="form-control input-form registro__confirm__pass trans_75__ph mt-0" placeholder="Contraseña" maxLength="60">
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-link  btn_eye_registro_confirm" value="btnOff">
                                    <i class="icono_eye far fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>


                        <span class="form-error-control form-error_registro__confirm__pass trans_73" style="display: none; color: red; font-size: 12px;">*El campo confirmar contraseña es requerido</span>

                        <span class="form-error-control form-error_registro__nocoincide__pass trans_76" style="display: none; color: red; font-size: 12px;">*Las contraseñas no coinciden</span>

                    </div>

                    <div class="col-12 form-error-control-content">
                        <select class="form-control input-form select-pais registro__country">
                            <option>País</option>
                            <option>Colombia</option>
                        </select>

                        <span class="form-error-control form-error_registro__country trans_27" style="display: none; color: red; font-size: 12px;">*El campo país es requerido</span>

                    </div>

                    <div class="col-md-6 form-error-control-content">
                        <input type="text" class="form-control input-form registro__city trans_28__ph" placeholder="Ciudad" maxLength="60">

                        <span class="form-error-control form-error_registro__city trans_29" style="display: none; color: red; font-size: 12px;">*El campo ciudad es requerido</span>

                    </div>
                    <div class="col-md-6 form-error-control-content">
                        <input type="tel" class="form-control input-form registro__phone__number trans_30__ph" placeholder="Teléfono" maxLength="60">

                        <span class="form-error-control form-error_registro__phone__number trans_31" style="display: none; color: red; font-size: 12px;">*El campo Teléfono es requerido</span>

                    </div>
                    <div class="col-12 form-error-control-content">
                        <input type="text" class="form-control input-form registro__referido _trans425__ph" placeholder="" maxLength="60">

                    </div>

                    <!-- <div class="col-12 form-error-control-content">
                        <select class="form-control input-form registro__interests" placeholder="Teléfono">
                            <option value="t" class="trans_32">Interes</option>
                            <option value="Quiero conocer más" class="trans_33">Quiero conocer más</option>
                            <option value="Deseo ser contactado" class="trans_34">Deseo ser contactado</option>
                            <option value="Quiero registrarme" class="trans_35">Quiero registrarme</option>
                            <option value="Quiero participar en una subasta" class="trans_36">Quiero participar en una subasta</option>
                        </select>

                        <span class="form-error-control form-error_registro__interests trans_37" style="display: none; color: red; font-size: 12px;">*El campo intereses es requerido</span>

                    </div> -->

                    <div class="col-md-6">
                        <p class="text-terminos">
                            <span>
                                <label class="containerCheck">
                                    <input type="checkbox" class="registro__terms" checked="true">
                                    <span class="spancheckmark"></span>
                                </label>
                            </span>
                            <a class="registro_terminos_condiciones">
                                <span class="trans_38">Acepto los Términos y Condiciones unificados.</span></a>
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="text-terminos">
                            <span>
                                <label class="containerCheck">
                                    <input type="checkbox" class="registro__politics" checked="true">
                                    <span class="spancheckmark"></span>
                                </label>
                            </span>
                            <a class="registro_politica_privacidad">
                                <span class="trans_39">Acepto las políticas de privacidad y demás Documentos Vinculantes</span></a>
                        </p>

                    </div>

                    <div class="col-12">
                        <button class="btn-Env registro__btn" type="button">
                            <span class="spinner-border spinner-border-sm registro__btn__spinner" role="status" aria-hidden="true" style="display: none;"></span> <span class="trans_16__btn">Enviar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/registro.js"></script>

</html>

<!-- Modal registro -->
<div class="modal fade" id="bienvenida-registro-user" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal" />
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="_trans10"></h4>
                    <p class="_trans35"></p>
                    <button class="trans_01" data-dismiss="modal" aria-label="Close"></button>
                    <!-- <a href="promociones.php"><button class="trans_01">Aceptar</button></a> -->
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal finalizacion registro -->
<div class="modal fade" id="final-registro" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <h4 class="_trans826"></h4>
                    <p class="_trans827"></p>
                    <button data-dismiss="modal" aria-label="Close" class="trans191"></button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-confirmar-eliminar-info" tabindex="-1" role="dialog" aria-hidden="true">
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