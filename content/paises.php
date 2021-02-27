<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="transOrigen _trans524">Nasbi.com | ¿De donde eres?</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <?php include '../include/analitic-web-script.php'; ?><!--si va hacer include de head-js.php quite este include porque ese ya esta alla-->
    <!-- Include General Css -->
    <?php include '../include/include-paises-css.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="../css/seleccionar-pais.css">
</head>

<body>
<?php include '../include/body_general.php'; ?>

    <div align="center">
        <!-- Referir negocio parte 1 -->
        <div class="row row-cont">
            <div class="col-md-5 col-lg-6"></div>
            <div class="col-md-7 col-lg-6">
                
                <div class="select-idioma-paises">
                    <p class="select-idioma-text trans272">Selecciona el idioma</p>
                    <select class="form-control select_idioma_paises select-idioma navbar__idioma">
                        <option class="idioma_op_paises" value="ES">ES</option>
                        <option class="idioma_op_paises" value="EN">EN</option> 
                    </select>
                </div>

                <h3 class="transTitle">Seleccionar pais</h3>

                <p class="transSubTitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic nostrum ab, natus, doloribus aut adipisci alias recusandae reprehenderit asperiores veniam beatae numquam voluptate facere, facilis nemo architecto nesciunt officiis officia?</p>

                <select class="form-control select__pais" data-live-search="true"></select>
                <!-- <div class="select-idioma-paises">
                    <p class="select-idioma-text trans272">Selecciona el idioma</p>
                    <select class="form-control select_idioma_paises select-idioma navbar__idioma">
                        <option class="idioma_op_paises" value="ES">ES</option>
                        <option class="idioma_op_paises" value="EN">EN</option> 
                    </select>
                </div> -->
                <button class="btn-siguiente transBtn">Siguiente</button>
            </div>
        </div>
    </div>
</body>

<?php
include '../include/navbars-modales-globales.php';
include '../include/footer.php';

?>
<!-- include general js -->
<?php
include '../include/include-paises-js.php';
?>

</html>

<script src="../js/suscribir_correo_newsleter.js"></script> 