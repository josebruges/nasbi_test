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
      if(array_key_exists("nle", $_GET)){
        $lenguaje_url_metas=$_GET["nle"];
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
    <meta name="title" content="<?php echo $result["trans239_SEO"]?>">
    <meta property="og:title" content="<?php echo $result["trans239_SEO"]?>">
    <meta name="description" content="<?php echo $result["trans240_SEO"]?>">
    <meta property="og:description" content="<?php echo $result["trans240_SEO"]?>">
    <meta name="keywords" content="<?php echo $result["trans241_SEO"]?>">
    <meta property="og:keywords" content="<?php echo $result["trans241_SEO"]?>">
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title class="_trans810">Nasbi.com | Contacto</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/contacto.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>

    <div align="center">
        <div class="row row-registro">
            <div class="col-lg-6">
                <h1 class="textD1 trans_21">Compra, vende y <br>subasta productos<br> con múltiples<br> medios de pago.</h1>
                <p class="desc trans_22">Contáctate hoy con un líder y haz parte del marketplace más<br>innovador del mercado.</p>
            </div>

            <div class="col-lg-6">
                <div class="row container-form">
                    <div class="col-12 form-error-control-content">
                        <input type="text" class="form-control input-form contacto__name trans_23__ph" placeholder="Nombres y apellidos" maxLength="60">

                        <span class="form-error-control form-error_contacto__name trans_24" style="display: none; color: red; font-size: 12px;">*El campo nombres y apellidos es requerido</span>

                    </div>

                    <div class="col-12 form-error-control-content">
                        <input type="email" class="form-control input-form contacto__email _trans121__ph" placeholder="Correo electrónico" maxLength="60">

                        <span class="form-error-control form-error_contacto__email trans520_" style="display: none; color: red; font-size: 12px;"></span>

                    </div>

                    <div class="col-12 form-error-control-content">
                        <select class="form-control input-form contacto__country">
                            <option>País</option>
                            <option>Colombia</option>
                        </select>

                        <span class="form-error-control form-error_contacto__country trans_27" style="display: none; color: red; font-size: 12px;">*El campo país es requerido</span>

                    </div>

                    <div class="col-md-6 form-error-control-content">
                        <input type="text" class="form-control input-form contacto__city trans_28__ph" placeholder="Ciudad" maxLength="60">

                        <span class="form-error-control form-error_contacto__city trans_29" style="display: none; color: red; font-size: 12px;">*El campo ciudad es requerido</span>

                    </div>
                    <div class="col-md-6 form-error-control-content">
                        <input type="tel" class="form-control input-form contacto__phone__number trans_30__ph" placeholder="Teléfono" maxLength="60">

                        <span class="form-error-control form-error_contacto__phone__number trans_31" style="display: none; color: red; font-size: 12px;">*El campo Teléfono es requerido</span>

                    </div>

                    <div class="col-12 form-error-control-content">
                        <select class="form-control input-form contacto__interests" placeholder="Teléfono">
                            <option value="t" class="trans_32">Interes</option>
                            <option value="Quiero conocer más" class="trans_33">Quiero conocer más</option>
                            <option value="Deseo ser contactado" class="trans_34">Deseo ser contactado</option>
                            <option value="Quiero registrarme" class="trans_35">Quiero registrarme</option>
                            <option value="Quiero participar en una subasta" class="trans_36">Quiero participar en una subasta</option>
                        </select>

                        <span class="form-error-control form-error_contacto__interests trans_37" style="display: none; color: red; font-size: 12px;">*El campo intereses es requerido</span>

                    </div>

                    <div class="col-md-6">
                        <p class="text-terminos">
                            <span>
                                <label class="containerCheck">
                                    <input type="checkbox" class="contacto__terms" checked="true">
                                    <span class="spancheckmark"></span>
                                </label>
                            </span>
                            <a href="https://nasbi.com/assets/docs/terminos-y-condiciones-generales-nasbi-v8.pdf"><span class="trans_38">Acepto los Términos y Condiciones unificados.</span></a>
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="text-terminos">
                            <span>
                                <label class="containerCheck">
                                    <input type="checkbox" class="contacto__politics" checked="true">
                                    <span class="spancheckmark"></span>
                                </label>
                            </span>
                            <a href="https://nasbi.com/assets/docs/politicas-privacidad-nasbi-v10.pdf"><span class="trans_39">Acepto las políticas de privacidad y demás Documentos Vinculantes</span></a>
                        </p>

                    </div>

                    <div class="col-12">
                        <button class="btn-Env contacto__btn" type="button">
                            <span class="spinner-border spinner-border-sm contacto__btn__spinner" role="status" aria-hidden="true" style="display: none;"></span> <span class="trans_16__btn">Enviar</span>
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
<script src="../js/controllers/contacto.js"></script>

</html>

<!-- Modal contacto -->
<div class="modal fade" id="bienvenida-contacto-user" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com" loading="lazy">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="trans_69">¡Felicidades!</h4>
                    <p class="trans_70">Has enviado tus datos satisfactoriamente. Uno de nuestros agentes de contactará.</p>
                    <button class="trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                    <!-- <a href="promociones.php"><button class="trans_01">Aceptar</button></a> -->
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal finalizacion contacto -->
<div class="modal fade" id="final-contacto" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com" loading="lazy">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4>¡Gran trabajo completando tu contacto!</h4>
                    <p>Hemos enviado un correo a tu cuenta registrada, en este <br>podrás verificar tu cuenta y así comenzar a disfrutar de este marketplace.</p>
                    <button data-dismiss="modal" aria-label="Close">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>