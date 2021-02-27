<div class="tab-pane fade" id="ref-ventas" role="tabpanel" aria-labelledby="id-ventas">
    <!-- Div principal -->
    <div class="ventas__list__content__general" style="display: none;">
        <div class="ventas__list__content">
            <div>
                <div class="row row-title-compras title_venta_style">
                    <div class="col-sm-6">
                        <h3 class="title-section _trans218">Ventas</h3>
                    </div>
                    <!-- <div class="col-sm-6">
                        <button class="btton-mejorar _trans368 tips_mejorar_ventas">Tips para mejorar tus inventarios</button>
                    </div> -->
                </div>

                <div class="row row-info-venta">
                    <div class="col-sm-6 col-md-3 pr-2">
                        <p><b class="trans_328">Por confirmar</b></p>
                        <p><span class="ventas__estadistica__preparar">0</span> <span class="trans282_"></span></p>
                    </div>
                    <div class="col-sm-6 col-md-3 px-4">
                        <p><b class="_trans370">Listas para despachar</b></p>
                        <p><span class="ventas__estadistica__despachar">0</span> <span class="trans282_"></span></p>
                    </div>
                    <div class="col-sm-6 col-md-3 px-4">
                        <p><b class="_trans371">En tránsito</b></p>
                        <p><span class="ventas__estadistica__transito">0</span> <span class="trans282_"></span></p>
                    </div>
                    <div class="col-sm-6 col-md-3 pl-2 pr-0">
                        <p><b class="_trans372">Finalizadas</b></p>
                        <p><span class="ventas__estadistica__finalizadas">0</span> <span class="trans282_"></span></p>
                    </div>
                </div>

                <div class="row row-filtro-venta">
                    <div class="col-sm-6 col-lg-3 col-xl-2 px-1 ">
                        <p class="label-filter"><span><img src="../imagen/filtro.png" /></span> <span class="_trans312"></span></p>
                    </div>
                    <div class="col-sm-6 col-lg-2 col-xl-2 px-1 ">
                        <div class="input-group group-filtro">
                            <div class="input-group-prepend">
                                <span class="input-group-text _trans314">Estado:</span>
                            </div>
                            <div class="content_estado_venta">
                                <select class="dropdown divdropdownfiltro filtro_estado_venta"></select>
                            </div>

                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-4 col-xl-5 px-1 ">
                        <!--  <div class="input-group group-filtro">
                            <div class="input-group-prepend">
                                <span class="input-group-text _trans315">Tipo de exposición:</span>
                            </div>
                            <div class="content_expo_venta">
                                <select class="dropdown divdropdownfiltro filtro_exposicion_venta"></select>
                            </div>

                        </div>-->
                    </div>
                    <div class="col-sm-6 col-lg-3 col-xl-3 px-1">
                        <div class="input-group group-filtro frilter-ordenar">
                            <div class="input-group-prepend">
                                <span class="input-group-text _trans322">Ordernar:</span>
                            </div>
                            <div class="dropdown divdropdownfiltro content_select_venta">
                                <!-- <select class="drop-filtro" id=""></select> -->
                                <!-- <button class="drop-filtro filter-compras seleccionado_filter dropdown-toggle" type="button" id="time" data-toggle="dropdown" aria-haspopup="true" data-toggle="tooltip" data-placement="bottom" aria-expanded="false">estado</button> -->
                            </div>
                        </div>
                        <!-- <button class="btn btn-primary">Actualizar</button> -->
                    </div>
                </div>

                <!-- tabla listado venta -->
                <div class="row titulosdeventas">
                    <!---->
                    <div class="col-12 px-0">
                        <div class="table-responsive responsive-table-ventas">
                            <table class="table table-ventas">
                                <thead>
                                    <tr>
                                        <th class="_trans319">Artículo</th>
                                        <th class="_trans320">Valor</th>
                                        <th class="_trans321">Unidad</th>
                                        <th class="trans20">Estado</th>
                                        <!-- <th class="_trans315">Tipo de exposición</th> -->
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="ventas__list"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class=" col-sm-6 col-lg-3 col-xl-4 px-1">
                <div class=" paginacion_numeros"></div>
            </div>
        </div>

        <div class="ventas__list__nodata content__nodata_venta_miscuentas" style="display: none;">
            <div class="content__nodata">
                <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com" />
                <p class="label-title_nodata trans02_">Ningún producto por aquí.</p>
                <label class="trans_45">Regresa más tarde.</label>
            </div>
        </div>

        <div class="conten_opcion_crear_em" style="display: none; padding:20px">
            <div class="boton_publicar_individual">
                <a class="btn-partic trans453_"></a>
            </div>
            <div class="content__nodata_venta_miscuentas boton_publicar_individual" style="display: none;">
                <div class="content__nodata">
                    <a class="btn-partic trans453_"></a>
                </div>
            </div>
        </div>





        <!-- Modal CLIENTE - detalle orden -->
        <div class="modal fade" id="modal-ventas-timeline-detalle-orden" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div class="row rowIm">
                            <div class="col-lg-7 px-2">
                                <h5 class="titleModal _trans220">Detalle de orden</h5>

                                <!--                                 
                                <div class="row rowIm">
                                    <div class="col-md-5 px-1">
                                        <div class="container-mdal">
                                            <img loading="lazy" src="../imagen/product.jpg" class="img-mdal ventas__timeline__img" alt="nasbi.com">
                                        </div>
                                    </div>
                                    <div class="col-md-7 px-1 col-name-modal">
                                        <h5 style="color: #626262 !important; font-family: Open San, sans-serif !important">#<span class="ventas__timeline__id"></span></h5>
                                        <h5 class="ventas__timeline__nameproduct">...</h5>
                                        <h4 class="ventas__timeline__amount"><!-- $ 0 USD </h4>
                                    </div>
                                </div> -->


                                <div class="col-12" align="center">
                                    <div class="conten-imgg">



                                        <!-- <div class="contenedorprodct"> -->
                                        <div class="row rowIm contenedorprodct_vender">
                                            <div class="col-md-5 px-1">
                                                <div class="container-mdal">
                                                    <img loading="lazy" src="../imagen/product.jpg" class="img-mdal ventas__timeline__img" alt="nasbi.com">
                                                </div>
                                            </div>
                                            <div class="col-md-7 px-1 col-name-modal">
                                                <h5 style="color: #626262 !important; font-family: Open San, sans-serif !important">#<span class="ventas__timeline__id"></span></h5>
                                                <h5 class="ventas__timeline__nameproduct">...</h5>
                                                <p class="info-ord ventas__timeline__variantes"></p>
                                                <h4 class="ventas__timeline__amount">
                                                    <!-- $ 0 USD-->
                                                </h4>
                                            </div>
                                        </div>
                                        <!-- </div> -->
                                    </div>
                                    <i class="fas fa-chevron-left left-slid vender__nasbi__btnprev" style="left: -20px !important"></i>
                                    <i class="fas fa-chevron-right right-slid vender__nasbi__btnnext"></i>
                                    <div class="preview-img ventas_timeline__items">
                                        <div>
                                            <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com" class="">
                                        </div>
                                        <div>
                                            <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com" class="">
                                        </div>
                                        <div>
                                            <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com" class="">
                                        </div>
                                        <div>
                                            <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com" class="">
                                        </div>
                                    </div>
                                </div>



                                <p class="info-ord "><span> <b class="_trans366">Ciudad:</b></span><span class="ventas__timeline__comprador__city">
                                        <!-- Bogotá --> </span> </p>
                                <p class="info-ord "><span><b class="_trans367">Dirección de entrega:</b></span> <span class="ventas__timeline__comprador__address">
                                        <!-- Transversal 22 - 44 apto 102 --></span></p>
                            </div>

                            <div class="col-lg-5 px-2 ventas__timeline__descripcion">
                                <!-- <p class="info-ord"><b class="_trans314">Estado: </b> <span class="_trans324">Tu orden fue entregada</span></p>
                                <p class="info-ord"><b class="_trans314">Estado: </b> <span class="_trans325">Tu orden esta lista para ser retirada</span></p>
                                <p class="info-ord"><b class="_trans314">Estado: </b><span class="_trans326"> Tu orden esta lista para ser confirmada</span></p>
                                <p class="info-ord"><b class="_trans314">Estado: </b> <span class="_trans327">Hemos recibido tu solicitud de orden de compra</span></p> -->
                            </div>
                        </div>

                        <div class="row pb-3">
                            <div class="col-12 px-0 to_show_message_when_hide_line">
                                <ol class="ol-timeline">
                                    <li>
                                        <div class="conPoin">
                                            <span class="point ventas__timeline__process__steps__1 pointactive"></span>
                                            <hr class="hr-left">
                                        </div>
                                        <p class="textime trans_201">Nueva<br> Solicitud<br></p>
                                        <p class="textime _option_0"></p>
                                    </li>
                                    <li>
                                        <div class="conPoin">
                                            <span class="point ventas__timeline__process__steps__2"></span>
                                            <hr class="hr-right">
                                            <hr class="hr-left mr-top-15">
                                        </div>
                                        <p class="textime _trans335">Orden<br> Confirmada<br> </p>
                                        <p class="textime _option_1"></p>
                                    </li>
                                    <li>
                                        <div class="conPoin">
                                            <span class="point ventas__timeline__process__steps__3"></span>
                                            <hr class="hr-right">
                                            <hr class="hr-left mr-top-15">
                                        </div>
                                        <p class="textime trans_202">Orden<br> Despachada<br></p>
                                        <p class="textime _option_2"></p>
                                    </li>
                                    <li>
                                        <div class="conPoin">
                                            <span class="point ventas__timeline__process__steps__4"></span>
                                            <hr class="hr-right">
                                        </div>
                                        <p class="textime _trans337">Orden<br> Entregada<br></p>
                                        <p class="textime _option_3"></p>
                                    </li>
                                </ol>
                                <div class="message_aux">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal confirmacion venta -->
        <div class="modal fade" id="modal-confirmacion-venta" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div class="row row-titleEntrega">

                            <div class="col-12 __imagenproductoventa"></div>

                            <div class="col-12 col-name-modal __descripcionadicional"></div>

                            <div class="col-12 col-name-modal __contenedorconfirmar">
                                <h5 class="mt-4 title-subast2 "> <span class="trans436_"></span> <span class="unidad_nasbi_bono"></span></h5>
                                <p class="mt-4 title-subast2 __direccion__nasbicoin__confirmar__venta"></p>
                            </div>
                            <div class="col-12 col-name-modal __contenedorjustificacion">
                                <h5 class="mt-4 title-subast2 trans90"></h5>
                                <textarea class="form-control __justificaciondeclinarventa trans91__ph" rows="5"></textarea>
                            </div>
                            <div class="col-12 contn-entrega mx-0">
                                <button class="btnno  __declinarventa ">
                                    <span class="trans03_"></span>
                                    <span class="spinner-border spinner-border-sm spiner_aceptar_venta" style="display: none;" role="status" aria-hidden="true"></span>
                                </button>
                                <button class="btnsi __aceptarventa ">
                                    <span class="trans_01"></span>
                                    <span class="spinner-border spinner-border-sm spiner_aceptar_venta" style="display: none;" role="status" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de envio -->
        <div class="modal fade" id="modal-envio" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal" />
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div class="row row-titleEntrega mt-3">
                            <div class="col-12">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title trans111"></h5>
                                        <div class="row">
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans15"></p>
                                                <p class="m-0 mt-1 __enviopais"></p>
                                            </div>
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans16"></p>
                                                <p class="m-0 mt-1 __enviodep"></p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans17"></p>
                                                <p class="m-0 mt-1 __enviociudad"></p>
                                            </div>
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans19"></p>
                                                <p class="m-0 mt-1 __enviocodigopostal"></p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <p class="m-0 mt-3 text-primary trans18"></p>
                                                <p class="m-0 mt-1 __enviodirecion"></p>
                                            </div>
                                        </div>
                                        <div class="row __envio1op content-rutas">
                                            <div class="col-12 mt-3 p-3" align="center">
                                                <h5 class="card-title trans116"></h5>
                                                <div class="__rutasenvio">
                                                    <div class="spinner-grow text-primary text-center" role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row __envio2op">
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans112"></p>
                                                <p class="m-0 mt-1 __envioempresa"></p>
                                                <a class="m-0 mt-1 text-decoration-none __envioetiqueta" target="_blank"></a>
                                            </div>
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans114"></p>
                                                <p class="m-0 mt-1 __envionumeroguia"></p>
                                                <a class="m-0 mt-1 text-decoration-none __envioseguimiento" target="_blank"></a>
                                            </div>
                                        </div>
                                        <div class="row __envio3op">
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans112"></p>
                                                <input type="text" maxlength="250" class="form-control __empresa_envio trans113__ph" />
                                            </div>
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans114"></p>
                                                <input type="text" maxlength="250" class="form-control  __numero_guia trans115__ph" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 contn-entrega mx-0">
                                                <button class="btnno trans_02" data-dismiss="modal"></button>
                                                <button class="btnsi  __realizarenvio">
                                                    <span class="trans_16__btn"></span>
                                                    <span class="spinner-border spinner-border-sm spiner_realizar_envio" style="display: none;" role="status" aria-hidden="true"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal calificar comprador -->
        <div class="modal fade" id="modal-calificar-comprador" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal" />
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <h5 class="titleCalif trans122"></h5>
                                <p class="descrip-cali __nombrecompradocal"></p>
                            </div>
                        </div>
                        <div class="row mt-4 px-md-4">
                            <div class="col-md-8">
                                <h6 class="content-text-cali">
                                    <span><img src="../imagen/insignias/satisfaccion.png" /></span> <span class="text-calif trans125"></span>
                                </h6>
                            </div>
                            <div class="col-md-4">
                                <p class="content-text-cali clasificacion-vendedor">
                                    <input id="__expradio1" type="radio" name="__experienciaventa" value="5" />
                                    <label for="__expradio1"><i class="fas fa-star"></i></label>
                                    <input id="__expradio2" type="radio" name="__experienciaventa" value="4" />
                                    <label for="__expradio2"><i class="fas fa-star"></i></label>
                                    <input id="__expradio3" type="radio" name="__experienciaventa" value="3" />
                                    <label for="__expradio3"><i class="fas fa-star"></i></label>
                                    <input id="__expradio4" type="radio" name="__experienciaventa" value="2" />
                                    <label for="__expradio4"><i class="fas fa-star"></i></label>
                                    <input id="__expradio5" type="radio" name="__experienciaventa" value="1" checked />
                                    <label for="__expradio5"><i class="fas fa-star"></i></label>
                                </p>
                                <!-- <h6 class="titleCalif">¿Que fue lo mas sobresaliente?</h6> -->
                            </div>
                        </div>
                        <div class="row px-md-4">
                            <div class="col-md-8">
                                <h6 class="content-text-cali">
                                    <span><img src="../imagen/insignias/atencion.png" /></span> <span class="text-calif trans126"></span>
                                </h6>
                            </div>
                            <div class="col-md-4">
                                <p class="content-text-cali clasificacion-vendedor">
                                    <input id="__comuradio1" type="radio" name="__comunicacioncliente" value="5" />
                                    <label for="__comuradio1"><i class="fas fa-star"></i></label>
                                    <input id="__comuradio2" type="radio" name="__comunicacioncliente" value="4" />
                                    <label for="__comuradio2"><i class="fas fa-star"></i></label>
                                    <input id="__comuradio3" type="radio" name="__comunicacioncliente" value="3" />
                                    <label for="__comuradio3"><i class="fas fa-star"></i></label>
                                    <input id="__comuradio4" type="radio" name="__comunicacioncliente" value="2" />
                                    <label for="__comuradio4"><i class="fas fa-star"></i></label>
                                    <input id="__comuradio5" type="radio" name="__comunicacioncliente" value="1" checked />
                                    <label for="__comuradio5"><i class="fas fa-star"></i></label>
                                </p>
                                <!-- <h6 class="titleCalif">¿Que fue lo mas sobresaliente?</h6> -->
                            </div>
                        </div>
                        <div class="row px-md-4">
                            <div class="col-md-8">
                                <h6 class="content-text-cali">
                                    <span><img src="../imagen/insignias/tiempo.png" /></span> <span class="text-calif trans127"></span>
                                </h6>
                            </div>
                            <div class="col-md-4">
                                <p class="content-text-cali clasificacion-vendedor">
                                    <input id="__punradio1" type="radio" name="__puntualidadpago" value="5" />
                                    <label for="__punradio1"><i class="fas fa-star"></i></label>
                                    <input id="__punradio2" type="radio" name="__puntualidadpago" value="4" />
                                    <label for="__punradio2"><i class="fas fa-star"></i></label>
                                    <input id="__punradio3" type="radio" name="__puntualidadpago" value="3" />
                                    <label for="__punradio3"><i class="fas fa-star"></i></label>
                                    <input id="__punradio4" type="radio" name="__puntualidadpago" value="2" />
                                    <label for="__punradio4"><i class="fas fa-star"></i></label>
                                    <input id="__punradio5" type="radio" name="__puntualidadpago" value="1" checked />
                                    <label for="__punradio5"><i class="fas fa-star"></i></label>
                                </p>
                                <!-- <h6 class="titleCalif">¿Que fue lo mas sobresaliente?</h6> -->
                            </div>
                        </div>
                        <div class="row mt-1 px-md-4">
                            <div class="col-12">
                                <h6 class="titleCalif text-center mb-3 trans124"></h6>
                                <textarea class="form-control mt-3 __descripcalificarcomprador trans128__ph" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 contn-entrega mx-0">
                                <button class="btnno trans_02" data-dismiss="modal"></button>
                                <button class="btnsi  __calificarcomprador">
                                    <span class="trans_16__btn"></span>
                                    <span class="spinner-border spinner-border-sm spiner_calificar_comprador" style="display: none;" role="status" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de devolucion -->
        <div class="modal fade" id="modal-devolucion-vendedor" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal" />
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div class="row row-titleEntrega mt-3">
                            <div class="col-12">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title trans111"></h5>
                                        <div class="row">
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans15"></p>
                                                <p class="m-0 mt-1 __enviodevpais"></p>
                                            </div>
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans16"></p>
                                                <p class="m-0 mt-1 __enviodevdep"></p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans17"></p>
                                                <p class="m-0 mt-1 __enviodevciudad"></p>
                                            </div>
                                            <div class="col-12 col-lg-6 col-xl-6">
                                                <p class="m-0 mt-3 text-primary trans19"></p>
                                                <p class="m-0 mt-1 __enviodevcodigopostal"></p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <p class="m-0 mt-3 text-primary trans18"></p>
                                                <p class="m-0 mt-1 __enviodevdirecion"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row row-titleEntrega">
                            <div class="col-12">
                                <h5 class="trans114"></h5>
                                <p class="__numguiaviewvendedor"></p>
                            </div>
                            <div class="col-12">
                                <h5 class="trans112"></h5>
                                <p class="__empresaenvioviewvendedor"></p>
                            </div>
                        </div>
                        <div class="col-12 contn-entrega mx-0">
                            <button class="btnno _trans112" data-dismiss="modal"></button>
                            <button class="btnsi trans138 __confirmardevolucion"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ventas__newProductoOptions" style="display: none;">
        <div>
            <h3>Agregar productos a tu tienda</h3>
            <button class="ventas__newProductoOptions__AddMasiva btnmasivo" disabled="true">
                <a href="#" disabled="true" class="btnmasivo">
                    <span class="trans_275">PUBLICAR MASIVAMENTE</span>
                    <br>
                    <span class="trans_274">(Próximamente disponible)</span>
                </a>
            </button>

            <button class="ventas__newProductoOptions__AddNormal btnnormal">
                <a href="vender.php" class="btnnormal">
                    <br>
                    <span class="trans_276">PUBLICAR DE FORMA INDIVIDUAL</span>
                    <br>
                </a>
            </button>
        </div>

    </div>
</div>