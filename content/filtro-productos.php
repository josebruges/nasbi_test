<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans516">Nasbi.com</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <!-- link css -->
    <?php
    include '../include/include-css.php';

    include '../include/head-js.php';
    ?>
    <link rel="stylesheet" href="../css/filtro-productos.css">
</head>

<!-- Include Navbar : para todas las pantallas-->
<?php
include '../include/manager-navbar.php';
?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <!-- Banner subastas -->
        <div class="row">
            <div class="col-12 p-0">
                <div class="owl-carousel owl-theme" id="carousel-banner-subastas"></div>
            </div>
        </div>


        <div class="row row-12-back">
            <!-- Filter -->
            <div class="col-md-3 p-0">
                <div class="col-12 p-0">
                    <div class="row row3-filter">
                        <div class="row">
                            <div class="col-12 p-0">
                                <div class="input-group group-filter">
                                    <input type="text" class="form-control nombreproducto _trans383__ph" placeholder="¿Qué te gustaría ordenar?">
                                    <span class="input-group-addon buscarnombre"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                        </div>

                        <div class="row row-filter">
                            <div class="col-9">
                                <p class="label trans31_">Tiempo de uso:</p>
                            </div>
                            <div class="col-3">
                                <i class="fas fa-angle-down" data-toggle="collapse" data-target="#tiempo-uso"></i>
                            </div>
                            <div class="col-12 collapse" id="tiempo-uso">
                                <form class="condiciondeuso_product" id="condiciondeuso_product">
                                    <p class="tex-radio">
                                        <span class="trans_47"></span>
                                        <span><input type="Radio" name="colorin" value="0" class="trans_47"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans_48"></span>
                                        <span><input type="Radio" name="colorin" value="1" class="trans4"> </span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans_49"></span>
                                        <span><input type="Radio" name="colorin" value="2" class="trans5"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans_50"></span>
                                        <span><input type="Radio" name="colorin" value="3" class="trans6"></span>
                                    </p>
                                </form>
                            </div>
                        </div>


                        <div class="row row-filter">
                            <div class="col-9">
                                <p class="label trans_51"></p>
                            </div>
                            <div class="col-3">
                                <i class="fas fa-angle-down" data-toggle="collapse" data-target="#garantia"></i>
                            </div>
                            <div class="col-12 collapse" id="garantia">
                                <form class="respuestagarantia" id="respuestagarantia">
                                    <p class="tex-radio">
                                        <span class="trans_47"></span>
                                        <span><input type="Radio" name="colorin" value="" class="trans4"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans24_"></span>
                                        <span><input type="Radio" name="colorin" value="1" class="trans4"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans25_"></span>
                                        <span><input type="Radio" name="colorin" value="0" class="trans5"></span>
                                    </p>
                                </form>
                            </div>
                        </div>


                        <div class="row row-filter">
                            <div class="col-9">
                                <p class="label trans32_">En promocion</p>
                            </div>
                            <div class="col-3">
                                <i class="fas fa-angle-down" data-toggle="collapse" data-target="#promocion"></i>
                            </div>
                            <div class="col-12 collapse" id="promocion">
                                <form class="enpromocionproducto" id="enpromocionproducto">
                                    <p class="tex-radio">
                                        <span class="trans_47"></span>
                                        <span><input type="Radio" name="colorin" value="" class="trans4"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans24_"></span>
                                        <span><input type="Radio" name="colorin" value="1" class="trans4"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans25_"></span>
                                        <span><input type="Radio" name="colorin" value="0" class="trans5"></span>
                                    </p>
                                </form>
                            </div>
                        </div>


                        <div class="row row-filter">
                            <div class="col-9">
                                <p class="label trans33_"></p>
                            </div>
                            <div class="col-3">
                                <i class="fas fa-angle-down" data-toggle="collapse" data-target="#promocion2"></i>
                            </div>
                            <div class="col-12 collapse" id="promocion2">
                                <form class="tipoenvio" id="tipoenvio">
                                    <p class="tex-radio">
                                        <span class="trans_47"></span>
                                        <span><input type="Radio" name="colorin" value="0" class="trans4"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans26_"></span>
                                        <span><input type="Radio" name="colorin" value="1" class="trans5"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans27_"></span>
                                        <span><input type="Radio" name="colorin" value="2" class="trans5"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans28_"></span>
                                        <span><input type="Radio" name="colorin" value="3" class="trans5"></span>
                                    </p>
                                </form>
                            </div>
                        </div>


                        <div class="row row-filter">
                            <div class="col-9">
                                <p class="label trans34_">Ordenamiento</p>
                            </div>
                            <div class="col-3">
                                <i class="fas fa-angle-down" data-toggle="collapse" data-target="#ordenamiento"></i>
                            </div>
                            <div class="col-12 collapse" id="ordenamiento">
                                <form class="ordenamientoproducto" id="ordenamientoproducto">
                                    <p class="tex-radio">
                                        <span class="trans29_"></span>
                                        <span><input type="Radio" name="colorin" value="ASC" class="trans4"></span>
                                    </p>

                                    <p class="tex-radio">
                                        <span class="trans30_"></span>
                                        <span><input type="Radio" name="colorin" value="DESC" class="trans5"></span>
                                    </p>
                                </form>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 px-2">
                                <div class="content-btn-filter">
                                    <button class="btn-1 trans22_ buscargeneral"></button>
                                    <button class="btn-2 trans23_ limpiar"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Products -->
            <div class="col-md-9 mb-3">

                <div class="row content__loadingSpinner_filter_product">
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

                <div class="row products__list" style="display: none;"></div>

                <div class="products__list__nodata" style="display: none;">
                    <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                    <p class=" label-subtitle_nodata trans_44">Ningún producto por aquí.</p>
                    <label class=" trans_45">Regresa más tarde.</label>
                </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<?php //include '../include/include-filtro-productos-js.php';
?>

<script src="../js/controllers/filtro-productos.js"></script>

</html>