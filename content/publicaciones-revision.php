<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="trans_eb50">Nasbi.com | Publicaciones Revision</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/mis-cuentas.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
<div align="center">
    <div class="row row-nav">
        <!-- Opciones sideNav -->
        <div class="col-lg-2 col-list-nav">
            <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">

                <a class="nav-link sidenav_publicaciones_revision side_option" id="id-revision" data-toggle="pill" href="#ref-revision" role="tab" aria-controls="ref-revision" aria-selected="false">
                    <img loading="lazy" src="../imagen/nav-pills/publicaciones.png" /> <span class="trans_eb47">Revision</span>
                </a>

                <a class="nav-link sidenav_publicaciones_revision_subastas side_option" id="id-revision-subastas" data-toggle="pill" href="#ref-revision-subastas" role="tab" aria-controls="ref-revision-subastas" aria-selected="false">
                    <img loading="lazy" src="../imagen/nav-pills/publicaciones.png" /> <span class="">Subastas</span>
                </a>


                <div class="icon-down-responsive">
                    <i class="fas fa-chevron-left"></i>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        </div>

        <div class="col-lg-10 px-0 col-tabcontent">
            <div class="tab-content">

                <!-- Administrar publicaciones -->
                <?php include './dashboard/revision.php'; ?>

                <!-- Subastas publicaciones -->
                <?php include './dashboard/subastas_revision.php'; ?>
            </div>
        </div>
    </div>
</div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script>
    let paramsMisCuentas = new URLSearchParams(location.search);
    let tokenPageView = paramsMisCuentas.get('tokenPageView');
    if (validarText(tokenPageView)) {

        let contentMisCuentas = localStorage.getItem("mis_cuentas");
        if (contentMisCuentas != null) {
            localStorage.removeItem("mis_cuentas");
        }
        console.log("\n\n\n");
        console.log("===========> contentMisCuentas: ", contentMisCuentas);
        console.log("===========> tokenPageView: ", tokenPageView);

        if (tokenPageView == "id-configuracion" && (user.empresa * 1 == 1)) {
            window.location.href = 'editar-empresa.php';
        } else {
            setTimeout(() => {

                console.log("===========> **contentMisCuentas: ", contentMisCuentas);
                console.log("===========> **tokenPageView:    #", tokenPageView);
                console.log("===========> **tokenPageView:    #", tokenPageView);
                console.log("===========> **tokenPageView:    #", tokenPageView);
                console.log("===========> **tokenPageView:    #", tokenPageView);

                localStorage.setItem("mis_cuentas", tokenPageView);
                $('.nav-link').removeClass('active show');
                $('.nav-link').prop('aria-selected', false);
                // $(`#ref-${tokenPageView.split("-")[1]}`).addClass('active show');
                $(`#${tokenPageView}`).click();
            }, 200);

        }

    }
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>

<script src="../js/controllers/dashboard/resumen.js"></script>

<!-- INICIO: SOLO PARA LA IMPLEMENTACION DEL CHAT -->
<script src="../js/socket/fancywebsocket_chat.js"></script>
<script src="../js/controllers/dashboard/chat.js"></script>
<script src="../js/controllers/dashboard/compras.js"></script>
<script src="../js/controllers/ventas.js"></script>
<script src="../js/controllers/facturacion.js"></script>
<!-- FIN: SOLO PARA LA IMPLEMENTACION DEL CHAT -->

<script src="../js/controllers/direcciones.js"></script>
<script src="../js/controllers/dashboard/publicaciones.js"></script>
<script src="../js/controllers/dashboard/publicaciones-revision.js"></script>
<script src="../js/controllers/dashboard/subastas-revision.js"></script>

<!-- Se realizo una corrección en las sección -->
<script src="../js/controllers/dashboard/configuracion.js"></script>

<!-- Inicio: Para reputacion -->
<script src="../js/controllers/dashboard/reputacion.js"></script>


<!--js de subastas-->
<script src="../js/controllers/dashboard/subastas.js"></script>


</html>