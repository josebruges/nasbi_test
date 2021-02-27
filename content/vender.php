<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="trans23"></title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';

    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/vender.css">
</head>

<!-- Include Navbar : para todas las pantallas-->
<?php
include '../include/manager-navbar.php';
?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <!-- Seleccionar la categoria a vender -->
        <div class="row row-fondo steps __step0">
            <div class="col-12">
                <h3 class="title-section trans7"></h3>
                <p class="desc-section trans8"></b></p>
                <div class="container-cat __tiposProdutos"></div>
                <div class="conts-btns">
                    <button class="__nexttipo1 trans24"></button>
                </div>
            </div>
        </div>



       <!-- Paso 1 -->
        <div class="steps __step1 d-none">
            <div class="row row-fondos">
                <div class="col-12">
                    <h5 class="label-paso trans25"></h5>
                    <h3 class="info-datos trans26"></h3>

                    <div class="row row-form1">
                        <div class="col-sm-4">
                            <input type="text" maxlength="500" class="form-control __producto trans177___ph ">
                            <p class="trans27"></p>
                        </div>
                        <div class="col-sm-4">
                            <input type="text"  maxlength="500" class="form-control __marca trans178___ph" placeholder="Marca">
                            <p class="trans28"></p>
                        </div>
                        <div class="col-sm-4">
                            <input type="text"  maxlength="500" class="form-control __modelo trans190___ph" placeholder="Modelo">
                            <p class="trans29"></p>
                        </div>
                    </div>

                    <h3 class="info-datos trans0 texto_rojo_peque_style"></h3>
                    <p class="info-sction trans30"></p>
                    <div class="row row-input1">
                        <input type="text"  maxlength="500" class="form-control __titulo trans191___ph" placeholder="Titulo">
                    </div>
                    <div class="row row-input1">
                        <textarea rows="5"  maxlength="2000" class="form-control __descripcion trans192___ph"></textarea>
                    </div>
                    <div class="conts-btns">
                        <!-- <button class="btrei __backtipo2 _trans412"></button> -->
                        <button class="__nexttipo2 trans24"></button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Paso 2 -->
        <div class="steps __step2 d-none">
            <div class="row mt-5">
                <div class="col-12">
                    <h3 class="info-datos trans170_ texto_rojo_peque_style"></h3>
                    <!-- <p class="info-sction">Consolas y Videojuegos > Consolas > PlayStation 4 <span><button>Editar <img src="../imagen/edit.png"></button></span></p> -->
                </div>
            </div>

            <div class="row row-select-cat">
                <div class="col-md-6">
                    <h5 class="txx-if-vender trans_eb21"></h5>
                    <div class="__divcategoria"></div>
                </div>
                <div class="col-md-6">
                    <h5 class="txx-if-vender trans_eb21"></h5>
                    <div class="__divsubcategoria">
                        <select class="form-control __subcategoria selectpicker select-plataforma" disabled>
                            <option class="trans206_" value="0"></option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row row-condic mt-lg-3">
                <div class="col-12">
                    <h3 class="info-datos mt-5 trans171_ texto_rojo_peque_style"></h3>
                </div>

                <div class="row cards_condiciones_style __condicionesproducto"></div>

                <div class="col-md-12 card-condicion mb-0">
                    <h5 class="text-danger trans_eb16"></h5>
                    <p class="text-radios-colores">
                        <span class="span1 h6"><input type="radio" id="yes_talla" onclick="enableTallaSection()"><span class="span1 trans24_"></span></span>
                        <span class="h6"><input type="radio"  id="no_talla" onclick="disableTallaSection()"><span class=" trans25_"></span></span>
                    </p>
                </div>
                <div id="radio-selected" class="d-none">
                    <div class="col-12">
                        <div class="row row-select-color mt-3">
                            <div id="section-color" class="col-md-5 d-none">
                                <div class="content-select-color">
                                    <p class="trans_eb11 form-control inpits-sele" id="color_input"></p>
                                    <div class="content-return-color m-0" id="color_container">
                                        <div id="div_elegir_color">
                                            <!-- Button trigger modal -->
                                            <div id="selected-color"></div>
                                        </div>
                                    </div>
                                    <div class="trans_eb7 div-color" data-toggle="modal" data-target="#selectColorModal" onclick="getColors(1)">
                                    </div>
                                </div>
                            </div>
                            <div id="section-talla" class="col-md-4 d-none">
                                <div class="content-select-color">
                                    <p class="trans_eb12 form-control inpits-sele" id="color_input"></p>
                                    <div class="content-return-color m-0" id="talla_container">
                                        <div id="selected-tallas">

                                        </div>
                                    </div>
                                    <div class="trans_eb8 div-color" data-toggle="modal" data-target="#selectTallaColor" onclick="chargeColorsTalla()">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="content-select-color py-4">
                                    <p class="trans_eb15 form-control inpits-sele" id="color_input"></p>
                                    <p class="check-label-sex trans_eb13"></p>
                                    <p class="check-label-sex mt-3 trans_eb14"></p>
                                    <p class="check-label-sex mt-3 trans_eb20"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-tallas d-none" id="talla-cantidad">
                    </div>
                    <div class="col-12">
                        <h3 class="info-datos mt-5 trans172_ texto_rojo_peque_style"></h3>
                        <p class="info-sction trans174_ "></p>
                    </div>
                    <div class="row ">
                        <div class="row row-tallas">
                            <div class="row">
                                <div class="col-12">
                                    <div class="content-grig-photo">
                                        <h5 class="label-paso trans173_"></h5>
                                        <div class="__divfotos"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="row-seuff">
                                <div class="conlsseuff">
                                    <p class="insertar-url-video __viewinsertarvideo trans259">Insertar url de un vídeo + </p>
                                    <div class="__cardvideo d-none">
                                        <!-- <p class="label-form trans159"></p> -->
                                        <input type="text" class="form-control __urlvideo trans158___ph">
                                    </div>
                                </div>
                                <div id="div-cantidad-no-talla" class="conlsseuff d-none">
                                    <p class="label-form trans175_"></p>
                                    <input type="number" id="cantidad_no_talla"  maxlength="500" class="form-control __maskInt__ __cantidad trans194___ph">
                                </div>
                            </div>

                            <div class="row div_contenedor_img_video mt-5">
                                <div class="col-md-6">
                                    <label class="content-img2" style="cursor: pointer;">
                                        <img src="../imagen/vacio-vender.png" class="img-produ2 img_portada_video">
                                        <input type="file" class="form-control d-none __uploadfoto_img_video" accept="image/*">
                                    </label>
                                    <p class="label-form trans417_"></p>
                                </div>
                                <div class="col-md-6 iframe_video_vender"></div>
                            </div>
                            <div class="col-12">

                                <div class="conts-btns mt-5">
                                    <button class="btrei __backtipo3 _trans412"></button>
                                    <button class="trans24 __nexttipo3"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Paso 3 -->
        <div class="d-none steps __step3">
            <div class="row row-fondos paso2">
                <div class="col-12">
                    <h5 class="label-paso trans109_"></h5>
                    <h3 class="info-datos texto_rojo_peque_style trans110_"></h3>
                </div>
                <div class="col-12">
                    <div class="row row-pric">
                        <div class="col-12 px-0">
                            <h5 class="label-paso trans111_"></h5>
                        </div>
                        <div class="col-md-3 col-lg-3 px-2 trans_313__tooltip" data-toggle="tooltip" data-placement="top" title="Escribe aquí el precio del artículos con impuestos." style="cursor: pointer;">
                            <div class="input-group group-precio">
                                <span class="input-group-addon"><i class="fas fa-dollar-sign"></i></span>
                                <input type="text"  maxlength="500" class="form-control __maskUsd__ __precio trans_312__ph">
                            </div>
                        </div>

                        <div class="col-md-2 col-lg-1 px-2 trans_311__tooltip" data-toggle="tooltip" data-placement="top" title="Escribe aquí que porcentaje pagarás en impuestos." style="cursor: pointer;">
                            <div class="input-group group-precio iporcentaje">
                                <span class="textPorc">Tax</span>
                                <span class="input-group-addon"><b>%</b></span>
                                <input type="text"  maxlength="5" class="form-control __maskFloat__ __porcentajeTax" placeholder="0">
                            </div>
                        </div>

                        <div class="col-md-5 col-lg-4 px-2">
                            <p class="act-prom ">
                                <span class="span1 trans112_"></span>
                                <span class="span1 trans_53"></span> <input type="radio" name="oferta" value="1">
                                <span class="trans25_"> </span><input type="radio" name="oferta" value="0" cheked="true">
                            </p>
                        </div>
                        <div class="col-md-2 col-lg-3 px-2">
                            <div class="input-group group-precio iporcentaje">
                                <span class="textPorc trans467_">Porcentaje</span>
                                <span class="input-group-addon"><b>%</b></span>
                                <input type="text"  maxlength="500" class="form-control __maskFloat__ __porcentajeofer" placeholder="0" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row pb-5">
                <div class="col-12">
                    <h5 class="label-paso trans114_"></h5>
                </div>
                <div class="col-12">
                    <button class="btn-eleg-light mt-3 trans145 __subastar_producto"></button>
                    <p class="text-subasta-activa"><span class="text_quiero_subastar trans437_  d-none "></span> </br> <span class="_rango_subasta"></span></p>
                </div>
                <div class="col-12">
                    <div class="row row-public mt-4 __divexposicion">

                    </div>
                </div>
            </div>

            <div class="row pb-5 row-fondos">
                <div class="col-12">
                    <h5 class="label-paso trans115_"></h5>
                    <div class="row row-public publc2 pb-5">
                        <div class="col-12">
                            <div class="row row-form1 roelbls">
                                <div class="col-12">
                                    <button class="btn-dir_venta mt-3 cambiardir __vermisdirecciones"></button>
                                    <!-- <p class="label-paso mb-1 cambiardir __vermisdirecciones mb-1"></p> -->
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <p class="trans15"></p>
                                    <input type="text"  maxlength="500" class="form-control __pais trans267__ph" placeholder="País" readonly>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <p class="trans16"></p>
                                    <input type="text"  maxlength="500" class="form-control __departamento trans268__ph" placeholder="Departamento" readonly>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <p class="trans17"></p>
                                    <input type="text"  maxlength="500" class="form-control __ciudad trans269__ph" placeholder="Ciudad" readonly>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <p class="trans18"></p>
                                    <input type="text"  maxlength="500" class="form-control __direccion trans270__ph" placeholder="Dirección" readonly>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <p class="trans19"></p>
                                    <input type="text"  maxlength="500" class="form-control __zip trans271__ph" placeholder="Código Postal" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-5">
                        <div class="col-12">
                            <button class="btn-eleg _trans365 __opendatosenvio"></button>
                        </div>
                    </div>
                    <div class="row row-public publc2 __divenvio">
                    </div>
                    <div class="conts-btns mt-5 mb-4">
                        <button class="btrei __backtipo4 _trans412"></button>
                        <button class="trans116_" data-toggle="modal" data-target="#modal-confirmacion">Publicar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>

<!-- Include General JS -->
<?php include '../include/include-js.php'; ?>

</html>



<!-- Modal confirmacion-->
<div align="center">
    <div class="modal fade" id="selectColorModal" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <div class="text-center">
                        <h5 id="title-color" class="trans_eb9 modal-title" id="exampleModalLongTitle"></h5>
                    </div>
                    <div class="modal-body" id="div-colors">

                    </div>
                    <div class="row paginacion_colores">
                    </div>
                    <div class="btn-picker">
                        <button type="button"  class="btn-view-picker trans_eb36">Añadir mas colores</button>
                    </div>
                    <div class="row row-escoger-color div-picker-color d-none">
                        <div class="col-12">
                            <h5 class="trans_eb28">Añadir nuevo color:</h5>
                            <p for="" class="trans_eb9">Escoje el color: </p>
                            <input type="color"class="color-picker form-control input-picker-color">
                        </div>

                        <div class="col-6 px-lg-4">
                            <label for="" class="trans_eb37">Nombre ES: </label>
                            <input type="text" class="form-control nombre_es_picker">
                        </div>
                        <div class="col-6 px-lg-4">
                            <label for="" class="trans_eb38">Nombre EN:</label>
                            <input type="text" class="form-control nombre_en_picker">
                        </div>
                        <div class="col-12 pt-5 col12btnss">
                            <button type="button"  class="btn-save-view-picker trans_eb51">Guardar</button>
                            <button type="button"  class="btn-no-view-picker trans_eb52">Atrás</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    
    <!-- Modal confirmacion-->
    <div class="modal fade" id="selectTallaColor" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <div class="text-center">
                        <h5 class="trans_eb10 modal-title" id="exampleModalLongTitle"></h5>
                    </div>
                    <div class="modal-body">
                        <div id="div-tallas">

                        </div>
                        <div id="div-tallas1">

                        </div>
                    </div>
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
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="trans96_"></h4>
                    <p class="trans117_"></p>
                </div>
                <div class="contant-button02">
                    <button class="btntikets btn_load_confirmar trans118_ __publicar" type="button">
                        <span class="trans118_">Confirmar</span>
                    </button>
                    <!-- <a href="modificar-publicacion.php"><button class="btncomrar">Revisar</button></a> -->
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal felciidades-->
<div class="modal fade" id="modal-felciidades" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close cierre_modal_felicitaciones">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="trans_69"></h4>
                    <p class="trans119_"></p>
                </div>
                <div class="contant-button02">
                    <button class="btntikets btn_confirmar_modal_felicidades confirmar_felicidades trans454_"></button>
                    <!-- <button class="btncomrar">Revisar</button> -->
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal revision-->
<div class="modal fade" id="modal-revision" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close cierre_modal_revision">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf text-center">
                    <h4 class="color-text-revision trans_eb32"></h4>
                    <div class="trans_eb31"></div>
                </div>
                <div class="contant-button02">
                    <button class="btn-revision btn_confirmar_modal_revision confirmar_revision trans454_"></button>
                    <!-- <button class="btncomrar">Revisar</button> -->
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal paquete envio-->
<div class="modal fade" id="modal-detalle-envio" tabindex="-1" role="dialog" aria-hidden="true">
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
                <div class="row row-form1 mt-3 mb-0 row-mdal">
                    <div class="col-sm-6">
                        <p class="trans120_"></p>
                        <span class="content_unidades"><select class="form-control __unidadDistancia select-plataforma"></select></span>
                    </div>
                    <div class="col-sm-6">
                        <p class="trans121_"></p>
                        <input type="text"  maxlength="500" class="form-control __maskFloat__ __alto trans263__ph" placeholder="Alto">
                    </div>
                    <div class="col-sm-6">
                        <p class="mt-4 trans122_"></p>
                        <input type="text"  maxlength="500" class="form-control __maskFloat__ __largo trans261__ph" placeholder="Largo">
                    </div>
                    <div class="col-sm-6">
                        <p class="mt-4 trans123_"></p>
                        <input type="text"  maxlength="500" class="form-control __maskFloat__ __ancho trans262__ph" placeholder="Ancho">
                    </div>
                    <div class="col-sm-6">
                        <p class="mt-4 trans124_"></p>
                        <input type="text"  maxlength="500" class="form-control __unidadPeso trans260__ph" placeholder="Peso" readonly>
                    </div>
                    <div class="col-sm-6">
                        <p class="mt-4 trans125_"></p>
                        <input type="text"  maxlength="500" class="form-control __maskFloat__ __peso trans260__ph" placeholder="Peso">
                    </div>
                </div>
                <div class="contant-button02">
                    <button class="btncomrar _trans112" data-dismiss="modal"></button>
                    <button class="btntikets trans118_ __save_detalles_envio"></button>
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
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p class="label-paso title-direcciones __btncreardireccion trans14"></p>
                    </div>
                </div>
                <!-- <div class="row row-form1 __alldirecciones"> -->
                <div class="row row-form1 __alldirecciones">
                </div>
                <div class="contant-button02">
                    <button class="btncomrar _trans112" data-dismiss="modal"></button>
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
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="row row-form1">
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text"  maxlength="500" class="form-control __maskFloat__ __paisnewdireccion" disabled readonly>
                        <p class="trans15"></p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6 __divdepnewdireccion">
                        <select class="form-control __depnewdireccion select-plataforma"></select>
                        <p class="trans16"></p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text"  maxlength="500" class="form-control __ciudadnewdireccion trans_28__ph" >
                        <p class="trans17"></p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text"  maxlength="500" class="form-control __dirnewdireccion trans238___ph" >
                        <p class="trans18"></p>
                    </div>
                    <div class="mb-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text"  maxlength="500" class="form-control __codigopostalnewdireccion trans239___ph">
                        <p class="trans19"></p>
                    </div>
                    <div class="mb-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="checkbox" class="form-control __activanewdireccion" >
                        <p class="trans31"></p>
                    </div>
                </div>
                <div class="contant-button02">
                    <button class="btncomrar _trans112" data-dismiss="modal"></button>
                    <button class="btntikets trans118_ __save_detalles_envio"></button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal ver tickets-->
<div class="modal fade" id="modal-tickets" tabindex="-1" role="dialog" aria-hidden="true">
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
                <!-- <div class="row row-form1 __alldirecciones"> -->
                <!-- <div class="row row-form1 __alltickets"> -->
                <div class="row">
                    <div class="col-12">
                        <h5 class="title-tickets-view _trans192"></h5>
                    </div>
                </div>
                <div class="row row-form1 mt-2 mb-2 p-2 d-flex justify-content-around __alltickets">

                </div>
                <div class="row-form1 mt-2 mb-2 p-2" align="center">
                    <div class="col-12 text-center __infosubasta">

                    </div>
                </div>
                <div class="row mt-2 mb-2 p-2 subasta_success">
                    <div class="col-12">
                        <p class="title-tickets-view trans443_"></p>
                    </div>
                </div>
                <div class="row mt-2 mb-5 justify-content-center subasta_success">
                    <div class="btn-group btn-group-toggle"  data-toggle="buttons" align="center">
                        <label class="btn btn-light boton_bono_vender_su active ">
                            <img class="img-nasbicoin-subasta trans_185__alt" src="../imagen/icon_wallets/nasbi_gold.png" alt="Nasbigold - nasbi.com"> <span class="trans37_">Saldo dorado</span>
                            <input type="radio" id="Nasbigold" name="nasbicoin" class="form-control" checked>
                        </label>
                        <label class="btn btn-light boton_bono_vender_su ">
                            <img class="img-nasbicoin-subasta trans_186__alt" src="../imagen/icon_wallets/nasbi_blue.png" alt="Nasbiblue - nasbi.com"> <span class="trans36_">Bono de descuento</span>
                            <input type="radio" id="Nasbiblue" name="nasbicoin" class="form-control">
                        </label>
                    </div>
                </div>
                <div class="contant-button02">
                    <button class="btncomrar trans_01" data-dismiss="modal"></button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal empresa sin validar-->
<div class="modal fade" id="modal-empresa-validar" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> -->
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="_trans413"></h4>
                    <p class="_trans414"></p>
                </div>
                <div class="contant-button02">
                    <button type="button" class="btncomrar btn_aceptar_validado trans_01" data-dismiss="modal" aria-label="Close"></button>
                    <!-- <button class=" btncomrar">Revisar</button> -->
                </div>
            </div>
        </div>
    </div>
</div>


<script src="../js/vender.js"></script>
<script>
    function cargarPrimero() {
        /*getAllPromise();*/
        validarEmpresa();
        cargarArrays();
        prepararVender();
        getDireccionesUsuario();
        getTicketsUsuario();
    }
</script>