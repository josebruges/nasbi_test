<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans533">Nasbi.com</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <?php include '../include/analitic-web-script.php'; ?>
    <!--si va hacer include de head-js.php quite este include porque ese ya esta alla-->
    <!-- Include General Css -->
    <?php include '../include/include-css.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/resumen-negocio.css">
</head>

<!-- Include Navbar -->
<?php include '../include/navbar-logueado.php'; ?>

<body>
    <?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-header-resumen">
            <div class="col-12">
                <h2 class="_trans534">Resumen de negocios</h2>
            </div>
        </div>

        <!-- Parte 1: Listado mis negociso e historial -->
        <div class="row row-tabss tab_resumen">
            <div class="col-md-6 px-0">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active _trans552" id="tab-negocio" data-toggle="tab" href="#nav-negocio" role="tab" aria-controls="nav-negocio" aria-selected="true">MIS NEGOCIOS</a>
                        <a class="nav-item nav-link sidenav_historial_referidos _trans553" id="tab-historial" data-toggle="tab" href="#nav-historial" role="tab" aria-controls="nav-historial" aria-selected="false">HISTORIAL</a>
                    </div>
                </nav>
            </div>
            <div class="col-md-6 px-0">
                <div class="input-group group-filterr">
                    <div class="input-group-prepend">
                        <label class="input-group-text _trans542">Buscar estadísticas por:</label>
                    </div>
                    <div class=content_select_meses_referidos>
                        <select class="form-comtrol select_meses_referidos">
                        </select>
                    </div>

                </div>
            </div>

            <div class="col-12 px-0">
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="nav-negocio" role="tabpanel" aria-labelledby="tab-negocio">
                        <div class="row content-card content_empresas_referido">
                        </div>
                        <div class="content__nodata" style="display: none;">
                            <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                            <p class="label-title_nodata _trans543">No tienes negocios.</p>
                        </div>


                        <!-- usuarios normales -->
                        <div class="row row-tabss tab_resumen px-0">
                            <div class="col-md-6 px-0">
                                <nav>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active _trana941" id="tab-negocio" data-toggle="tab" href="#nav-negocio" role="tab" aria-controls="nav-negocio" aria-selected="true">MIS NEGOCIOS</a>
                                    </div>
                                </nav>
                            </div>

                            <div class="col-12 px-0">
                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="nav-negocio" role="tabpanel" aria-labelledby="tab-negocio">
                                        <div class="row content-card content_usuarios_referido"></div>
                                        <div class="content__nodata_user9" style="display: none;">
                                            <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                                            <p class="label-title_nodata _trans543">No tienes negocios.</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="tab-pane fade" id="nav-historial" role="tabpanel" aria-labelledby="tab-historial">
                        <div class="tabla-historial">
                            <h4 class="_trana947"></h4>
                            <div class="table-responsive responsiv-tble">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="_trans544">Razón Social de referido</th>
                                            <th class="_trans545">Concepto de pago</th>
                                            <th class="_trans546">Ingresos por referido</th>
                                            <th class="trans46_">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody class="historial_referidos_negocios">

                                    </tbody>

                                </table>
                                <div class="nodata content__nodata2" style="display: none;">
                                    <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                                    <p class="label-title_nodata ">No tienes negocios.</p>
                                </div>

                            </div>
                            <div class="pagination_historial"></div>
                        </div>


                        <div class="tabla-redes">
                            <h4 class="_trana948"></h4>
                            <div class="table-responsive responsiv-tble">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="trans27">producto</th>
                                            <th class="trans34_">Concepto de pago</th>
                                            <th class="_trana945">Ingresos por referido</th>
                                            <th class="trans46_">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody class="historial_referidos_redes">

                                    </tbody>

                                </table>
                                <div class="nodata content__nodata6" style="display: none;">
                                    <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                                    <p class="label-title_nodata ">No tienes transacciones.</p>
                                </div>

                            </div>
                            <div class="pagination_historial"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>



        <!-- Parte 2: Informacion cuadno selecciono una card de negocio -->
        <div class="tab_estadistica row-tabss d-none">
            <div class="row">
                <div class="col-md-6 px-0">
                    <nav>
                        <div class="nav-tabs" id="nav-tab">
                            <a class="nav-item nav-link btn_atras_referidos _trans412">Atras</a>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="row row-one-info ">
                <div class="col-sm-5 col-md-4">
                    <div class="card-negocio negocio-act">
                        <img src="../imagen/logo-negocio.png">
                        <p><b class="nombre_dueno">Jorge Gómez</b></p>
                        <p class="nombre_negocio">Negocio 1</p>
                    </div>
                </div>
                <div class="col-sm-7 col-md-8">
                    <h4 class="_trans547">Información del negocio</h4>
                    <div class="row">
                        <!-- <p class="return _trans548">Fecha de ingreso: </p> -->
                        <p class="return fecha_creacion">27/05/2020</p>
                    </div>
                    <div class="row">
                        <!-- <p class="return _trans549">Estado: </p> -->
                        <p class="return estado_empresa">Activo</p>
                    </div>


                </div>
            </div>

            <div class="row row-two-est">
                <div class="col-sm-4">
                    <h5 class="_trans550">Estadísticas</h5>
                </div>
                <div class="col-sm-8 px-0">
                    <div class="input-group group-filterr">
                        <div class="input-group-prepend">
                            <label class="input-group-text _trans542">Buscar estadísticas por:</label>
                        </div>
                        <select class="form-comtrol select_meses_estadistica">
                            <option>Últimos mes</option>
                            <option>Últimos mes</option>
                            <option>Últimos mes</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row row-three">
                <div class="content_select_meses">
                    <select class="form-control select1 select_meses">
                    </select>
                </div>
                <div class="content_select_anos">
                    <select class="form-control select2 select_anos">
                    </select>
                </div>
            </div>

            <div class="row row-four">
                <div class="col-xl-6">
                    <h5 class="trans249_">Resumen mensual</h5>
                    <div class="row row-segund content-grafica-resumen">
                        <div class="col-md-4 px-1">
                            <div class="legends_grafica_uno" id="legend"></div>
                        </div>
                        <div class="col-md-8 px-1">
                            <canvas id="myChartResumen"></canvas>
                        </div>
                    </div>
                    <div class=" row nodata content__nodata4" style="display: none;">
                        <p class="label-title_nodata _trans806">No hay información para mostrar.</p>
                    </div>
                    <!-- <img src="https://www.namespedia.com/image/Gif_surname.jpg"> -->
                </div>
                <div class="col-xl-6">
                    <h5 class="trans250_">Ingresos</h5>
                    <div class="row row-segund content-grafica-ingresos">
                        <div class="col-md-4 px-1">
                            <div class="legends_grafica_dos" id="legend2"></div>
                        </div>
                        <div class="col-md-8 px-1">
                            <canvas id="myChartVS"></canvas>
                        </div>
                    </div>
                    <div class=" row nodata content__nodata5" style="display: none;">
                        <p class="label-title_nodata _trans806">No hay información para mostrar.</p>
                    </div>


                    <!-- <img src="https://www.namespedia.com/image/Gif_surname.jpg"> -->
                </div>
            </div>

            <div class="row row-five">
                <div class="col-12">
                    <div class="input-group group-filterr">
                        <div class="input-group-prepend">
                            <label class="input-group-text _trans551">Ordenar por:</label>
                        </div>
                        <select class="form-comtrol select_orden_prod">
                            <option class="_trans554" value="1">Menor a mayor valor</option>
                            <option class="_trans555" value="2">Mayor a menor valor</option>

                        </select>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-negocio">
                            <tbody class="ventas_negocio_referido">
                            </tbody>
                            <div class=" nodata content__nodata6" style="display: none;">
                                <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                                <p class="label-title_nodata _trans543">No tienes negocios.</p>
                            </div>
                        </table>
                        <div class="pagination-prod-referido"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/resumen-negocio.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

</html>

<!-- Modal alertas generales -->
<div class="modal fade" id="modal-alertas-generales" tabindex="-1" role="dialog" aria-hidden="true">
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

                <div class="row agregado-carrito">
                    <h4 class="alerta_titulo">¡Producto agregado!</h4>
                    <p class="alerta_text">Hemos agregado un producto a tu carrito de compras</p>
                    <div align="center" class="div-alignc" style="width: 100%;">
                        <button class="btn btn-primary trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>