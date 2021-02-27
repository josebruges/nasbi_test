<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="trans_257">Nasbi.com | Previzualizar empresa</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';
    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/previzualizar-empresa.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>


<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="content-portada">
            <div class="contenedor-logo">
                <img loading="lazy" src="../imagen/img-empresas/nasbi-logo-placeholder.png" class="imagen-logo prev__tienda__logo" alt="empresa - nasbi.com">
            </div>
            <img loading="lazy" src="../imagen/img-empresas/header-empresa-placeholder.png" class="img-portada prev__tienda__banner" alt="empresa - nasbi.com">
        </div>

        <div class="row rowscars">
            <div class="col-md-6">
                <div class="card-empresas1">
                    <button>
                        <img loading="lazy" src="../imagen/nav-pills/resumen.png"> <span class="trans_258">Tienda Nasbi</span>
                    </button>
                    <h1 class="prev__tienda__name">Tienda Nasbi.com</h1>
                    <p class="prev__tienda__description"></p>
                    <div class="row row-asesor">
                        <div class="col-md-4 col-xl-3 px-0">
                            <div class="contenedor-avatar">
                                <img loading="lazy" src="../imagen/img-empresas/user-placeholder.png" class="imagen-avatar prev__tienda__employees__avatar">
                            </div>
                        </div>
                        <div class="col-md-8 col-xl-9 px-0">
                            <h6 class="label-asesor prev__tienda__employees__name">Nombre del asesor</h6>
                            <h6 class="label-asesor prev__tienda__employees__rol">Asesor Comercial</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card-empresas2">
                    <div class="form-group group-calificacion">
                        <div class="input-group-prepend">
                            <span class="input-group-text text01 trans_259">Calificación tienda</span>
                            <span class="input-group-text text02">
                                <p class="clasificacion-tienda prev__tienda__starts">
                                    <span>4.3</span>
                                    <i class="fas fa-star orange"></i>
                                    <i class="fas fa-star orange"></i>
                                    <i class="fas fa-star orange"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </p>
                            </span>
                        </div>
                    </div>
                    <p class="text-label1 prev__tienda__category">
                        <span class="prev__tienda__category__label">Tienda Platinum</span> <span class="prev__tienda__category__label__2">....</span>
                    </p>
                    <div class="content-opc">
                        <button>
                            <span class="prev__tienda__total__comments"> 0 </span> <span class="trans_260">Comentarios</span>
                        </button>

                        <button>
                            <span class="prev__tienda__good__comments"> 0 </span> <span class="trans_261">Buenos</span>
                        </button>

                        <button>
                            <span class="prev__tienda__regular__comments"> 0 </span> <span class="trans_262">Regulares</span>
                        </button>

                        <button>
                            <span class="prev__tienda__bad__comments"> 0 </span> <span class="trans_263">Malos</span>
                        </button>
                    </div>
                    <div class="content-flex">
                        <div class="sub-content prev__tienda__characteristic__1" style="display: none;">
                            <div class="card-select">
                                <img loading="lazy" src="../imagen/logo-cripto.png" alt="nasbi.com">
                                <button class="btn1" disabled="true">
                                    <span class="trans_236">PAGA EN <br>CRYPTOS</span>
                                </button>
                            </div>
                        </div>
                        <div class="sub-content prev__tienda__characteristic__2" style="display: none;">
                            <div class="card-select">
                                <img loading="lazy" src="../imagen/garantia.png" alt="nasbi.com">
                                <button class="btn2" disabled="true">
                                    <span class="trans_237">GARANTÍA <br>1 AÑO</span>
                                </button>
                            </div>
                        </div>
                        <div class="sub-content prev__tienda__characteristic__3" style="display: none;">
                            <div class="card-select">
                                <img loading="lazy" src="../imagen/envi-gratis.png" alt="nasbi.com">
                                <button class="btn3" disabled="true">
                                    <span class="trans_238">ENVÍO <br>GRATIS</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row row-filtro">
            <div class="px-2 col-md-6 col-lg-3 col-xl-2">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text text-label _trans230">Productos destacados</span>
                    </div>
                </div>
            </div>


            <div class="px-2 col-md-6 col-lg-3 col-xl-3">
                <div class="input-group group-filtro">
                    <div class="input-group-prepend">
                        <span class="input-group-text trans_57">Filtrar por:</span>
                    </div>
                    <div class="dropdown divdropdownfiltro">

                        <button class="btn drop-filtro dropdown-toggle prev__tienda__category__selected trans_293" type="button" id="dropdownmodo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Selecciona una opción</button>

                        <div class="dropdown-menu prev__tienda__category__list" aria-labelledby="dropdownmodo">

                            <a class="dropdown-item trans_293 content_ctg" id="0">Selecciona una opción</a>
                            <a class="dropdown-item trans223_ content_ctg" id="1">Categorías</a>

                            <a class="dropdown-item trans31_ content_ctg" id="2">Tiempo de uso</a>
                            <a class="dropdown-item trans_52 content_ctg" id="3">Garantía</a>
                            <a class="dropdown-item trans32_ content_ctg" id="4">En promoción</a>
                            <a class="dropdown-item trans33_ content_ctg" id="5">Envío</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-2 col-md-6 col-lg-2 col-xl-3 col-selet">
                <div class="dropdown divdropdownfiltro dropselect subcategory prev__tienda__subcategory__list__content__1" style="display: none;">
                    <!-- [ id:1 ] Filtro para categorias -->
                    <button class="btn drop-filtro dropdown-toggle prev__tienda__subcategory__selected" type="button" id="dropdownmodo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>

                    <div class="dropdown-menu prev__tienda__subcategory__list" aria-labelledby="dropdownmodo"></div>
                </div>

                <div class="dropdown divdropdownfiltro dropselect subcategory prev__tienda__subcategory__list__content__2" style="display: none;">
                    <!-- [ id:2 ] Filtro para Tiempo de uso -->
                    <button class="btn drop-filtro dropdown-toggle prev__tienda__subcategory__selected" type="button" id="dropdownmodo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>

                    <div class="dropdown-menu" aria-labelledby="dropdownmodo">
                        <a class="dropdown-item trans_47 content_ctg_tdu" id="">Todos</a>
                        <a class="dropdown-item trans_48 content_ctg_tdu" id="1">Nuevo</a>
                        <a class="dropdown-item trans_49 content_ctg_tdu" id="2">Usado</a>
                        <a class="dropdown-item trans_50 content_ctg_tdu" id="3">Reacondicionado</a>
                    </div>
                </div>

                <div class="dropdown divdropdownfiltro dropselect subcategory prev__tienda__subcategory__list__content__3" style="display: none;">
                    <!-- [ id:3 ] Filtro para Garantía -->
                    <button class="btn drop-filtro dropdown-toggle prev__tienda__subcategory__selected" type="button" id="dropdownmodo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>

                    <div class="dropdown-menu" aria-labelledby="dropdownmodo">
                        <a class="dropdown-item trans_47 content_ctg_g" id="">Todos</a>
                        <a class="dropdown-item trans24_ content_ctg_g" id="1">Sí</a>
                        <a class="dropdown-item trans25_ content_ctg_g" id="0">No</a>
                    </div>
                </div>

                <div class="dropdown divdropdownfiltro dropselect subcategory prev__tienda__subcategory__list__content__4" style="display: none;">
                    <!-- [ id:3 ] Filtro para En promoción -->
                    <button class="btn drop-filtro dropdown-toggle prev__tienda__subcategory__selected" type="button" id="dropdownmodo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>

                    <div class="dropdown-menu" aria-labelledby="dropdownmodo">
                        <a class="dropdown-item trans_47 content_ctg_ep" id="">Todos</a>
                        <a class="dropdown-item trans24_ content_ctg_ep" id="1">Sí</a>
                        <a class="dropdown-item trans25_ content_ctg_ep" id="0">No</a>
                    </div>
                </div>

                <div class="dropdown divdropdownfiltro dropselect subcategory prev__tienda__subcategory__list__content__5" style="display: none;">
                    <!-- [ id:3 ] Filtro para Envío -->
                    <button class="btn drop-filtro dropdown-toggle prev__tienda__subcategory__selected" type="button" id="dropdownmodo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>

                    <div class="dropdown-menu" aria-labelledby="dropdownmodo">
                        <a class="dropdown-item trans_47 content_ctg_e" id="">Todos</a>
                        <a class="dropdown-item trans26_ content_ctg_e" id="1">Sí</a>
                        <a class="dropdown-item trans27_ content_ctg_e" id="2">No</a>
                        <a class="dropdown-item trans28_ content_ctg_e" id="3">No</a>
                    </div>
                </div>
            </div>


            <div class="px-2 col-md-6 col-lg-3 col-xl-3">
                <div class="input-group group-filtro">
                    <div class="input-group-prepend">
                        <span class="input-group-text _trans551">Ordenar por:</span>
                    </div>
                    <div class="dropdown divdropdownfiltro">

                        <button class="btn drop-filtro dropdown-toggle prev__tienda__ordering__selected" type="button" id="dropdownmodo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">....</button>

                        <div class="dropdown-menu prev__tienda__ordering__list" aria-labelledby="dropdownmodo">
                            <a class="dropdown-item trans_264 prev__tienda__ordering__ASC">Menor precio</a>
                            <a class="dropdown-item trans_265 prev__tienda__ordering__DESC">Mayor precio</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-2 col-md-12 col-lg-1 col-xl-1 col1-ver">
                <div class="ver-list">
                    <span class="trans_266">Ver</span> <span><i class="fas fa-th-large"></i> </span> <span><i class="fas fa-list"></i></span>
                </div>
            </div>
        </div>

        <div class="row row-prodcuts prev__tienda__content" style="display: none;">
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card-products">
                    <div class="contenedor-producto">
                        <img loading="lazy" src="../imagen/product_2.jpg" class="imagen-producto">
                        <button class="btn-descuent">50 Off <img loading="lazy" src="../imagen/descuento-empresa.png" alt="nasbi.com"></button>
                        <div class="content-button-product">
                            <button class="btn1"><img loading="lazy" src="../imagen/logo-cripto.png"></button>
                            <button class="btn2"><img loading="lazy" src="../imagen/garantia.png"></button>
                            <button class="btn3"><img loading="lazy" src="../imagen/envi-gratis.png"></button>
                        </div>
                    </div>
                    <div class="row row-name-price">
                        <div class="col-sm-7 px-1">
                            <p class="trans_267">Nombre producto</p>
                            <p><b>0.00 USD</b></p>
                        </div>
                        <div class="col-sm-5 px-1">
                            <button class="trans_268">Lo Quiero Ya</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card-products">
                    <div class="contenedor-producto">
                        <img loading="lazy" src="../imagen/product_2.jpg" class="imagen-producto">
                        <button class="btn-descuent">50 Off <img loading="lazy" src="../imagen/descuento-empresa.png" alt="nasbi.com"></button>
                        <div class="content-button-product">
                            <!-- <button class="btn1"><img loading="lazy" src="../imagen/logo-cripto.png"></button> -->
                            <button class="btn2"><img loading="lazy" src="../imagen/garantia.png"></button>
                            <!-- <button class="btn3"><img loading="lazy" src="../imagen/envi-gratis.png"></button> -->
                        </div>
                    </div>
                    <div class="row row-name-price">
                        <div class="col-sm-7 px-1">
                            <p class="trans_267">Nombre producto</p>
                            <p><b>0.00 USD</b></p>
                        </div>
                        <div class="col-sm-5 px-1">
                            <button class="trans_268">Lo Quiero Ya</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card-products">
                    <div class="contenedor-producto">
                        <img loading="lazy" src="../imagen/product_2.jpg" class="imagen-producto">
                        <button class="btn-descuent">50 Off <img loading="lazy" src="../imagen/descuento-empresa.png" alt="nasbi.com"></button>
                        <div class="content-button-product">
                            <!-- <button class="btn1"><img loading="lazy" src="../imagen/logo-cripto.png"></button> -->
                            <!-- <button class="btn2"><img loading="lazy" src="../imagen/garantia.png"></button> -->
                            <button class="btn3"><img loading="lazy" src="../imagen/envi-gratis.png"></button>
                        </div>
                    </div>
                    <div class="row row-name-price">
                        <div class="col-sm-7 px-1">
                            <p class="trans_267">Nombre producto</p>
                            <p><b>0.00 USD</b></p>
                        </div>
                        <div class="col-sm-5 px-1">
                            <button class="trans_268">Lo Quiero Ya</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card-products">
                    <div class="contenedor-producto">
                        <img loading="lazy" src="../imagen/product_2.jpg" class="imagen-producto">
                        <button class="btn-descuent">50 Off <img loading="lazy" src="../imagen/descuento-empresa.png" alt="nasbi.com"></button>
                        <div class="content-button-product">
                            <button class="btn1"><img loading="lazy" src="../imagen/logo-cripto.png"></button>
                            <!-- <button class="btn2"><img loading="lazy" src="../imagen/garantia.png"></button> -->
                            <!-- <button class="btn3"><img loading="lazy" src="../imagen/envi-gratis.png"></button> -->
                        </div>
                    </div>
                    <div class="row row-name-price">
                        <div class="col-sm-7 px-1">
                            <p class="trans_267">Nombre producto</p>
                            <p><b>0.00 USD</b></p>
                        </div>
                        <div class="col-sm-5 px-1">
                            <button class="trans_268">Lo Quiero Ya</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="prev__products__list__nodata" style="display: none;">
            <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
            <p class=" label-subtitle_nodata trans_44">Ningún producto por aquí.</p>
            <label class=" trans_45">Regresa más tarde.</label>
            <br><br>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>

<script src="../js/controllers/empresa/previsualizar-empresa.js"></script>

</html>