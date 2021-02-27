<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans522">Nasbi.com | Modificar publicación </title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/modificar-publicacion.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-content" id="opciones-editar">
            <div class="col-12 px-xl-5 pb-3">
                <h2 class="trans209_"></h2>
                <p class="trans210_"></p>
            </div>
    
            <div class="col-sm-6 px-xl-5">
                <h5 class="trans211_">Titulo</h5>
                <p class="titulo_edit_p"> </p>

                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi editar_titu_edit"><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"> </button>
            </div>
            <div class="col-sm-6 px-xl-5">
                <h5 class="trans223_">Categoría</h5>
                <p class="categoria_sub_p"></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi  button_categoria"><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>
            <div class="col-md-6 px-xl-5">
                <h5 class="trans0">Descripción</h5>
                <p class="descrip_edit_p"></textarea></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi  edit_descrit_b"><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>
            <div class="col-md-6 px-xl-5">
                <h5 class="trans215_">Condición</h5>
                <p class="texto_condicion_p"></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi  editar_con_edit"><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>

            <div class="col-12 px-xl-5">

                <h5 class="trans173_">Fotos</h5>

                <div class="row __divfotos_edit">
                    <!--fotos -->
                </div>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi editar_img"><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>

            <div class="col-sm-6 col-md-4 px-xl-5">
                <h5 class="trans28">Marca</h5>
                <p class="marca_p_edit"></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi marca_edit_bu "><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>
            <div class="col-sm-6 col-md-4 px-xl-5">
                <h5 class="trans34_">Precio</h5>
                <p><span>$</span> <span class="precio_p"></span></p>
                <!--<input type="text" class="marca_edit trans195___ph ">-->
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi edit_precio_bu "><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>
            <div class="col-sm-6 col-md-4 px-xl-5" id="div-edit-tipo-envio">
                <h5 class="trans115_">Envío</h5>
                <p class="tipoenvio_edit_p"></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi btn_edit_envio"><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>

            <div class="col-sm-6 col-md-4 px-xl-5" id="div-edit-cantidad">
                <h5 class="trans48"></h5>
                <p class="cantidad_edit_p"></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi edit_cantidad_pro"><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>


            <div class="col-sm-6 col-md-4 px-xl-5">
                <h5 class="trans29"></h5>
                <p class="modelo_edit_publi"></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi edit_modelo_pro"><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>


            <div class="col-sm-6 col-md-4 px-xl-5">
                <h5 class="trans159"></h5>
                <p class="url_video_edit"></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi cambio_url_edit_video"><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>


             <div class="col-sm-6 col-md-4 px-xl-5">
                <h5 class="trans299_">Tipo de publicacion</h5>
                <p class="exposicion_text_edit"></p>
                <button class="btn-edit btn_init_modificar_publi loading_modificar_publi cambio_tipo_exposicion"  ><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div> 

            <div class="col-sm-6 col-md-4 px-xl-5" id="div-edit-direccion">
                <h5 class="trans18"></h5>
                <p ></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi  editar_dire_edit "><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>

            <!-- <div class="col-sm-6 col-md-4 px-xl-5">
                <h5 class="trans114_"></h5>
                <p></p>
                <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi  change_editar_tipo_publi "><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div> -->

            <div class="col-sm-6 col-md-4 px-xl-5" id="div-tallas-colores">
                <h5 class="trans_eb27">Tallas y colores</h5>
                <button class="btn-edit btn_init_modificar_publi loading_modificar_publi cambio_tallas_colores"  ><span class="trans61"></span> <img loading="lazy" src="../imagen/edit.png"></button>
            </div>

            <div class="col-12 px-xl-5">
                <button class="btn-publicar publicar_edit trans116_"></button>
            </div>
        </div>
    </div>
</body>



<!-- ------------------------------------------------ Modales ------------------------------------------------ -->

<!--modal campo de inputs-->
<div class="modal fade" id="modal-cambiar_camp_in" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_buen no_cambiar_valor">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="titulo_cambio_edit">¡Buen trabajo!</h4>
                    <input type="text" class="cambiar_valor_in form-control">
                </div>
                <div class="contn-condiciones_edit">
                    <button class="cancelar_condi trans_02  no_cambiar_valor">Cancelar</button>
                    <button class="aceptar_condi trans_01  si_cambiar_valor modal-cambiar_camp_in loading_modificar_publi" data-toggle="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!--modal campo de inputs precio-->
<div class="modal fade" id="modal-cambiar_camp_pri" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_buen no_cambiar_pri_valor">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <form class="input_precio_edit">
                    <div class="row row-inf">

                        <div class="col-lg-4 px-1 px-sm-3">
                            <h4 class="titulo_cambio_pri_edit text-left"></h4>
                            <input type="text" class="cambiar_valor_pri form-control">
                        </div>

                        
                        <div class="col-lg-4 px-1 px-sm-3 trans_311__tooltip"  data-toggle="tooltip" data-placement="top" title="Escribe aquí que porcentaje pagarás en impuestos." style="cursor: pointer;">
                            <h4 class="textPorc text-left">Tax</h4>
                            <div class="input-group group-pocents">
                                <span class="input-group-addon"><i class="fas fa-percent"></i></span>
                                <input type="text" class="cambiar_valor_procentaje_tax form-control">
                            </div>
                        </div>

                        <div class="col-lg-4 px-1 px-sm-3">
                            <h4 class="trans112_ text-left"></h4>
                            <p class="respuesta_promo_edit text-left m-0">
                                <input type="Radio" class="colorin_edit_si" name="oferta_edit" value="1">
                                <label class="trans_53 m-0"></label>&nbsp;&nbsp;&nbsp;&nbsp;
        
                                <input type="Radio" class="colorin_edit_no" name="oferta_edit" value="0">
                                <label class="trans25_ m-0"></label>
                            </p>
                        </div>
                        <div class="col-lg-4 px-1 px-sm-3">
                            <h4 class="textPorc trans467_ text-left">Porcentaje</h4>
                            <div class="input-group group-pocents">
                                <span class="input-group-addon"><i class="fas fa-percent"></i></span>
                                <input type="text" class="cambiar_valor_procentaje form-control">
                            </div>
                        </div>

                        <div class="col-lg-4 px-1 px-sm-3">
                            <h4 class="titulo_cambio_pri_desc_edit text-left"></h4>
                            <input type="text" class="valor_con_descuento form-control" disabled>
                        </div>
                    </div>
                </form>

                <div class="contn-condiciones_edit">
                    <button class="cancelar_condi  trans_02  no_cambiar_pri_valor">Cancelar</button>
                    <button class="aceptar_condi  trans_01  si_cambiar_pri_valor loading_modificar_publi" data-toggle="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!--cambio categoria-->
<div class="modal fade" id="modal-cambiar_camp_cate" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_buen no_cambiar_cate">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <br>
                <div class="row row-inf">
                    <div class="col-sm-6 colselects">
                        <h4 class="trans223_ text-left mt-4 mb-1"></h4>
                        <select class="form-control __categoria_edit select-plataforma"></select>
                    </div>
                    
                    <div class="col-sm-6 colselects __divsubcategoria">
                        <h4 class="trans298_ text-left mt-4 mb-1"></h4>
                        <select class="form-control __subcategoria_edit selectpicker select-plataforma">
                            <option class="trans206_" value="0"></option>
                        </select>
                    </div>
                    <div class="col-12">
                        <br>
                        <div class="contn-condiciones_edit">
                            <button class="cancelar_condi trans_02  no_cambiar_cate" style="background-color: #005FFF;">Cancelar</button>
                            <button class="aceptar_condi  trans_01 si_cambiar_cate loading_modificar_publi" data-toggle="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Modal editar envio publi-->
<div class="modal fade" id="modal-cambiar_envio_edit" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_buen no_cambiar_envio_edit">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="scroll-condi">
                    <form class="datos_caracteristica_product_edit">
                        <div class="row row-inf">
                            <div class="col-lg-6">
                                <h4 class="trans120_ text-left mb-2">Unidad de distancia</h4>
                                <select class="form-control __unidadDistancia_edit select-plataforma"></select>
                            </div>
                            <div class="col-lg-6">
                                <h4 class="trans121_ text-left mb-2">Alto</h4>
                                <input type="text" class="form-control __maskFloat__ __alto_edit" placeholder="alto">
                            </div>
                            <div class="col-lg-6">
                                <h4 class="trans122_ text-left mb-2">Largo</h4>
                                <input type="text" class="form-control __maskFloat__ __largo_edit" placeholder="Largo">
                            </div>
                            <div class="col-lg-6">
                                <h4 class="trans123_ text-left mb-2">Ancho</h4>
                                <input type="text" class="form-control __maskFloat__ __ancho_edit" placeholder="Ancho">
                            </div>
                            <div class="col-lg-6">
                                <h4 class="trans124_ text-left mb-2">Unidad de peso</h4>
                                <input type="text" class="form-control __unidadPeso_edit" placeholder="Peso" readonly>
                            </div>
                            <div class="col-lg-6">
                                <h4 class="trans125_ text-left mb-2">Peso</h4>
                                <input type="text" class="form-control __maskFloat__ __peso_edit" placeholder="Peso">
                            </div>
                        </div>
                    </form>
                    <div class="row publc2 container_envio_edit __divenvio_edit">
                    </div>
                    <div class="contn-condiciones_edit">
                        <button class="cancelar_condi trans_02  no_cambiar_envio_edit">Cancelar</button>
                        <button class="aceptar_condi  trans_01 btn_aceptar_envio_edit loading_modificar_publi">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Modal textarea descripcion-->
<div class="modal fade" id="modal-cambiar_camp_tarea" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_buen no_cambiar_valor_descrip">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="titulo_cambio_edit_text"></h4>
                    <textarea rows="5" class="form-control descrip_edit trans192___ph"></textarea>
                </div>
                <div class="contn-condiciones_edit">
                    <button class="cancelar_condi trans_02  no_cambiar_valor_descrip">Cancelar</button>
                    <button class="aceptar_condi trans_01  si_cambiar_valor_descrip loading_modificar_publi" data-toggle="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Modal editar condicion publi-->
<div class="modal fade" id="modal-cambiar_camp_condi" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row mb-4">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_buen no_cambiar_valor_condi">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="scroll-condi">
                    <div class="row container_condiciones_edit  __condicionesproducto_edit">
                    </div>
                    <div class="contn-condiciones_edit">
                        <button class="cancelar_condi trans_02  no_cambiar_valor_condi">Cancelar</button>
                        <button class="aceptar_condi trans_01 si_cambiar_valor_condi loading_modificar_publi" data-toggle="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--modal editar imagenes-->
<div class="modal fade" id="modal-cambiar_camp_img" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_buen no_cambiar_valor_img">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="row row-inf">
                    <div class="col-12">
                        <h4 class="trans173_ text-sm-left mt-4 mb-0">Fotos</h4>
                        <div class="row __divfotos_edit_2"></div>
                        <div class="contn-condiciones_edit">
                            <button class="cancelar_condi trans_02  no_cambiar_valor_img" style="background-color: #005FFF;">Cancelar</button>
                            <button class="aceptar_condi trans_01  si_cambiar_valor_img loading_modificar_publi">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Modal cambiar dire publi-->
<div class="modal fade" id="modal-cambiar_dire" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close alert_salir_flu_su_buen no_cambiar_valor_dire">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <!-- <div class="row row-inf">
                    <h4 class="titulo_cambio_edit_text label-paso trans18 title-direcciones">¡Buen trabajo!</h4>
                </div> -->

                <div class="row row-public  d-flex flex-nowrap justify-content-around">
                    <div class="row row-inf">
                        <div class="col-sm-6 col-lg-4">
                            <h4 class="trans15 text-left mb-0">País</h4>
                            <input type="text" class="form-control __pais_edit" placeholder="País" readonly>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <h4 class="trans16 text-left mb-0">Departamento</h4>
                            <input type="text" class="form-control __departamento_edit" placeholder="Departamento" readonly>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <h4 class="trans17 text-left mb-0">Ciudad</h4>
                            <input type="text" class="form-control __ciudad_edit" placeholder="Ciudad" readonly>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <h4 class="trans18 text-left mb-0">Dirección</h4>
                            <input type="text" class="form-control __direccion_edit" placeholder="Dirección" readonly>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <h4 class="trans19 text-left mb-0">Código Postal</h4>
                            <input type="text" class="form-control __zip_edit" placeholder="Código Postal" readonly>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <button class="btn-edit btn_cambiar_dir_edit "><span class="trans240_"></span> <img loading="lazy" src="../imagen/edit.png"></button>
                        </div>
                    </div>
                </div>
                <div class="contn-condiciones_edit mt-5">
                    <button class="cancelar_condi trans_02  no_cambiar_valor_dire ">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal elegir direcciones-->
<div class="modal fade" id="modal-direcciones_edit" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close btn_cancelar_dir_edit">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="scroll-condi mt-4 mb-3">
                    <div class="row row-inf __alldirecciones_cuenta_edit mb-lg-5"></div>
                    <div class="contn-condiciones_edit">
                        <button class="cancelar_condi trans_02 btn_cancelar_dir_edit">Cerrar</button>
                        <button class="aceptar_condi  trans_01 btn_aceptar_dir_edit loading_modificar_publi">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal felciidades-->
<div class="modal fade" id="modal-felciidades_edit" tabindex="-1" role="dialog" aria-hidden="true">
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

                <div class="row row-inf">
                    <h4 class="trans_69">Felicidades</h4>
                    <p class="trans119_">Hemos publicado tu venta con exito</p>
                </div>
                <div class="contn-condiciones_edit">
                    <button class="btn btn-primary confirmar_felicidades_edit trans118_">Confirmar</button>
                    <!-- <button class="btncomrar">Revisar</button> -->
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal elegir tipo publicacion-->
<div class="modal fade" id="modal-tipo_publi_edit" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com"  src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close btn_cancelar_tipo_publi_edit" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="scroll-condi">
                    <div class="row container-cat __tiposProdutos_edit"></div>
                    
                    <div class="contn-condiciones_edit">
                        <button class="cancelar_condi trans_02 btn_cancelar_tipo_publi_edit">Cerrar</button>
                        <button class="aceptar_condi  trans_01 btn_aceptar_tipo_publi_edit loading_modificar_publi">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal elegir tipo exposicion-->
<div class="modal fade" id="modal-tipo_exposicion_edit" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close btn_cancelar_tipo_exposicion_edit" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="scroll-condi">
                    <div class="row mt-4 row-public __divexposicion_edit"></div>
                    
                    <div class="contn-condiciones_edit">
                        <button class="cancelar_condi trans_02 btn_cancelar_tipo_exposicion_edit">Cerrar</button>
                        <button class="aceptar_condi  trans_01 btn_aceptar_tipo_exposicion_edit loading_modificar_publi">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!--modal cambiar url video y portada-->
<div class="modal fade" id="modal-url_video_youtube" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close cancelar_url_video">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div align="center">
                    <div class="row">                       
                        <div class="col-12 ">
                            <span class="ocultar_opcion_img"> <h4 class="trans401_ text_change_vi mb-0 mt-2"></h4></span>
                            <span class="ocultar_opcion_img cuadro_img_edit_video"></span>
                            
                            <h4 class="trans159 text_change_vi mb-0 mt-3"></h4>
                            <input type="text" class="url_video_edit_modal form-control text-center trans158___ph">
                        </div>
                    </div>
                </div>

                <div class="row div_video_edit">
                    <div class="contenedor-videos col-12" align="center">
                        <h4 class="trans402_ text_change_vi mt-4"></h4>
                       <span class="contenido_url_video"></span>
                    </div>
                </div>

                <div class="contn-condiciones_edit">
                    <button class="cancelar_condi trans_02  cancelar_url_video">Cancelar</button>
                    <button class="aceptar_condi trans_01  aceptar_url_video modal-cambiar_camp_in loading_modificar_publi" data-toggle="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!--modal cambiar tallas y colores-->
<div class="modal fade" id="modal-talla-color" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="trans_299__src logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close cancelar_talla_color">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="row row-inf">
                    <div class="col-12">
                        <h4 class="trans_eb27 mb-0">Title</h4>
                    </div>
                </div>
                <div class="scroll-modal-tallas">
                    <div class="row row-tallas" id="talla-cantidad">
                    </div>
                    <div class="mb-2 text-center">
                        <a href="#" class="btn btn-add-more-color"><i class='fa fa-plus'></i> <span class="trans_eb28"></span></a>
                    </div>
                    <div class="d-none" id="content-colors">
                        <div class="text-center">
                            <h5 class="trans_eb9 modal-title" id="exampleModalLongTitle">Select a color:</h5>
                        </div>
                        <div id="div-colors-edit">

                        </div>
                        <div class="row text-center paginacion_colores">
                        </div>
                        <div id="content-tallas" class="d-none">
                            <div class="text-center">
                                <h5 class="trans_eb10 modal-title" id="exampleModalLongTitle">Select a size:</h5>
                            </div>
                            <div class="text-center" id="div-talla-edit">
                            </div>
                        </div>
                        <div class="div-buttons-talla mb-5">
                            <button class="btn-create-color">
                                Crear color <i class='fa fa-plus'></i>
                            </button>
                        </div>

                        <div class="text-center div-create-color d-none">
                            <h5 class="label-create-color trans_eb53">Crear un nuevo color:</h5>

                            <div class="row row-escoger-color">
                                <div class="col-12">
                                    <p class="trans_eb9">Escoje el color: </p>
                                    <input type="color" class="color-picker form-control input-picker-color">
                                </div>

                                <div class="col-6 px-lg-4">
                                    <label for="" class="trans_eb37">Nombre ES: </label>
                                    <input type="text" class="form-control nombre_es_picker">
                                </div>
                                <div class="col-6 px-lg-4">
                                    <label for="" class="trans_eb38">Nombre EN:</label>
                                    <input type="text" class="form-control nombre_en_picker">
                                </div>

                                <div class="col-12 px-0 pt-4 pb-lg-5">
                                    <div class="">
                                        <button class="btn-cancel-create btn-canell01 trans_eb42">Atras</button>
                                        <button class="btn-save-create btn-createll01 trans_eb43">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contn-condiciones_edit mb-0">
                    <button class="cancelar_condi trans_02  cancelar_talla_color">Cancelar</button>
                    <button class="aceptar_condi trans_01  aceptar_talla_color modal-cambiar_camp_in loading_modificar_publi" data-toggle="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>



<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/modificar-publicacion.js"></script>

</html>