<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="trans56"></title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/finalizar-compra.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
    <?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-general">
            <div class="col-lg-6">
                <h4 class="label-sect trans57"></h4>
                <div class="row row-card1">
                    <div class="col-12">
                        <h6 class="trans58"></h6>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="return __pais"></p>
                            <p class="return __departamento"></p>
                            <p class="return __ciudad"></p>
                            <p class="return __direccion"></p>
                            <p class="return __zip"></p>
                        </div>
                        <div class="col-12 pt-3">
                            <button class="btn-edit __vermisdirecciones"><span class="trans61"></span> <img src="../imagen/edit.png"></button>
                        </div>
                    </div>
                </div>

                <div class="row row-card1 d-none">
                    <div class="col-12">
                        <h6 class="trans63"></h6>
                        <p class="labelgray"></p>
                        <p class="text-pago">
                            <span><img src="../imagen/tarjeta-credito.png"> <span class="trans65"></span> <input type="radio" name="01"></span>
                            <span><span class="trans66"></span> en 3789 <input type="radio" name="01"></span>
                        </p>
                        <button class="agg-tarjeta"><span class="trans67"></span> <img src="../imagen/edit.png"></button>
                    </div>

                    <div class="col-md-10">
                        <p class="label-form-sect trans68"></p>
                        <p class="label-text label001 trans69"></p>
                        <input type="number" class="form-control inputs" placeholder="Número de la tarjeta">
                    </div>

                    <div class="col-12 px-0">
                        <div class="row">
                            <div class="col-md-9 col-lg-12 px-0">
                                <div class="row">
                                    <div class="col-md-4">
                                        <p class="label-text trans70"></p>
                                        <select class="form-control inputs"></select>
                                    </div>

                                    <div class="col-md-4">
                                        <p class="label-text">&nbsp;</p>
                                        <select class="form-control inputs"></select>
                                    </div>

                                    <div class="col-md-4">
                                        <p class="label-text trans71"></p>
                                        <input type="text" class="form-control inputs" placeholder="CVC Código">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="row row-card1 card2">
                    <div class="col-12">
                        <h6 class="trans72"></h6>
                        <div class="row row-prodt __datosproducto">

                        </div>
                    </div>

                    <div class="col-6 pt-3">
                        <p class="text-product pt-2 text-left trans73"></p>

                    </div>
                    <div class="col-6 pt-3 __datosproductoprecio_1"></div>

                    <div class="col-12 pt-3">
                        <div class="form-group">
                            <label for="formControlRange">
                                <span class="trans36_"></span> (<span class="finalizar_compra_descuento">0</span>%)
                            </label>
                            <input type="range" class="form-control-range" id="finalizar_compra_rangodescuento" min="0" max="100" value="0">
                        </div>
                    </div>

                    <div class="col-6 pt-3">
                        <p class="text-product pt-2 text-left trans479_"></p>
                    </div>
                    <div class="col-6 pt-3 __datosproductoprecio_3"></div>


                    <div class="col-12 pt-3">
                        <form class="form-inline">
                            <label class="my-1 mr-2 trans518_" for="select-metodo-pago"></label>
                            <select class="custom-select my-1 mr-sm-2" id="select-metodo-pago">
                                <option selected value="1" class="trans_303"></option>
                                <!-- <option selected value="2" class="trans_304"></option> -->
                                <option class="select-metodo-pago_combinado" value="3" style="display: none;">Pago combinado</option>
                            </select>
                        </form>
                    </div>
                    <div class="col-12 pt-3 row finalizar_compra__inputscombinadospagos" style="display: none;">
                        <div class="col-12 px-0 px-sm-2">
                            <label class="sr-only finalizar_compra__symbollocalmoney" for="inlineFormInputGroup">COP</label>
                            <div class="input-group mb-2">
                                <input type="text" class="form-control __maskUsd__ finalizar_compra__input__localmoney" id="inlineFormInputGroup" placeholder="Moneda local" maxlength="20">
                                <div class="input-group-prepend">
                                    <div class="input-group-text finalizar_compra__symbollocalmoney">COP</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 px-0 px-sm-2">

                            <label class="sr-only finalizar_compra__symbolcoin" for="inlineFormInputGroupCoin">SD</label>

                            <div class="input-group mb-2">

                                <input type="text" class="form-control __maskUsd__ finalizar_compra__input__localmoney__two trans_305__ph" id="inlineFormInputGroupCoin" placeholder="" maxlength="20">

                                <input type="text" class="form-control __maskCripto__ finalizar_compra__input__cripto trans_305__ph" id="inlineFormInputGroupCoin" placeholder="" maxlength="20" style="display: none;">

                                <div class="input-group-prepend">
                                    <div class="input-group-text finalizar_compra__symbolcoin">SD</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 pt-3">
                        <p class="text-product pt-2 text-left trans75"></p>
                    </div>
                    <div class="col-6 pt-3 __datosproductoprecio_2"></div>



                    <div class="col-sm-8 pr-2 pt-3">
                        <button class="btn-codigo trans76"></button>
                    </div>
                    <div class="col-sm-4 pl-2 pt-3">
                        <input type="text" class="form-control text-codigo text_codigo_regalo_ trans449___ph">
                    </div>
                    <div class="col-12">
                        <button class="btn-confir-compra __pagar ">
                            <span class="trans77"></span>
                            <div class="spinner-border spiner_loading_pago spinner-border-sm" role="status" style="display: none;">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal ver direcciones-->
    <div class="modal fade" id="modal-direcciones" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img src="../imagen/logo-modal.png" class="logo-modal">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p style="cursor: pointer;" class="label-paso title-direcciones __btncreardireccion trans14"></p>
                        </div>
                    </div>
                    <div class="row row-form1 __alldirecciones my-0 pb-3">
                    </div>
                    <div class="contant-button02" align="center">
                        <button class="btncomrar mt-0 _trans112" data-dismiss="modal" style="background-color: #FF103D;"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal crear direccion-->
    <div class="modal fade" id="modal-direcciones-crear" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img src="../imagen/logo-modal.png" class="logo-modal">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="row row-form1">
                        <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                            <input type="text" class="form-control __maskFloat__ __paisnewdireccion" placeholder="pais" disabled readonly>
                            <p class="trans15"></p>
                        </div>
                        <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6 __divdepnewdireccion">
                            <select class="form-control row-select-dir-compra  __depnewdireccion select-plataforma"></select>
                            <p class="trans16"></p>
                        </div>
                        <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                            <input type="text" class="form-control __ciudadnewdireccion trans_28__ph">
                            <p class="trans17"></p>
                        </div>
                        <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                            <input type="text" class="form-control __dirnewdireccion trans238___ph">
                            <p class="trans18"></p>
                        </div>
                        <div class="mb-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                            <input type="text" class="form-control __codigopostalnewdireccion trans239___ph">
                            <p class="trans19"></p>
                        </div>
                        <div class="mb-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                            <input type="checkbox" class="form-control __activanewdireccion">
                            <p class="trans31"></p>
                        </div>
                    </div>
                    <div class="contant-button02">
                        <button class="btncomrar _trans112" data-dismiss="modal"></button>
                        <button class="btntikets __save_detalles_envio trans118_ "></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal compra finalizada -->
    <div class="modal fade" id="modal-compra-finalizada" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img src="../imagen/logo-modal.png" class="logo-modal">
                        </div>


                        <div class="col-3"></div>
                    </div>

                    <div class="row compra-finalizada">
                        <div class="col-12">
                            <h5 class="trans88"></h5>
                            <p class="_trans837"></p>
                            <div class="div-alignc content-button" style="width: 100%;">
                                <a href="promociones.php"><button class="seguir trans302_"></button></a>
                                <a><button class="to_miscompras_mis_cuentas _trans836"></button></a>
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

<script src="../js/finalizar-compra.js"></script>

<script>
    /*let carrito, carrito_new;

    function cargarPrimero() {
        carrito = JSON.parse(sessionStorage.getItem('finalizar-compra'));
        carrito_new = JSON.parse(sessionStorage.getItem('finalizar-compra-new'));
        console.log('carrito', carrito);
        console.log('\n\ncarrito_new', carrito_new);

        if ( !validarText(carrito) || !validarText(carrito_new) ) {
            return window.location.href = './'
        };
        reiniciarVariables();
        getDireccionesUsuario();
        llenarProducto();
    }*/
</script>

</html>