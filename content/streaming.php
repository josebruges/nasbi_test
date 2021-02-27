<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans514" ></title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link  rel="stylesheet" href="../css/streaming.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div class="row row-header-escuela">
        <div class="col-8">
            <div style="padding:56.25% 0 0 0;position:relative;">
                <iframe src="https://player.vimeo.com/video/468280847" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
            </div>
        </div>
        <div class="col-4">
            <iframe src="https://vimeo.com/live-chat/468280847/8500359baf" class="frame-chat-vimeo" style="width: 100%; height: 505px;" frameborder="0"></iframe>
        </div>
        
    </div>
    
    <div  class="row rows-videos nodata_items_pre">
        <div class="col-sm-4">
            <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
            <p class="label-title_nodata trans231_ "></p>
            
        </div>
    </div>
    
    <div class="row-noticias">
        <div class="col-12">
            <h4 class="trans160"></h4>
            <div class="owl-carousel owl-theme carousel-escuela-noticias carousel_items_escuela_vendedores">
            </div>
        </div>
        
        <div class="nodata_items_pre col-sm-4 ">
            <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
            <p class="label-title_nodata trans231_ "></p>
            
        </div>
        <div align="center" class="row content__loadingSpinner_escuela_vendedores">
            <div class="col-lg-12"><br><br><br></div>
            <div class="col-lg-12">
                <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
        
    </div>

    <div class="moda-info-global modal fade" id="modal-info-evento" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="label-titulo __titulo_evento mt-2 mb-4"></h5>

                            <div class="row">
                                <div class="col-12 container-noticia">
                                    <img class="img-fluid __img_evento" alt="Nasbi.com">
                                    <p class="__hora_evento mt-2"></p>
                                </div>
                                <div class="col-12 container-noticia">
                                    <p class="__descripcion_evento"></p>
                                </div>
                            </div>

                            <div class="contn-entrega">
                                <button class="btnno _trans112 __inscribirse_evento" data-dismiss="modal" aria-label="Close"></button>
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
<script src="../js/streaming.js"></script>

</html>