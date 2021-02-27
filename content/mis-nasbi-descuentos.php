<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans521">Nasbi.com | Mis subastas</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/mis-subastas.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
    <?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-header">
            <div class="col-lg-7">
                <div class="container-text-carousel">
                    <h1 class="trans68_ title_missubasta">Mis subastas</h1>
                    <p class="trans69_">Encuentra aquí el listado de subastas en las que estás inscrito.</p>
                </div>
            </div>

            <div class="col-lg-5">
                <img src="../imagen/mis-subastas/banner.png">
            </div>

            <div class="col-12">
                <nav class="nav-subastas">
                    <div class="nav nav-tabs" role="tablist">
                        <a class="nav-item nav-link active trans70_ tablero_subasta" id="nav-tablero" data-toggle="tab" href="#ref-tablero" role="tab" aria-controls="ref-tablero" aria-selected="true">Tablero</a>

                        <a class="nav-item nav-link trans71_ historial_subasta" id="nav-historial" data-toggle="tab" href="#ref-historial" role="tab" aria-controls="ref-historial" aria-selected="false">Historial</a>
                    </div>
                </nav>
            </div>
        </div>

        <div class="row row-filter">
            <div class="col-md-8 col-lg-6">
                <div class="input-group group-filtro">
                    <span class=" trans_57 input-group-text text-filter "> <img src="../imagen/filtro.png"> </span>
                    <div class="input-group-prepend">
                        <span class="input-group-text trans306_">TICKET:</span>
                    </div>
                    <div class="div-select">
                        <!-- <button class="drop-filtro dropdown-toggle _trans43" type="button" id="esposicion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button> -->
                        <!-- <div class="dropdown-menu" aria-labelledby="esposicion"> -->
                        <select class="form-control select_filtro_subasta">
                            <!-- filtro de mis-subasta -->
                        </select>
                        <!-- </div>  -->

                    </div>
                </div>

            </div>
            <div class="col-md-4 col-lg-6 px-md-0 div_boton_filter">
                <button class="button-filtrar trans72_ filtrar_subasta">Filtrar</button>
            </div>
        </div>

        <!-- Tab Content List -->
        <div class="tab-content">
            <!-- tablero -->
            <div class="tab-pane fade show active" id="ref-tablero" role="tabpanel" aria-labelledby="nav-tablero">
                <div class="table-responsive table-respn-subasta">
                    <table class="table table-subasta tablero_subasta_tabla">
                        <thead>
                            <tr>
                                <th class="trans27">Producto</th>
                                <th class="trans0">Descripción</th>
                                <th class="trans73_"># de subasta</th>
                                <th class="trans74_">Inscrito</th>
                                <th class="trans306_">Tipo de subasta</th>
                                <th class="trans46_">Fecha</th>
                                <th class="trans20">Estado</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="subastas__list">

                        </tbody>
                    </table>
                </div>
            </div>

            <div class="list__subastas__pagination"></div>


            <div class="row subastas__list__nodata nodata_style_mis_subasta" align="center">
                <div class="col-12">
                    <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                </div>
                <div class="col-12">
                    <p class="label-title_nodata  trans_44">Ninguna transacción por aquí.</p>
                    <label class=" trans_45">Regresa más tarde.</label>
                </div>
            </div>

            <div class="row content__loadingSpinner_mis_subasta nodata_style_mis_subasta">
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



            <!-- historial -->
            <div class="tab-pane fade" id="ref-historial" role="tabpanel" aria-labelledby="nav-historial">
                <div class="table-responsive table-respn-subasta">
                    <table class="table table-subasta historial_subasta_tabla">
                        <thead>
                            <tr>
                                <th class="trans27">Producto</th>
                                <th class="trans0">Descripción</th>
                                <th class="trans73_"># de subasta</th>
                                <th class="trans74_">Inscrito</th>
                                <th class="trans306_">Tipo de subasta</th>
                                <th class="trans46_">Fecha</th>
                                <th class="trans76_">Resultado</th>

                            </tr>
                        </thead>
                        <tbody class="subastas__list_historial"></tbody>
                    </table>
                </div>
            </div>

            <div class="list__subastas_historial__pagination"></div>

        </div>
    </div>

</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>

</html>

<script src="../js/socket/fancywebsocket.js"></script>
<script src="../js/mis-subasta.js"></script>


<!-- Modal confirmar si no -->
<div style="z-index:999999;" class="modal fade" id="modal-confirmar-salir" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close no_salir" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="pregunta_de_salir">¡Buen trabajo!</h4>
                </div>
                <div class="row row-inf">
                    <div class="col-12">
                        <h6 style="text-align:center;" class="mensaje_de_salir"></h6>
                    </div>
                </div>

                <div class="contn-entrega">

                    <button class="btnno trans_02  no_salir">Cancelar</button>
                    <button class="btnsi trans_01  si_salir">Aceptar</button>


                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal compartir subasta -->
<div class="modal fade" id="modal-compartir-subasta" tabindex="-1" role="dialog" aria-hidden="true">
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

                <div class="row row-inf ">
                    <img src="../imagen/compartir-subasta.png" class="img-modal">
                    <h4 class="trans79_">Comparte la subasta</h4>
                    <p class="interlineado_texto_compartirsubasta trans308_"></p>
                    <div class="container-img ">
                        <a class="enviar_link_subasta_wpp"><img src="../imagen/icon-whatsapp.png"></a>
                        <a class="enviar_link_subasta_fb"> <img src="../imagen/icon-facebook.png"></a>
                        <a class="enviar_link_subasta"> <img src="../imagen/icon-copiar.png"> </a>
                    </div>
                </div>
                <div class="alert alert-primary  trans84_ alert_copy" role="alert">

                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal atencion-->
<div class="modal fade" id="modal-atencion" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com" loading="lazy">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_at">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <img src="../imagen/atencion.png" class="img-modal">
                    <h4 class="trans78_">¡Atención!</h4>
                    <p class="text03 trans77_"></p>
                </div>
                <div class="contant-button02">
                    <button class="btncomrar trans_02 alert_salir_flu_su_at">Cancelar</button>
                    <button class="btntikets trans_01 aceptar_to_billetera" data-toggle="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal seleccionar billetera -->
<div class="modal fade" id="modal-seleccionar-billetera" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com" loading="lazy">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_bille" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <h4 class="labelbilletera trans89_">Seleccionar billetera</h4>
                        <p class="labrl020 trans90_">Escoge la billetera</p>
                    </div>
                    <div class="col-12 colfile">
                        <div class="row row-list-wallat">
                            <div class="col-lg-5">
                                <h5 class="bono_activo_subasta_blo">Wallet BTC</h5>
                            </div>
                            <div class="col-lg-7">
                                <div class="container-inputss">
                                    <div class="input-group group-billetera">
                                        <input class="form-control valor_disponible_bille_blo" disabled placeholder="0,00000">
                                        <div class="input-group-append">
                                            <span class="input-group-text content-moneda moneda_de_subasta_b"> <img loading="lazy" class="wallet-img_bonos img_unidad_nabicoind" src="../imagen/icon_wallets/nasbi_blue.png" /> </span>
                                        </div>
                                    </div>
                                    <input type="checkbox" class="checkk eleccion_billetera_chek">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="text0028 trans91_ mensaje_recarga_bille"></p>
                <div class="contant-button02">
                    <button class="btncomrar trans_02 alert_salir_flu_su_bille">Cancelar</button>
                    <button class="btntikets trans_01 aceptar_billetera_blo" data-toggle="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal confirmacion-->
<div class="modal fade" id="modal-confirmacion" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com" loading="lazy">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_confir" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <img src="../imagen/confirmacion.png" class="img-modal">
                    <h4 class="trans96_">Confirmación</h4>
                    <p class="trans97_">Ingresa tu clave de transacciones para confirmar el bloqueo de las billeteras</p>
                    <input type="password" class="form-comtrol inptPass pass_transacciones_in">
                </div>
                <div class="contant-button02">
                    <button class="btncomrar trans_02 alert_salir_flu_su_confir">Cancelar</button>
                    <button class="btntikets confirmar_trans_con">
                        <span class="trans_01"></span>
                        <span class="spinner-border spinner-border-sm spiner_confirmar_clave" style="display: none;" role="status" aria-hidden="true"></span>
                    </button>

                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal buen trabajo-->
<div class="modal fade" id="modal-buen-trabajo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com" loading="lazy">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_buen" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <img src="../imagen/buen-trabajo.png" class="img-modal">
                    <h4 class="trans99_">¡Buen trabajo!</h4>
                    <p class="mensaje_de_buen"></p>
                </div>
                <div class="contant-button02">
                    <button class="btncomrar trans_02 alert_salir_flu_su_buen">Cancelar</button>
                    <button class="btntikets trans_01 acept_buen_trabajo" data-dismiss="modal" aria-label="Close">Aceptar</button>

                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal preguntar direciones-->
<div class="modal fade" id="modal-preguntar-direccion" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com" loading="lazy">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close " data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <img src="../imagen/atencion.png" class="img-modal">
                    <h4 class="_trans924">Estimado usuario</h4>
                    <p class="_trans923">Recuerde que la dirección a donde llegará el artículo será la que se encuentre actualmente activa en el módulo de Mis cuentas / direcciónes. <br> Si deseas cambiar tu dirección ingresa<a class='abrir_direcciones_subastas'><span> aquí</span></a> </p>
                </div>
                <div class="contant-button02">
                    <button class="btntikets trans_01 btn_continuar_subasta" data-dismiss="modal" aria-label="Close">Aceptar</button>

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
                    <button class="btncomrar mt-0 trans191 btn_continuar_subasta" data-dismiss="modal" style="background-color: #FF103D;"></button>
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



<!-- Modal pujar-->
<div class="modal fade" id="modal-pujar" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <p class="textlogoH text-pujaT">
                            <img src="../imagen/logo-modal.png" class="logo-modal02" alt="nasbi.com" loading="lazy">
                            <span class="_trana946">Subasta en proceso</span>
                            <span class="online"></span>
                        </p>
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-right: -15px!important;">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-pujaa">
                    <div class="col-lg-6">
                        <div class="row rowtime">
                            <div class="col-3 px-0">
                                <img src="../imagen/time.png">
                            </div>
                            <div class="col-9 px-0">
                                <h1 id="timer">00:45</h1>
                                <p class="_trans933">SEGUNDOS</p>
                            </div>
                        </div>

                        <div class="row rowtable">
                            <div class="col-6">
                                <p class="TitleT tL">Bidder</p>
                            </div>

                            <div class="col-6">
                                <p class="TitleT tR"><span class="_trans932">Ofertas:</span> <span class="modal_puja_total__pujas">0</span> </p>
                            </div>
                            <div class="col-12 scroll-puja __listadoapostadores"></div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="content-subas">
                            <img src="../imagen/product.jpg" class="subas-img __imgproductopuja">
                        </div>
                        <div class="content-part">
                            <p class="name-sub _trans931"><b class="__productoproductopuja"></b> por un valor de:</p>
                            <p class="price-subas __precionasbicoinproducto"></p>

                            <div class="row rowrival row_lidersubasta __verpujandome">
                                <div class="col-3 px-0">
                                    <img src="../imagen/liderGandr.png">
                                </div>
                                <div class="col-9 px-0">
                                    <h2 class="__gandosubasta"></h2>
                                </div>
                            </div>

                            <div class="row rowrival2 row_userAuth __verpujandome">
                                <div class="col-3 px-0">
                                    <img src="../imagen/lidSecund.png">
                                </div>
                                <div class="col-9 px-0">
                                    <h2 class="__mesubastando"></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4 btp">
                    <div class="col-lg-7">
                        <div class="row rowSaldotwo">
                            <div class="col-6 col-lg-3 px-0">
                                <p class="textPuja1 _trans927">Saldo <br>en billetera</p>
                            </div>
                            <div class="col-6 col-lg-4 px-0">
                                <p class="textPuja2 __saldodispopujar"></p>
                                <p class="textPuja2 __saldodispopujarusd" hidden></p>
                            </div>
                            <div class="col-6 col-lg-2 px-1">
                                <p class="textPuja1 _trans928">Valor<br> a pujar</p>
                            </div>

                            <div class="col-6 col-lg-3 px-1">
                                <input type="tel" class="form-control border-input-modal-pujar __maskFloat__ __cantidadPuja">

                                <input type="tel" class="form-control border-input-modal-pujar __maskFloat__ __cantidadPujaUSD" readonly hidden>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <button class="btn-pujarr __pujar" type="button">
                            <div class="__pujar__text">
                                <span class="spinner-border spinner-border-xl __pujar__spinner" role="status" aria-hidden="true" style="display: none;"></span>
                                <img loading="lazy" src="../imagen/Mano.png" alt="puja - nasbi.com">
                                <span class="_trans930">PUJAR AHORA</span>
                            </div>
                        </button>
                    </div>

                    <div class="col-12 p-0">
                        <p class="textsugerido "><span class="_trans929"></span>

                            <input class="modal__puja__sugerido  " type="checkbox">
                        </p>
                    </div>

                    <div class="col-12 col__errors__content" style="display: none;">
                        <img loading="lazy" src="../imagen/atencion.png" class="img-modal">
                        <p class="text-error col__errors__msg"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal advertencias-->
<div class="modal fade" id="modal-advertencias" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img src="../imagen/logo-modal.png" class="logo-modal" loading="lazy" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <img loading="lazy" src="../imagen/atencion.png" class="img-modal">

                    <h4 class="modal__advertencias__title"></h4>

                    <p class="modal__advertencias__description"></p>
                </div>
                <div class="contant-button02">
                    <button class="btntikets trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal advertencias-->
<div class="modal fade" id="modal-advertencias-finalizada" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <img loading="lazy" src="../imagen/atencion.png" class="img-modal">

                    <h4 class="modal__advertencias__title">INFORMACIÓN</h4>

                    <p class="modal__advertencias__description">Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.</p>
                </div>
                <div class="contant-button02">

                    <button class="btncomrar trans_112 ver__historial" data-dismiss="modal" aria-label="Close">Mi historial</button>
                    <button class="btntikets trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- modal transparente -->
<div class="modal fade" id="modal-subasta-finalizada" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content content-modal transparente-modal-ganador-perdedor">
            <div class="modal-body transparente-modal-ganador-perdedor">
                <div class="row">
                    <div class="col-12 relative-mix">
                        <img loading="lazy" class="img-gif-ganador modal__subastas__winner" src="../assets/giffs/1-es.gif" alt="nasbi.com" style="display: none;">

                        <img loading="lazy" class="img-gif-ganador modal__subastas__nowinner" src="../assets/giffs/2-es.gif" alt="nasbi.com" style="display: none;">

                        <p class="texto-perdedor perdedor-animation">Siempre puedes intentarlo de nuevo, no te desanimes</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>