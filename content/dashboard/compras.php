<!-- Compras -->
<div class="tab-pane fade" id="ref-compras" role="tabpanel" aria-labelledby="id-compras">

    <div class="row loading-spinners content__loadingSpinner">
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

    <!-- <div class="cont-compra content__list__compras" style="display: none;"> -->
    <div class="cont-compra">
        <div class="row row-title-compras">
            <div class="col-12 col-sm-4 col-md-6">
                <h3 class="title-section _trans217">Compras</h3>
            </div>
            <div class="col-7 col-sm-5 col-md-4">
                <div class="input-group group-filtro">
                    <div class="input-group-prepend">
                        <span class="input-group-text _trans322">Ordernar:</span>
                    </div>
                    <div class="dropdown divdropdownfiltro content_select"></div>
                </div>
            </div>
            <div class="col-5 col-sm-3 col-md-2 actualizar__content">
                <button class="btnTle actualizar__content__btn _trans323" type="button">
                    Actualizar
                </button>
            </div>
        </div>
    </div>

    <!-- <div class="table-responsive responsive-table-publicaciones"> -->
    <div class="table-responsive">
        <table class="table table-ventas tabla_compras">
            <thead>
                <tr>
                    <th class="_trans319">Artículo</th>
                    <th class="_trans320">Valor</th>
                    <th class="_trans157">Vendedor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="list__compras body-table"></tbody>
        </table>
    </div>

    <div class="content__list__compras__pagination"></div>

    <div class="row list__nodata_compra" style="display: none;">
        <div class="col-lg-12">
            <div class="content__nodata">
                <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                <p class="label-title_nodata trans_44">Ningún producto por aquí.</p>
                <label class="trans_45">Regresa más tarde.</label>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - detalle orden -->
    <div class="modal fade" id="modal-compras-timeline-detalle-orden" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidde99n="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="row rowIm">
                        <div class="col-lg-7 px-2">
                            <h5 class="titleModal _trans220">Detalle de orden</h5>



                            <!-- <div class="row rowIm">
                                <div class="col-md-5 px-1">
                                    <div class="container-mdal">
                                        <img loading="lazy" src="../imagen/product.jpg" class="img-mdal compras__timeline__img" alt="nasbi.com">
                                    </div>
                                </div>
                                <div class="col-md-7 px-1 col-name-modal">
                                    <h5 style="color: #626262 !important; font-family: Open San, sans-serif !important">#<span class="compras__timeline__id"></span></h5>
                                    <h5 class="compras__timeline__nameproduct">...</h5>
                                    <h4 class="compras__timeline__amount">$ 0 USD</h4>
                                </div>
                            </div> -->


                            <div class="col-12" align="center">
                                <div class="conten-imgg">



                                    <!-- <div class="contenedorprodct"> -->
                                    <div class="row rowIm contenedorprodct">
                                        <div class="col-md-5 px-1">
                                            <div class="container-mdal">
                                                <img loading="lazy" src="../imagen/product.jpg" class="img-mdal compras__timeline__img" alt="nasbi.com">
                                            </div>
                                        </div>
                                        <div class="col-md-7 px-1 col-name-modal">
                                            <h5 style="color: #626262 !important; font-family: Open San, sans-serif !important">#<span class="compras__timeline__id"></span></h5>
                                            <h5 class="compras__timeline__nameproduct">...</h5>
                                            <p class="info-ord compras__timeline__variantes"></p>
                                            <h4 class="compras__timeline__amount">$ 0 USD</h4>
                                        </div>
                                    </div>
                                    <!-- </div> -->
                                </div>
                                <i class="fas fa-chevron-left left-slid subasta__nasbi__btnprev" style="left: -20px !important"></i>
                                <i class="fas fa-chevron-right right-slid subasta__nasbi__btnnext"></i>
                                <div class="preview-img compras_timeline__items">
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




                            <p class="info-ord "><span> <b class="_trans366">Ciudad:</b></span><span class="compras__timeline__comprador__city"> Bogotá </span> </p>
                            <p class="info-ord "><span><b class="_trans367">Dirección de entrega:</b></span> <span class="compras__timeline__comprador__address">Transversal 22 - 44 apto 102</span></p>
                        </div>

                        <div class="col-lg-5 px-29 compras__timeline__descripcion">
                            <p class="info-ord"><b class="_trans314">Estado: </b> <span class="_trans324">Tu orden fue entregada</span></p>
                            <p class="info-ord"><b class="_trans314">Estado: </b> <span class="_trans325">Tu orden esta lista para ser retirada</span></p>
                            <p class="info-ord"><b class="_trans314">Estado: </b><span class="_trans326"> Tu orden esta lista para ser confirmada</span></p>
                            <p class="info-ord"><b class="_trans314">Estado: </b> <span class="_trans327">Hemos recibido tu solicitud de orden de compra</span></p>
                        </div>
                    </div>

                    <div class="row pb-5">
                        <div class="col-12 px-0 to_show_message_when_hide_line">
                            <ol class="ol-timeline">
                                <li>

                                    <div class="conPoin">
                                        <span class="point compras__timeline__process__steps__1 pointactive"></span>
                                        <hr class="hr-left">
                                        <p class="textime _trans334">Solicitud<br> Enviada<br></p>
                                        <p class="textime _option_0"></p>
                                    </div>


                                </li>
                                <li>

                                    <div class="conPoin">
                                        <span class="point compras__timeline__process__steps__2"></span>
                                        <hr class="hr-right">
                                        <hr class="hr-left mr-top-15">
                                        <p class="textime _trans335">Orden<br> Confirmada<br> </p>
                                        <p class="textime _option_1"></p>
                                    </div>



                                </li>
                                <li>

                                    <div class="conPoin">
                                        <span class="point compras__timeline__process__steps__3"></span>
                                        <hr class="hr-right">
                                        <hr class="hr-left mr-top-15">
                                        <p class="textime _trans336">Orden<br> En camino<br></p>
                                        <p class="textime _option_2"></p>
                                    </div>


                                </li>
                                <li>

                                    <div class="conPoin">
                                        <span class="point compras__timeline__process__steps__4"></span>
                                        <hr class="hr-right">
                                        <p class="textime _trans337">Orden<br> Entregada<br></p>
                                        <p class="textime _option_3"></p>
                                    </div>


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


    <div class="modal fade" id="modal-new-subastas-custom-nouso" tabindex="1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body new-body-subas">
                    <div class="row row-blue">
                        <div class="col-9">
                            <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="row row-content-modal">
                        <div class="col-lg-6 pl-lg-0 pr-lg-5" align="center">
                            <div class="conten-imgg">

                                <i class="fas fa-chevron-left left-slid subasta__nasbi__btnprev"></i>
                                <i class="fas fa-chevron-right right-slid subasta__nasbi__btnnext"></i>

                                <div class="contenedorprodct">
                                    <img loading="lazy" src="../imagen/product.jpg" class="img-prodct subasta__nasbi__img__present" alt="nasbi.com">
                                </div>
                            </div>
                            <div class="preview-img">
                                <div>
                                    <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com" class="subasta__nasbi__img__1">
                                </div>
                                <div>
                                    <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com" class="subasta__nasbi__img__2">
                                </div>
                                <div>
                                    <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com" class="subasta__nasbi__img__3">
                                </div>
                                <div>
                                    <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com" class="subasta__nasbi__img__4">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 px-md-0">
                            <p class="header-modal-label2 subasta__nasbi__prev__status trans_125">
                                Estado de subasta: <span class='info__subastas__estado'>Activa</span>
                            </p>
                            <h3 class="nombre-producto-subast subasta__nasbi__prev__name">Nombre producto subasta</h3>
                            <div class="row row-comerc">
                                <div class="col-12 p-0">
                                    <div class="row">
                                        <div class="col-6 px-2">
                                            <p class="trans_131">Valor comercial:</p>
                                        </div>
                                        <div class="col-6 px-2">
                                            <p class="text-left">
                                                <img loading="lazy" src="../imagen/valor-comercial.png"> <span class="subasta__nasbi__prev__valorcomercial">432 USD</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="row subasta-red">
                                        <div class="col-6 px-2">
                                            <p class="trans_132">Valor de subasta:</p>
                                        </div>
                                        <div class="col-6 px-2">
                                            <p class="text-left">
                                                <img loading="lazy" src="../imagen/valor-subastas.png"> <span class="subasta__nasbi__prev__valorsubasta">232 USD</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 p-0">
                                    <div class="row">
                                        <div class="col-6 px-2">
                                            <p class="trans_133">Participantes:</p>
                                        </div>
                                        <div class="col-6 px-2">
                                            <p class="text-left">
                                                <img loading="lazy" src="../imagen/participantes.png"> <span class="subasta__nasbi__prev__participantes">32</span><span class="trans_134"> Personas</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row row-descuento">
                                <div class="col-sm-6 px-2">
                                    <h4 class="text-porciento"><img loading="lazy" src="../imagen/porciento.png"> <span class="trans_135">Descuento*</span></h4>
                                </div>
                                <div class="col-sm-6 px-0">
                                    <div class="progress-subast">
                                        <div class="subasta__nasbi__prev__porcentaje">60%</div>
                                        <span class="tooltip-operations texto_tooltip_aumentalo">¡Aumentalo ahora!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-blue rrt">
                        <div class="col-lg-8">
                            <p class="trans_136">Inscríbete a esta subasta, compártela con tus <br>amigos y aumenta el descuento.</p>
                        </div>
                        <div class="col-lg-4">
                            <button class="btn-insc trans405_ subasta__nasbi__prev__btnInsc">Inscribirse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>





























    <!-- Modal CLIENTE - Confirmación del vendedor -->
    <div class="modal fade" id="modal-compras-confirmacion-de-vendedor" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p><span class="_trans339">Actualmente tu orden se encuentrá esperando la confirmación del vendedor. </span> <a class="_trans44" data-toggle="modal" data-dismiss="modal" href="#modal-compras-timeline-detalle-orden"> Ver detalles</a></p>
                            <div class="contn-entrega">
                                <button class="btnsi trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - compra declinada por el vendedor -->
    <div class="modal fade" id="modal-compras-declinada-por-vendedor" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p class="_trans340">Tu orden de compra ha sido declinada por parte del vendedor:</p>

                            <div class="compras_declinada_content_skeletons">
                                <div class="skeleton-line" style="width: 90%"></div>
                                <div class="skeleton-line" style="width: 90%"></div>
                                <div class="skeleton-line" style="width: 90%"></div>
                            </div>

                            <p class="compras_declinada_content">
                                <span class="compras_declinada_motivo"></span>
                                <a class="compras_declinada_motivo_newOrder _trans341" href="/producto.php?uid="> ¿Crear otra orden?</a>
                            </p>

                            <div class="compras__declinada__noconcretado__content" style="display: none;">
                                <p class="compras__declinada__noconcretado__inf _trans342">Se esta analizando el motivo por cual esta orden no se concreto.</p>
                            </div>

                            <div class="contn-entrega">
                                <button class="btnno compras_declinada_btn trans_01" class="close" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - adjuntar comprobante - '3', 'Espera de pago'-->
    <?php include '../include/form-payu.php'; ?>

    <!-- Modal CLIENTE - '10', 'No concretado' -->
    <div class="modal fade" id="modal-compras-info-payu" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338"></h5>

                            <p class="trans_138">Los compras realizadas a través de una pasarela de pagos deben ser procesados por la plataforma. Este proceso puede tardar unos cuantos segundos <strong>(evite realizar pagos dobles).</strong> Si usted ya realizo el pago de su orden verifique el estado de su transacción dando <a class="modal__info__payu">click aquí</a></p>

                            <div class="modal__info__payu__status" style="display: none;">
                                <p class="p_negrillas modal__info__payu__status__text"> </p>
                            </div>

                            <div class="contn-entrega">
                                <button class="btnno trans_140 modal__info__payu__toPayU" data-dismiss="modal" aria-label="Close">Ir a pagar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-compras-adjuntar-comprobante" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p class="_trans343">Ya puedes adjuntar el comprobante de pago de tu orden.</p>

                            <img loading="lazy" class="__imgfoto compras_adjuntar_comprobante_img" src="" alt="Comprobante de pago - nasbi.com">
                            <div>
                                <input type="file" accept="image/*" name="file" id="file" class="inputfile __uploadfoto_general" />
                                <label class="_trans344" for="file"> Subir comprobante </label>
                            </div>

                            <div>
                                <p class="_trans345">Descripción:</p>
                                <textarea class="form-control compras_adjuntar_comprobante_description" cols="30" rows="5" maxlength="300"></textarea>

                            </div>

                            <p class="compras_adjuntar_comprobante_erros"></p>

                            <div class="contn-entrega">
                                <button class="btnno compras_adjuntar_comprobante_btn" type="button">
                                    <span class="spinner-border spinner-border-sm compras_adjuntar_comprobante_btn__spinner trans_16__btn" role="status" aria-hidden="true" style="display: none;"></span> <span class="trans_16__btn">Enviar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - '1', 'Confirmación del vendedor' -->
    <div class="modal fade" id="modal-compras-confirmacion-de-vendedor" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p><span class="_trans339">Actualmente tu orden se encuentrá esperando la confirmación del vendedor. </span> <a class="_trans44" data-toggle="modal" data-dismiss="modal" href="#modal-compras-timeline-detalle-orden"> Ver detalles</a></p>
                            <div class="contn-entrega">
                                <button class="btnsi trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - esperando a que el vendedor confirme el pago - '5', 'Confirmar comprobante' -->
    <div class="modal fade" id="modal-compras-comprobante-esperando-comfirm-vendedor" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p><span class="_trans346">Actualmente el comprobante para tu orden se encuentrá esperando la confirmación del vendedor. </span> <a class="_trans44" data-toggle="modal" data-dismiss="modal" href="#modal-compras-timeline-detalle-orden"> Ver detalles</a></p>

                            <div class="col-12 compras_comprobante_de_pago_img"></div>

                            <div class="contn-entrega">
                                <button class="btnsi trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - adjuntar comprobante - '3', 'Espera de pago' -->
    <div class="modal fade" id="modal-compras-volver-adjuntar-comprobante" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p class="_trans347">Tu comprobante de pago ha sido declinado por parte del vendedor. Recuerda Subir una imagen nitida, verifica que tu documento no tenga algún elemento o contraluz que afecte su legibilidad.</p>

                            <div class="compras_volver_adjuntar_comprobante_nota">
                                <h5 class="_trans348">En caso de no ser aceptado el comprobante pasará a estado no concretado hasta que nuestro equipo de soporte pueda analizar la situación y dar una respuesta</h5>
                            </div>

                            <h6 class="_trans349">Motivo: </h6>
                            <p class="compras_volver_adjuntar_comprobante_motivo"></p>

                            <div class="container-public">
                                <img loading="lazy" class="__imgfoto compras_volver_adjuntar_comprobante_img imagen-public" src="" alt="Comprobante de pago - nasbi.com">
                            </div>

                            <div>
                                <input type="file" accept="image/*" name="file" id="file" class="inputfile __uploadfoto_general" />
                                <label class="_trans344" for="file"> Subir comprobante </label>
                            </div>

                            <div>
                                <p class="_trans345">Descripción:</p>
                                <textarea class="compras_volver_adjuntar_comprobante_description" cols="30" rows="5" maxlength="300"></textarea>

                            </div>

                            <p class="compras_volver_adjuntar_comprobante_erros"></p>

                            <div class="contn-entrega">
                                <button class="btnno compras_volver_adjuntar_comprobante_btn" type="button">
                                    <span class="spinner-border spinner-border-sm compras_volver_adjuntar_comprobante_btn__spinner" role="status" aria-hidden="true" style="display: none;"></span> <span class="trans_16__btn ">Enviar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - '6', 'Espera de envío' -->
    <div class="modal fade" id="modal-compras-espera-de-envio-vendedor" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p><span class="_trans350">Actualmente tu orden se encuentrá esperando a que el vendedor ingrese la información de envío. </span> <a class="_trans44" data-toggle="modal" data-dismiss="modal" href="#modal-compras-timeline-detalle-orden"> Ver detalles</a></p>
                            <div class="contn-entrega">
                                <button class="btnsi trans_01" data-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - '6', 'Caso especial 1' -->
    <div class="modal fade" id="modal-compras-caso-especial-1" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <div class="row content-foto ">
                        <img class="img-carousel modal_imagen__producto m-auto" src="" alt="imagen-producto-nasbi.com">
                    </div>

                    <div class="row row-titleEntrega">
                        <div class="col-12">
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p class="trans_205">El vendedor no ha realizado el envío, puedes cancelar la orden y el valor de tu compre regresará a disponible.</p>
                        </div>
                        <div class="col-12 contn-entrega">
                            <button class="btnsi compra_abrir_chat_modal trans_203">Chat en linea</button>
                            <button class="btnsi trans_204" data-dismiss="modal" data-toggle="modal" data-target="#modal-cancelar-compra ">Cancelar Compra</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - '6', 'Caso especial 1', Cancelar Compra -->
    <div class="modal fade" id="modal-cancelar-compra" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <div class="row content-foto">
                        <img class="img-carousel modal_imagen__producto m-auto" src="" alt="imagen-producto-nasbi.com">
                    </div>

                    <div class="row row-titleEntrega">
                        <div class="col-12 pt-4">
                            <p class="_trans416">Escriba el motivo por el cual desea cancelar la compra</p>
                            <textarea class="cancelar_input_motivo form-control" rows="5"></textarea>
                            <div class="contn-entrega">
                                <button class="btnsi btn_cancelar_compra ">
                                    <span class="_trans417">Cancelar Compra</span>
                                    <span class="spinner-border spinner-border-sm spiner_cancelar_compra" style="display: none;" role="status" aria-hidden="true"></span>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - El vendedor ingreso los datos y numero de guia - '7', 'Confirmar recepción' -->
    <div class="modal fade" id="modal-compras-Confirmar-recepcion" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans351"></h5>

                            <p class="_trans352"></p>

                            <p><span class="_trans353"></span> <a class="_trans354 abrir_chat_compras_dos" data-toggle="modal" data-dismiss="modal"> </a></p>

                            <ul class="ul-recep">
                                <li class="compras__confirm__recepcion__content__empresa">
                                    <h5 class="_trans355"></h5><span class="compras__confirm__recepcion__empresa"></span>
                                </li>

                                <li class="compras__confirm__recepcion__content__numguia">
                                    <h5 class="_trans356"> </h5><span class="compras__confirm__recepcion__numguia"></span>
                                </li>

                                <!-- <li class="compras__confirm__recepcion__content__urlguia">
                                    <a href="" class="compras__confirm__recepcion__urlguia _trans357" target="_blank"> </a>
                                </li> -->
                            </ul>
                            <!-- 
                              <p>¿Cual fue el estado en el que llego tu orden?</p>
                              <textarea class="compras__confirm__recepcion__descripcion" cols="30" rows="5" maxlength="300"></textarea>
                            -->
                            <div class="contn-entrega">
                                <button class="btnno compras__confirm__recepcion__llegomal trans_54"></button>
                                <button class="btnsi compras__confirm__recepcion__llegobien ">
                                    <span class="trans_53"></span>
                                    <span class="spinner-border spinner-border-sm spiner_recepcion_bien" style="display: none;" role="status" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - '7', 'Caso especial', Reclamo por retardo o insatisfaccion -->
    <div class="modal fade" id="modal-reclamar" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <h5 class="label-titulo _trans421"> Adjunta una foto a tu petición</h5>
                    <label for="file-upload2">
                        <div class="content-foto">
                            <img loading="lazy" class="img-carousel img_modal_evidencia" src="../imagen/product.jpg" alt="imagen-producto-nasbi.com">
                        </div>
                    </label>
                    <input id="file-upload2" type="file" accept="image/*" style="display: none;" class="input_reclamo_evidencia">

                    <div class="row row-titleEntrega">
                        <div class="col-12">
                            <p class="label-titulo _trans420">Escriba el motivo por el cual se encuentra insatisfecho con su compra</p>
                            <textarea class="form-control reclamo_input_motivo" rows="5"></textarea>
                            <div class="contn-entrega">
                                <button class="btnsi btn_enviar_reclamo ">
                                    <span class="trans_16__btn">Enviar</span>
                                    <span class="spinner-border spinner-border-sm spiner_enviar_reclamo" style="display: none;" role="status" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - '9', 'Devolución del producto' -->
    <div class="modal fade" id="modal-compras-proceso-de-devolucion-vendedor" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p><span class="_trans358">Actualmente tu orden se encuentrá en proceso de devolución. </span></p>
                            <ul>

                                <li class="compras__devolucion__orden__content__empresa">
                                    <h5 class="_trans355">Entidad: </h5><span class="compras__devolucion__orden__empresa"></span>
                                </li>

                                <li class="compras__devolucion__orden__content__numguia">
                                    <h5 class="_trans359">Número de guía: </h5><span class="compras__devolucion__orden__numguia"></span>
                                </li>

                                <li class="compras__devolucion__orden__content__urlguia">
                                    <a href="" class="compras__devolucion__orden__urlguia _trans357" target="_blank"> Ir a ver mi envío</a>
                                </li>

                            </ul>
                            <div class="contn-entrega">
                                <button class="btnsi trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - '10', 'No concretado' -->
    <div class="modal fade" id="modal-compras-proceso-no-concretada-vendedor" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p class="_trans360">Actualmente tu orden se encuentrá como <strong>no concretada</strong>. Nuestro equipo de soporte analizará la situación y dar una respuesta.</p>

                            <div class="contn-entrega">
                                <button class="btnsi trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - Pregunta devolver -->
    <div class="modal fade" id="modal-compras-proceso-devolucion" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="_trans338">Información de tú orden</h5>
                            <p class="_trans361">Formas para realizar la devolución de tu orden de compra</p>

                            <br><br>
                            <div class="contn-entrega">
                                <button class="btnno compras__proceso__devolucion__contact _trans362" data-dismiss="modal" aria-label="Close">Contactar vendedor</button>

                                <button class="btnno compras__proceso__devolucion__devolucion_shippo _trans363" data-dismiss="modal" aria-label="Close">Devolver por Shippo</button>

                                <button class="btnno compras__proceso__devolucion__devolucion_normal _trans364" data-dismiss="modal" aria-label="Close">Devolver otro lado</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - Pregunta devolver ADJUNTAR GUIA -->
    <div class="modal fade" id="modal-compras-proceso-devolucion-adjuntar-guia" tabindex="-1" role="dialog" aria-hidden="true" style="overflow-y: scroll; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
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
                                            <p class="m-0 mt-1 vendedor__enviopais"></p>
                                        </div>
                                        <div class="col-12 col-lg-6 col-xl-6">
                                            <p class="m-0 mt-3 text-primary trans16"></p>
                                            <p class="m-0 mt-1 vendedor__enviodep"></p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-lg-6 col-xl-6">
                                            <p class="m-0 mt-3 text-primary trans17"></p>
                                            <p class="m-0 mt-1 vendedor__enviociudad"></p>
                                        </div>
                                        <div class="col-12 col-lg-6 col-xl-6">
                                            <p class="m-0 mt-3 text-primary trans19"></p>
                                            <p class="m-0 mt-1 vendedor__enviocodigopostal"></p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <p class="m-0 mt-3 text-primary trans18"></p>
                                            <p class="m-0 mt-1 vendedor__enviodirecion"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row __envio1op">
                        <div class="col-12 mt-3 p-3" align="center">
                            <h6 class="card-title trans116"></h6>
                            <div class="compras__rutasenvio">
                                <div class="spinner-grow text-primary text-center" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 contn-entrega mx-0">
                            <button class="btnno trans_02" data-dismiss="modal"></button>
                            <button class="btnsi trans_16__btn compras__realizarenvio__shippo"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CLIENTE - Pregunta devolver ADJUNTAR GUIA NORMAL-->
    <div class="modal fade" id="modal-compras-proceso-devolucion-adjuntar-guia-normal" tabindex="-1" role="dialog" aria-hidden="true" style="overflow-y: scroll; max-height:85%;  margin-top: 50px; margin-bottom:50px;">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
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
                                            <p class="m-0 mt-1 vendedor__enviopais"></p>
                                        </div>
                                        <div class="col-12 col-lg-6 col-xl-6">
                                            <p class="m-0 mt-3 text-primary trans16"></p>
                                            <p class="m-0 mt-1 vendedor__enviodep"></p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-lg-6 col-xl-6">
                                            <p class="m-0 mt-3 text-primary trans17"></p>
                                            <p class="m-0 mt-1 vendedor__enviociudad"></p>
                                        </div>
                                        <div class="col-12 col-lg-6 col-xl-6">
                                            <p class="m-0 mt-3 text-primary trans19"></p>
                                            <p class="m-0 mt-1 vendedor__enviocodigopostal"></p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <p class="m-0 mt-3 text-primary trans18"></p>
                                            <p class="m-0 mt-1 vendedor__enviodirecion"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="row __envio1op">
                        <div class="col-12 mt-3 p-3" align="center">
                            <h6 class="card-title trans116"></h6>
                            <div class="compras__rutasenvio">
                                <div class="spinner-grow text-primary text-center" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row __envio2op">
                        <div class="col-12 col-xl-6 col-lg-6">
                            <p class="m-0 mt-3 text-primary trans112"></p>
                            <p class="m-0 mt-1 __envioempresa"></p>
                        </div>
                        <div class="col-12 col-xl-6 col-lg-6">
                            <p class="m-0 mt-3 text-primary trans114"></p>
                            <p class="m-0 mt-1 __envionumeroguia"></p>
                        </div>
                        <div class="col-12 col-xl-6 col-lg-6">
                            <a class="m-0 mt-1 text-decoration-none __envioetiqueta" target="_blank"></a>
                        </div>
                        <div class="col-12 col-xl-6 col-lg-6">
                            <a class="m-0 mt-1 text-decoration-none __envioseguimiento" target="_blank"></a>
                        </div>
                    </div> -->
                    <div class="row __envio3op">
                        <div class="col-12">
                            <p class="compras__error__msg _trans365" style="display: none;">Ingresa todos los datos de envío</p>
                        </div>
                        <div class="col-12">
                            <p class="m-0 mt-3 text-primary trans112"></p>
                            <input type="text" maxlength="250" class="form-control compras__numero_guia trans113__ph">
                            <p class="m-0 mt-3 text-primary trans114"></p>
                            <input type="text" maxlength="250" class="form-control compras__empresa_envio trans115__ph">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 contn-entrega mx-0 compras__devolucion__btns">
                            <button class="btnno trans_02" data-dismiss="modal"></button>
                            <button class="btnsi trans_16__btn compras__realizarenvio__normal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal calificar vendedor -->
    <div class="modal fade" id="modal-compras-calificar-vendedor" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <h5 class="titleCalif _trans821"></h5>
                            <p class="descrip-cali"><span class="trans123">Como estuvo tu compra con</span> <span class="calificar__vendedor__name">Nombre vendedor</span></p>
                        </div>
                    </div>
                    <div class="row mt-4 pl-5 pr-5">
                        <div class="col-12 col-xl-6 col-lg-6">
                            <h6 class="content-text-cali"><span><img src="../imagen/insignias/satisfaccion.png"></span> <span class="text-calif trans_89"></span></h6>
                        </div>
                        <div class="col-12 col-xl-6 col-lg-6">
                            <form class="calificar__vendedor__item1" name="calificar__vendedor__item1">
                                <p class="content-text-cali clasificacion-vendedor">
                                    <input id="radio1" type="radio" name="estrellas1" value="5">
                                    <label for="radio1"><i class="fas fa-star"></i></label>

                                    <input id="radio2" type="radio" name="estrellas1" value="4">
                                    <label for="radio2"><i class="fas fa-star"></i></label>

                                    <input id="radio3" type="radio" name="estrellas1" value="3">
                                    <label for="radio3"><i class="fas fa-star"></i></label>

                                    <input id="radio4" type="radio" name="estrellas1" value="2">
                                    <label for="radio4"><i class="fas fa-star"></i></label>

                                    <input id="radio5" type="radio" name="estrellas1" value="1" checked>
                                    <label for="radio5"><i class="fas fa-star"></i></label>
                                </p>
                            </form>
                            <!-- <h6 class="titleCalif">¿Que fue lo mas sobresaliente?</h6> -->
                        </div>
                    </div>
                    <div class="row mt-2 pl-5 pr-5">
                        <div class="col-12 col-xl-6 col-lg-6">
                            <h6 class="content-text-cali"><span><img src="../imagen/insignias/atencion.png"></span> <span class="text-calif trans_90"></span></h6>
                        </div>
                        <div class="col-12 col-xl-6 col-lg-6">
                            <form class="calificar__vendedor__item2" name="calificar__vendedor__item2">
                                <p class="content-text-cali clasificacion-vendedor">
                                    <input id="radio2_1" type="radio" name="estrellas2" value="5">
                                    <label for="radio2_1"><i class="fas fa-star"></i></label>

                                    <input id="radio2_2" type="radio" name="estrellas2" value="4">
                                    <label for="radio2_2"><i class="fas fa-star"></i></label>

                                    <input id="radio2_3" type="radio" name="estrellas2" value="3">
                                    <label for="radio2_3"><i class="fas fa-star"></i></label>

                                    <input id="radio2_4" type="radio" name="estrellas2" value="2">
                                    <label for="radio2_4"><i class="fas fa-star"></i></label>

                                    <input id="radio2_5" type="radio" name="estrellas2" value="1" checked>
                                    <label for="radio2_5"><i class="fas fa-star"></i></label>
                                </p>
                            </form>
                            <!-- <h6 class="titleCalif">¿Que fue lo mas sobresaliente?</h6> -->
                        </div>
                    </div>
                    <div class="row mt-2 pl-5 pr-5">
                        <div class="col-12 col-xl-6 col-lg-6">
                            <h6 class="content-text-cali"><span><img src="../imagen/insignias/tiempo.png"></span> <span class="text-calif trans_91"></span></h6>
                        </div>
                        <div class="col-12 col-xl-6 col-lg-6">
                            <form class="calificar__vendedor__item3" name="calificar__vendedor__item3">
                                <p class="content-text-cali clasificacion-vendedor">
                                    <input id="radio3_1" type="radio" name="estrellas3" value="5">
                                    <label for="radio3_1"><i class="fas fa-star"></i></label>

                                    <input id="radio3_2" type="radio" name="estrellas3" value="4">
                                    <label for="radio3_2"><i class="fas fa-star"></i></label>

                                    <input id="radio3_3" type="radio" name="estrellas3" value="3">
                                    <label for="radio3_3"><i class="fas fa-star"></i></label>

                                    <input id="radio3_4" type="radio" name="estrellas3" value="2">
                                    <label for="radio3_4"><i class="fas fa-star"></i></label>

                                    <input id="radio3_5" type="radio" name="estrellas3" value="1" checked>
                                    <label for="radio3_5"><i class="fas fa-star"></i></label>
                                </p>
                            </form>
                            <!-- <h6 class="titleCalif">¿Que fue lo mas sobresaliente?</h6> -->
                        </div>
                    </div>
                    <div class="row mt-2 pl-5 pr-5">
                        <div class="col-12 col-xl-6 col-lg-6">
                            <h6 class="content-text-cali"><span><img src="../imagen/insignias/tiempo.png"></span> <span class="text-calif trans_92"></span></h6>
                        </div>
                        <div class="col-12 col-xl-6 col-lg-6">
                            <form class="calificar__vendedor__item4" name="calificar__vendedor__item4">
                                <p class="content-text-cali clasificacion-vendedor">
                                    <input id="radio4_1" type="radio" name="estrellas4" value="5">
                                    <label for="radio4_1"><i class="fas fa-star"></i></label>

                                    <input id="radio4_2" type="radio" name="estrellas4" value="4">
                                    <label for="radio4_2"><i class="fas fa-star"></i></label>

                                    <input id="radio4_3" type="radio" name="estrellas4" value="3">
                                    <label for="radio4_3"><i class="fas fa-star"></i></label>

                                    <input id="radio4_4" type="radio" name="estrellas4" value="2">
                                    <label for="radio4_4"><i class="fas fa-star"></i></label>

                                    <input id="radio4_5" type="radio" name="estrellas4" value="1" checked>
                                    <label for="radio4_5"><i class="fas fa-star"></i></label>
                                </p>
                            </form>
                            <!-- <h6 class="titleCalif">¿Que fue lo mas sobresaliente?</h6> -->
                        </div>
                    </div>
                    <div class="row mt-4 pl-5 pr-5">
                        <div class="col-12">
                            <h6 class="titleCalif text-center mb-3 trans124"></h6>
                            <textarea class="form-control mt-3 compras__calificar__vendedor__descrip trans_93__ph" rows="5" maxlength="255"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 compras__calificar__vendedor__content__erros" style="display: none;">
                            <p class="compras__calificar__vendedor__erros trans_94"></p>
                        </div>
                        <div class="col-12 contn-entrega mx-0">
                            <button class="btnno trans_02" data-dismiss="modal"></button>
                            <button class="btnsi  compras__calificar__vendedor__btn">
                                <span class="trans_16__btn"></span>
                                <span class="spinner-border spinner-border-sm spiner_calificar_vendedor" style="display: none;" role="status" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>